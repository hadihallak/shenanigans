import '../styles/globals.css'
import App, { AppContext, AppProps } from 'next/app'
import React from 'react'

export interface MyAppProps extends AppProps {
  length: string
  source: string
}
export default function MyApp({
  Component,
  pageProps,
  source,
  length,
}: MyAppProps) {
  return <Component {...pageProps} length={length} source={source} />
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { req, res, query } = context.ctx
  const initialProps = await App.getInitialProps(context)
  console.time('fetch with _app')

  const settingsResponse = await fetch(
    'http://' + req?.headers.host + '/api/settings',
    { cache: 'no-store' },
  )
  console.timeEnd('fetch with _app')
  if (!settingsResponse.ok) {
    throw new Error('hi')
  }
  const data = await settingsResponse.text()

  return {
    ...initialProps,
    length: data,
    source: '_app',
  }
}
