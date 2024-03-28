// ** Next Imports
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react';

import { userService } from 'services';

import Alerta from 'src/@core/components/alerta';

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader





// ** Configure JSS & ClassName
const App = props => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url) => {
        console.log(`routeChangeStart to ${url}`)
        NProgress.start()
        hideContent();
    }

    const handleRouteComplete = (url) => {
      NProgress.done()
      authCheck(url);
      console.log(`routeChangeComplete ${url}`)
      setAuthorized(true);
      console.log('authorized on complete' + authorized)
  }
    // on initial load - run auth check
    authCheck(router.asPath);
    console.log(authorized);


    if (themeConfig.routingLoader) {
        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeError', () => {
        NProgress.done()
      })
      router.events.on('routeChangeComplete', handleRouteComplete)
    }

    function authCheck(url){

      console.log("Auth check complete");

      // redirect to login page if accessing a private page and not logged in
      setUser(userService.userValue);
      const publicPaths = ['/pages/login/', '/account/register/'];
      const adminPaths = ['/users', '/users/add','/users/edit/[id]'];
      const path = url.split('?')[0];
      console.log(path);
      console.log(userService.userValue);
      if (!userService.userValue && !publicPaths.includes(path)) {
          console.log("Dentro de no login " + router.asPath);
          setAuthorized(false);
          router.push('/pages/login/');
      } else {
          setAuthorized(true);
          if (!userService.isAdmin() && adminPaths.includes(path) && !publicPaths.includes(path)) {
              console.log("Dentro de si login no admin");
              setAuthorized(false);
              router.push('/pages/login/');
          }
          console.log('isAdmin ' + userService.isAdmin());
          console.log('Authorized ' + authorized);
      }


    }

    // on route change start - hide page content by setting authorized to false
    function hideContent () { setAuthorized(false) };


    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeStart', () => {
          hideContent
        });
        router.events.off('routeChangeComplete', () => {
          console.log('routeChangeComplet off');
          authCheck
        });
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);



  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName}`}
        />
        <meta name='keywords' content='' />
        <meta name='viewport' content='' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>

            {({ settings  }) => {
                  {console.log('Authorized on page ' + authorized)}

                  return <ThemeComponent settings={settings}>{authorized && getLayout(<Component {...pageProps} />)}</ThemeComponent>

            }}

        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
