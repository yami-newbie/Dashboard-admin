import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../hooks'
import { LoadingBackdrop } from './loading'

export interface UnauthProps {
   children: ReactNode
}

export function Unauth({ children }: UnauthProps) {
   const router = useRouter()
   const { profile, firstLoading } = useAuth()

   useEffect(() => {
      if (!firstLoading && profile?.email) {
         router.push('/')
      }
   }, [router, profile, firstLoading])

   if (firstLoading || profile?.email) return <LoadingBackdrop open={true} />

   return <div>{children}</div>
}
