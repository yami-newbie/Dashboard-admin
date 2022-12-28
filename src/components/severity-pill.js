import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

const SeverityPillRoot = styled('span')(({ theme, ownerState }) => {
   const backgroundColor = ownerState.color
   const color = ownerState.color
   
   return {
      alignItems: 'center',
      backgroundColor: alpha(backgroundColor, 0.08),
      borderRadius: 4,
      // border: `1px solid ${alpha(color, 0.3)}`,
      color,
      cursor: 'default',
      display: 'inline-flex',
      flexGrow: 0,
      flexShrink: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 2,
      fontWeight: 600,
      justifyContent: 'center',
      letterSpacing: 0.5,
      minWidth: 100,
      paddingTop: theme.spacing(0.4),
      paddingBottom: theme.spacing(0.4),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
   }
})

export const SeverityPill = props => {
   const { color = 'primary', children, ...other } = props

   const ownerState = { color }

   return (
      <SeverityPillRoot ownerState={ownerState} {...other}>
         {children}
      </SeverityPillRoot>
   )
}
