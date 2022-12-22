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
import { UserListResults, CustomerListToolbar } from 'components/user'
import { DashboardLayout } from 'components/layouts'
import { useQuery } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'
import { number } from 'yup/lib/locale'

const Users = () => {
   const [filters, setFilters] = useState<CustomerQueryParams>({
      search: '',
      orderBy: 'updatedAt-desc',
      isOrder: ''
   })
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)

   const [variables, setVariables] = useState<Variables_Graphql>({take: 5})
   
   const [userList, setUserList] = useState<User[]>([])
   
   const { data: _userList } = useQuery(USERS_QUERY, { variables: { ...variables } })

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
      setFilters({
         ...filters,
         search
      })
   }
   const handleChangeSorting = (orderBy: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         orderBy
      })
   }

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         isOrder: newValue
      })
   }

   return (
      <>
         <Head>
            <title>Users | Cheems Store</title>
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
                     Users
                  </Typography>
                  {/* <Box sx={{ m: 1 }}>
                     <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Export
                     </Button>
                  </Box> */}
               </Box>
               <Box sx={{ mt: 1 }}>
                  <Card>
                     <Tabs value={filters.isOrder} onChange={handleChangeTab}>
                        <Tab label="All" value="" />
                        <Tab label="Prospect" value="true" />
                        <Tab label="Returning" value="false" />
                     </Tabs>
                     <Divider />
                     <CustomerListToolbar
                        filters={filters}
                        onSearch={handleSearch}
                        onChangeSorting={handleChangeSorting}
                     />
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
