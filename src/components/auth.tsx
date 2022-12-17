import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../hooks'
import { LoadingBackdrop } from './loading'

export interface AuthProps {
   children: ReactNode
}

export function Auth({ children }: AuthProps) {
   const router = useRouter()
   const { profile, firstLoading } = useAuth()

   console.log(profile, firstLoading)

   useEffect(() => {
      if (!firstLoading && !profile?.email) {
         router.push('/login')
      }
   }, [router, profile, firstLoading])

   if (!profile?.email) return <LoadingBackdrop open={true}/>

   return <div>{children}</div>
}
