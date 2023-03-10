import { Bar, Line } from 'react-chartjs-2'
import {
   MenuItem,
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   Divider,
   Select,
   useTheme,
   SelectChangeEvent
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import IconReport from 'assets/IconReport'
import { useState } from 'react'
import { IncomePeriod, ResponseData } from 'models'
import useSWR from 'swr'
import { ChartOptions } from 'chart.js'

interface Dataset {
   backgroundColor: string
   borderColor: string
   data: number[]
   label: string
   cubicInterpolationMode: 'monotone' | 'default'
}

interface ChartData {
   datasets: Dataset[]
   labels: string[]
}
export const Sales = (props: any) => {
   const theme = useTheme()
   const [period, setPeriod] = useState('week')

   const data = { datasets: [], labels: [] }

   const options: ChartOptions<'line'> = {
      interaction: {
         intersect: false,
         mode: 'index'
      },
      layout: { padding: 0 },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
         y: {
            ticks: {
               callback: function (value, index, values) {
                  return '$' + value
               }
            }
         }
      },
      plugins: {
         tooltip: {
            callbacks: {
               label: function (context) {
                  return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`
               }
            }
         }
      }
   }

   const handleChangePeriod = (event: SelectChangeEvent) => {
      setPeriod(event.target.value as string)
   }

   return (
      <Card {...props}>
         <CardHeader
            action={
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Select value={period} onChange={handleChangePeriod} size="small">
                     <MenuItem value="week">Last 7 days</MenuItem>
                     <MenuItem value="month">Last 30 days</MenuItem>
                     <MenuItem value="year">Last year</MenuItem>
                  </Select>
                  {/* <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
                     Last 7 days
                  </Button> */}
               </Box>
            }
            title="Latest Sales"
         />
         <Divider />
         <CardContent>
            <Box
               sx={{
                  height: 400,
                  position: 'relative'
               }}
            >
               {data && <Line data={data} options={options} />}
            </Box>
         </CardContent>
         {/* <Divider />
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'flex-end',
               p: 2
            }}
         >
            <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
               Overview
            </Button>
         </Box> */}
      </Card>
   )
}
