import { Grid } from '@mui/material'
import { ResponseData } from 'models'
import * as React from 'react'
import useSWR from 'swr'
import { Budget, TotalCustomers, TotalOrders, TotalProfit } from '.'

export interface DashboardCardsProps {}

export interface CardData {
   label: string
   value: string | number
   compareLastMonth: number
}
export function DashboardCards(props: DashboardCardsProps) {
   
   const data: any[] = []

   return (
      <Grid item container spacing={3}>
         {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
         </Grid> */}
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalCustomers data={data && data[0]} />
         </Grid>
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalOrders data={data && data[1]} />
         </Grid>
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalProfit data={data && data[2]} />
         </Grid>
      </Grid>
   )
}
