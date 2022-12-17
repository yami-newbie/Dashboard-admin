import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Button, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createEmotionCache } from '../utils'
import { theme } from '../theme'
import { AppPropsWithLayout } from 'models'
import { EmptyLayout } from 'components/layouts'
import { SnackbarProvider } from 'notistack'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

import Router from 'next/router'
import NProgress from 'nprogress'
import 'assets/styles/nprogress.css'
import { createRef } from 'react'

if (typeof window !== 'undefined') {
   NProgress.configure({ showSpinner: false })

   Router.events.on('routeChangeStart', () => {
      console.log('routeChangeStart')
      NProgress.start()
   })
   Router.events.on('routeChangeError', () => {
      console.log('routeChangeError')
      NProgress.done()
   })
   Router.events.on('routeChangeComplete', () => {
      console.log('routeChangeComplete')
      NProgress.done()
   })
}


const clientSideEmotionCache = createEmotionCache()

const App = (props: AppPropsWithLayout) => {
    const uploadLink = createUploadLink({
      uri: 'https://cheems-store.onrender.com/graphql',
    })
    
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('accessToken');
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });
    
    const client = new ApolloClient({
      link: authLink.concat(uploadLink),
      cache: new InMemoryCache()
    });
   // const notistackRef = createRef<HTMLElement>()
   // const onClickDismiss = (key: SnackbarKey) => () => {
   //    notistackRef.current.closeSnackbar(key)
   // }

   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

   const Layout = Component.Layout ?? EmptyLayout

   return (
      <ApolloProvider client={client}>
         <CacheProvider value={emotionCache}>
            <Head>
               <title>FurnitureStore Admin</title>
               <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <ThemeProvider theme={theme}>
                  <SnackbarProvider
                     maxSnack={1}
                     preventDuplicate
                     // action={(key: SnackbarKey) => (
                     //    <Button varient="text" onClick={onClickDismiss(key)} color="inherit">
                     //       Dismiss
                     //    </Button>
                     // )}
                     classes={{
                        variantSuccess: '#4caf50',
                        variantError: '#f44336',
                        variantWarning: '#fdd835'
                        // variantInfo: classes.info,
                     }}
                  >
                     <CssBaseline />
                     <Layout>
                        <Component {...pageProps} />
                     </Layout>
                  </SnackbarProvider>
               </ThemeProvider>
            </LocalizationProvider>
         </CacheProvider>
      </ApolloProvider>
   )
}

export default App
