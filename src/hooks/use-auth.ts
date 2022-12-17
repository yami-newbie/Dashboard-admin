import LOGIN_QUERY from 'graphql/query/login';
import { LoginPayload, User } from './../models'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery } from '@apollo/client'
import CURRENT_USER_QUERY from 'graphql/query/currentUser';


export function useAuth(options?: Partial<PublicConfiguration>) {
   const router = useRouter()

   const [_login, { loading: _loading, error: _error, data }] = useLazyQuery(LOGIN_QUERY, { fetchPolicy: "network-only" });
   const { loading, error, data: profile, refetch } = useQuery(CURRENT_USER_QUERY);

   const firstLoading = profile === undefined && error === undefined

   async function login(payload: LoginPayload) {
      window.localStorage.removeItem('token')

      const res = await _login({ variables: { input: { email: payload.email, password: payload.password } } })

      window.localStorage.setItem('accessToken', res.data.login.accessToken)
      window.localStorage.setItem('refreshToken', res.data.login.refreshToken)

      refetch()
   }

   async function logout() {
   }

   async function updateProfile(payload: Partial<User>) {
   }

   return {
      profile: profile?.currentUsers?.[0],
      error,
      login,
      logout,
      updateProfile,
      firstLoading
   }
}
