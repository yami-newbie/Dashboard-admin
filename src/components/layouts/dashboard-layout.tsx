import { ReactNode, useState } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DashboardNavbar } from './dashboard-navbar'
import { DashboardSidebar } from './dashboard-sidebar'
import { Auth } from '../auth'
import { useAuth } from 'hooks'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
   display: 'flex',
   flex: '1 1 auto',
   maxWidth: '100%',
   paddingTop: 64,
   [theme.breakpoints.up('lg')]: {
      paddingLeft: 280
   }
}))

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
   const [isSidebarOpen, setSidebarOpen] = useState(true)

   return (
      <Auth>
         <DashboardLayoutRoot>
            <Box
               sx={{
                  display: 'flex',
                  flex: '1 1 auto',
                  flexDirection: 'column',
                  width: '100%',
                  scrollBehavior: 'smooth'
               }}
            >
               {children}
            </Box>
         </DashboardLayoutRoot>
         <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
         <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
      </Auth>
   )
}
