import 'App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { SignInContainer } from 'sign_in/component/SignInContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getCurrentUser } from 'lib/api/auth'
import { createContext, useEffect, useState } from 'react'

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

const client = new ApolloClient({
  uri: 'https://tdiaryapi.herokuapp.com/graphql',
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
            <Route path="/sign_in" element={<SignInContainer />} />
          </Routes>
        </ApolloProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
