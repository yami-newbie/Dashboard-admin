import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
   Avatar,
   Box,
   IconButton,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   TableSortLabel,
   Tooltip,
   Typography
} from '@mui/material'
import PencilIcon from 'icons/pencil'
import { HeadCell, PaginationParams, User } from 'models'
import Link from 'next/link'
import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { getInitials } from '../../utils/get-initials'
import moment from 'moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const headCells: HeadCell[] = [
   {
      id: 'name',
      align: 'left',
      label: 'Tên',
      sortable: false
   },
   {
      id: 'email',
      align: 'left',
      label: 'Email',
      sortable: false
   },
   {
      id: 'phone',
      align: 'center',
      label: 'Số điện thoại',
      sortable: false
   },
   {
      id: 'createdAt',
      align: 'center',
      label: 'Ngày đăng ký',
      sortable: false
   },
   {
      id: 'actions',
      align: 'center',
      label: 'Hành động',
      sortable: false
   }
]
export const UserListResults = ({
   userList,
   pagination,
   onSortByColumn,
   isCustomerPage = false,
   ...rest
}: {
   userList?: User[]
   pagination: PaginationParams
   onSortByColumn: Function
   isCustomerPage?: boolean
}) => {
   const [order, setOrder] = useState<'asc' | 'desc'>('asc')
   const [orderBy, setOrderBy] = useState('')

   const handleSort = (property: string) => async (event: React.MouseEvent) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
      onSortByColumn(`${property}-${isAsc ? 'desc' : 'asc'}`)
   }
   function randomColor() {
      let backgroundColor = [
         '#ab000d',
         '#5c007a',
         '#00227b',
         '#00701a',
         '#8c9900',
         '#c68400',
         '#40241a',
         '#29434e'
      ]
      let random = Math.floor(Math.random() * backgroundColor.length)
      return backgroundColor[random]
   }
   let bgColor = [
      '#ab000d',
      '#5c007a',
      '#00227b',
      '#00701a',
      '#8c9900',
      '#c68400',
      '#40241a',
      '#29434e',
      '#ab000d',
      '#5c007a'
   ]
   return (
      <PerfectScrollbar>
         <Box sx={{ minWidth: 1050 }}>
            <Table>
               <TableHead>
                  <TableRow>
                     {headCells.map(cell => (
                        <TableCell
                           key={cell.id}
                           align={cell.align}
                           sortDirection={orderBy === cell.id ? order : false}
                        >
                           {cell.sortable ? (
                              <TableSortLabel
                                 active={orderBy === cell.id}
                                 direction={orderBy === cell.id ? order : 'asc'}
                                 onClick={handleSort(cell.id)}
                              >
                                 {cell.label}
                              </TableSortLabel>
                           ) : (
                              cell.label
                           )}
                        </TableCell>
                     ))}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {userList
                     ? userList.map(user => (
                          <TableRow hover key={user.id}>
                             <TableCell align="left">
                                <Box
                                   sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                   }}
                                >
                                   <Avatar
                                      style={{
                                         backgroundColor: bgColor[userList.indexOf(user)]
                                      }}
                                      src={user?.medias?.[0]?.filePath}
                                      alt={getInitials(user.fullname)}
                                      sx={{ mr: 2 }}
                                   >
                                   </Avatar>
                                   <Typography
                                      sx={{ fontWeight: 500 }}
                                      color="textPrimary"
                                      variant="body2"
                                   >
                                      {user.fullname || 'N/A'}
                                   </Typography>
                                </Box>
                             </TableCell>
                             <TableCell align="left">{user.email}</TableCell>
                             <TableCell align="center">{user.phone}</TableCell>
                             <TableCell align="center" sx={{ pr: 5 }}>
                                {moment(user.createdAt || undefined).format('DD/MM/YYYY')}
                             </TableCell>

                             <TableCell align="center">
                                { !isCustomerPage ? <Link href={`/users/${user.id}/edit`} passHref>
                                   <Tooltip title="Chỉnh sửa thông tin tài khoản" placement="top">
                                      <IconButton size="small">
                                         <PencilIcon width={20} />
                                      </IconButton>
                                   </Tooltip>
                                </Link> : null }
                                <Link href={`/${!isCustomerPage ? 'users' : 'customers'}/${user.id}`} passHref>
                                   <Tooltip title="Xem chi tiết" placement="top">
                                      <IconButton size="small">
                                         { !isCustomerPage ? <ArrowForwardIcon fontSize="small" /> : <MoreHorizIcon fontSize="small" />}
                                      </IconButton>
                                   </Tooltip>
                                </Link>
                             </TableCell>
                          </TableRow>
                       ))
                     : Array.from(new Array(pagination.pageSize)).map((item, idx) => (
                          <TableRow hover key={idx}>
                             <TableCell align="center">
                                <Skeleton variant="text" />
                             </TableCell>
                             <TableCell align="center">
                                <Skeleton variant="text" />
                             </TableCell>
                             <TableCell align="center">
                                <Skeleton variant="text" />
                             </TableCell>
                             <TableCell align="center">
                                <Skeleton variant="text" />
                             </TableCell>
                             <TableCell align="center">
                                <Skeleton variant="text" />
                             </TableCell>
                             <TableCell align="center">
                                <Skeleton variant="text" />
                             </TableCell>
                             <TableCell align="center">
                                <Skeleton variant="text" />
                             </TableCell>
                          </TableRow>
                       ))}
               </TableBody>
            </Table>
         </Box>
      </PerfectScrollbar>
   )
}
