import 'chart.js/auto';
import 'dayjs/locale/ru';
import React from 'react';
import dayjs from 'dayjs';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './modules/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useEffect, useState} from "react"
import {FrontendApi, Configuration, Session, Identity} from "@ory/client"

const basePath = process.env.REACT_APP_ORY_URL || "http://localhost:4000"
const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  }),
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>()

  // Returns either the email or the username depending on the user's Identity Schema
  const getUserName = (identity?: Identity) =>
    identity?.traits.email || identity?.traits.username

  // Second, gather session data, if the user is not logged in, redirect to login
  useEffect(() => {
    ory
      .toSession()
      .then(({data}) => {
        // User has a session!
        setSession(data)
        ory.createBrowserLogoutFlow().then(({data}) => {
          // Get also the logout url
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setLogoutUrl(data.logout_url)
        })
      })
      .catch((err) => {
        console.error(err)
        // Redirect to login page
        window.location.replace(`${basePath}/ui/login`)
      })
  }, [])

  if (!session) {
    // Still loading
    return <h1>Loading...</h1>
  }

  dayjs.locale('ru');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router/>
          <ReactQueryDevtools initialIsOpen={false}/>
        </BrowserRouter>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;