import Head from 'next/head'
import {
   Box,
   Button,
   Card,
   Container,
   Divider,
   Pagination,
   Stack,
   Tab,
   TablePagination,
   Tabs,
   Typography
} from '@mui/material'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { CustomerQueryParams, DEFAULT_PAGINATION, PaginationParams, User, Variables_Graphql } from 'models'
import { UserListResults, UserListToolbar } from 'components/user'
import { DashboardLayout } from 'components/layouts'
import { useQuery } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'
import { number } from 'yup/lib/locale'

const Users = () => {
   const [isCustomer, setIsCustomer] = useState<string>("null")
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)

   const [variables, setVariables] = useState<Variables_Graphql>({take: 5})
   
   const [userList, setUserList] = useState<User[]>([])
   
   const { data: _userList } = useQuery(USERS_QUERY, { 
      variables: { 
         ...Object.assign(variables, { 
            input: { 
               isCustomer: isCustomer === "null" ? null : ( isCustomer === "true" ? true : false )
            } 
         }) 
      } 
   })

   useEffect(() => {
      if (_userList) {
         const users = _userList.users.items

         const _totalCount = _userList.users.totalCount

         setPagination(prev => ({
            ...prev,
            totalCount: _totalCount
         }))
         setUserList(users || [])
      }
   }, [_userList])

   const handleLimitChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPagination({ ...pagination, pageSize: Number.parseInt(event.target.value) })
   }

   const handlePageChange = (event: any, newPage: number) => {
      setPagination({ ...pagination, currentPage: newPage })
      setVariables(prev => ({
         ...prev,
         skip: (newPage - 1) * 5
      }))
   }

   const handleSearch = (search: string) => {
      setPagination(DEFAULT_PAGINATION)
   }
   const handleChangeSorting = (orderBy: string) => {
      setPagination(DEFAULT_PAGINATION)
   }

   const handleChangeTab = (event: React.SyntheticEvent, newValue: any) => {
      setPagination(DEFAULT_PAGINATION)
      setIsCustomer(newValue)
   }

   return (
      <>
         <Head>
            <title>Người dùng | FurnitureStore</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth={false}>
               <Box
                  sx={{
                     alignItems: 'center',
                     display: 'flex',
                     justifyContent: 'space-between',
                     flexWrap: 'wrap',
                     m: -1
                  }}
               >
                  <Typography sx={{ m: 1 }} variant="h4">
                     Danh sách người dùng
                  </Typography>
                  {/* <Box sx={{ m: 1 }}>
                     <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Export
                     </Button>
                  </Box> */}
               </Box>
               <Box sx={{ mt: 1 }}>
                  <Card>
                     <Tabs value={isCustomer} onChange={handleChangeTab}>
                        <Tab label="Tất cả" value="null" />
                        <Tab label="Nhân viên" value="false" />
                        <Tab label="Khách hàng" value="true" />
                     </Tabs>
                     <Divider />
                     {/* <UserListToolbar
                        filters={filters}
                        onSearch={handleSearch}
                        onChangeSorting={handleChangeSorting}
                     /> */}
                     <UserListResults
                        userList={userList}
                        pagination={pagination}
                        onSortByColumn={handleChangeSorting}
                     />
                     <Stack width="100%" alignItems="center" my={2}>
                        <Pagination onChange={handlePageChange} count={Math.ceil(pagination.totalCount / 5)} variant="outlined" color="primary" />
                     </Stack>
                  </Card>
               </Box>
            </Container>
         </Box>
      </>
   )
}
Users.Layout = DashboardLayout

export default Users
