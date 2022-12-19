import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material'
import { CustomTextField } from 'components/form-controls'
import { LoginLayout } from 'components/layouts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from '../hooks'
import { LoginPayload } from '../models'
import LOGIN_QUERY from 'graphql/query/login'
import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'

const schema = yup.object({
   email: yup.string().max(255).required('Email is required'),
   password: yup.string().max(255).required('Password is required')
})

const Login = () => {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()

   // useEffect(() => {
   //    if(data) {
   //       window.localStorage.setItem('token', data.login)
   //    }
   // }, [data])

   const { login, error } = useAuth()
   const form = useForm<LoginPayload>({
      defaultValues: {
         email: '',
         password: ''
      },
      resolver: yupResolver(schema)
   })
   const {
      formState: { isSubmitting },
      control
   } = form

   const handleClickLogin = async (_data: LoginPayload) => {
      try {
         await login(_data)

         router.push('/')
      } catch (error: any) {
         console.log(error);
      }
   }

   return (
      <Box>
         <Head>
            <title>Login | FurnitureStore Dashboard</title>
         </Head>
         <Box
            component="main"
            sx={{
               alignItems: 'center',
               display: 'flex',
               flexGrow: 1,
               minHeight: '100%'
            }}
         >
            <Container
               maxWidth="sm"
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh'
               }}
            >
               <Card elevation={12}>
                  <CardContent
                     sx={
                        {
                           // py: 8
                        }
                     }
                  >
                     <form onSubmit={form.handleSubmit(handleClickLogin)}>
                        <Box sx={{ textAlign: 'center' }}>
                           <img
                              src="https://konsept.qodeinteractive.com/wp-content/uploads/2020/07/logo_mainpng.png"
                              width="180px"
                           />
                           <Typography color="textPrimary" variant="h4">
                              Đăng nhập
                           </Typography>
                        </Box>

                        <CustomTextField
                           disabled={isSubmitting}
                           control={control}
                           name="email"
                           label="Email"
                        />
                        <CustomTextField
                           disabled={isSubmitting}
                           control={control}
                           name="password"
                           label="Mật khẩu"
                           type="password"
                        />
                        <Box sx={{ py: 2 }}>
                           <Button
                              color="primary"
                              disabled={isSubmitting}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                           >
                              Đăng nhập
                           </Button>
                        </Box>
                     </form>
                  </CardContent>
               </Card>
            </Container>
         </Box>
      </Box>
   )
}
Login.Layout = LoginLayout

export default Login
