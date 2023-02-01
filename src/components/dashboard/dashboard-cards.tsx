import { Grid } from '@mui/material'
import { ResponseData } from 'models'
import * as React from 'react'
import useSWR from 'swr'
import { useQuery } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'
import { Budget, TotalCustomers, TotalOrders, TotalProfit } from '.'
import STATISTIC_QUERY from 'graphql/query/statistic'

export interface DashboardCardsProps {
   customer: CardData
   order: CardData
   profit: CardData
}

export interface CardData {
   label: string
   value: string | number
   compareLastMonth: number
}
export function DashboardCards(props: DashboardCardsProps) {
   const data = props;

   return (
      <Grid item container spacing={3}>
         {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
         </Grid> */}
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalCustomers data={data && data.customer} />
         </Grid>
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalOrders data={data && data.order} />
         </Grid>
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalProfit data={data && data.profit} />
         </Grid>
      </Grid>
   )
}
