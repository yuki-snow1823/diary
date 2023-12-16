import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { SignInContainer } from 'sign_in/component/SignInContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getCurrentUser } from 'lib/api/auth'
import { createContext, useEffect, useState } from 'react'
import { IndexUserContainer } from './user/index/component/IndexUserContainer'
import { NewJournalContainer } from './journal/new/component/NewJournalContainer'
import { SignUpContainer } from './sign_up/component/SignUpContainer'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

let baseURL: string

const productionHost = process.env.REACT_APP_PRODUCTION_HOST || ''

if (window.location.host === productionHost) {
  baseURL =
    (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000') + '/graphql'
} else {
  baseURL = 'http://localhost:3000/graphql'
}

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache()
})

export const AuthContext = createContext(
  {} as {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isSignedIn: boolean
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  }
)

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const theme = createTheme({
    typography: {
      fontFamily: 'Noto Sans JP',
      button: {
        textTransform: 'none'
      }
    }
  })

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log('No current user')
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser
        }}
      >
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Routes>
              <Route path="/" element={<SignInContainer />} />
              <Route path="/sign_up" element={<SignUpContainer />} />
              <Route path="/users" element={<IndexUserContainer />} />
              <Route path="/journal/new" element={<NewJournalContainer />} />
            </Routes>
          </ApolloProvider>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
