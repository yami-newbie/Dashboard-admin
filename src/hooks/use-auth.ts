import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LOGIN_QUERY from 'graphql/query/login'
import { LoginPayload, User } from './../models'
import { PublicConfiguration } from 'swr/dist/types'
import { useLazyQuery, useQuery } from '@apollo/client'
import CURRENT_USER_QUERY from 'graphql/query/currentUser'
import { useSnackbar } from 'notistack';

export function useAuth(options?: Partial<PublicConfiguration>) {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()

   const [_login, { loading: _loading, error: _error, data }] = useLazyQuery(LOGIN_QUERY, {
      fetchPolicy: 'network-only'
   })
   const { loading, error, data: profile, refetch } = useQuery(CURRENT_USER_QUERY)

   const firstLoading = profile === undefined && error === undefined

   useEffect(() => {
      if(_error) {
         console.log(_error);
         
         enqueueSnackbar("Tài khoản hoặc mật khẩu không đúng", {
            variant: 'error'
         })
      }
   }, [_error])

   async function login(payload: LoginPayload) {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')

      const res = await _login({
         variables: { input: { email: payload.email, password: payload.password } }
      })

      window.localStorage.setItem('accessToken', res.data.login.accessToken)
      window.localStorage.setItem('refreshToken', res.data.login.refreshToken)

      refetch()
   }

   async function logout() {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')
   }

   async function updateProfile(payload: Partial<User>) {}

   return {
      profile: profile?.currentUsers?.[0],
      error,
      login,
      logout,
      updateProfile,
      firstLoading
   }
}
