import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import Route from '../components/Route'
import routing from '../routing'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
	return (
	  <CacheProvider value={emotionCache}>
		<Head>
		<title>Stage Control 2019</title>
		  <meta name="viewport" content="initial-scale=1, width=device-width" />
		</Head>
		<ThemeProvider theme={theme}>
		  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
		  <CssBaseline />
		  <Route.Provider value={routing()}>
			<Component {...pageProps} />
		</Route.Provider>	
		</ThemeProvider>
	  </CacheProvider>
	);
  }
