// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from 'services';


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
import Alert from 'src/@core/theme/overrides/alerts';

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader





// ** Configure JSS & ClassName
const App = props => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);
    console.log(authorized);


    if (themeConfig.routingLoader) {
        router.events.on('routeChangeStart', () => {
        NProgress.start()
        hideContent();
        authCheck(router.asPath);

      })
      router.events.on('routeChangeError', () => {
        NProgress.done()
      })
      router.events.on('routeChangeComplete', () => {
        NProgress.done()

      })
    }

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);


    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
    }
}, []);

  const authCheck = (url) => {

    console.log("Auth check complete");

    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ['/pages/login', '/account/register'];
    const adminPaths = ['/users', '/users/add','/users/edit/[id]'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push({
            pathname: '/pages/login',
            query: { returnUrl: router.asPath }
        });
    } else {
        setAuthorized(true);
        if (!userService.isAdmin() && adminPaths.includes(path) && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/pages/login',
                query: { returnUrl: router.asPath }
            });
        }
        console.log('isAdmin ' + userService.isAdmin());
    }

  }

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>

            {({ settings  }) => {

              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}

        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
