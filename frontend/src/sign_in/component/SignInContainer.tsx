import React, { useState, useContext } from 'react'
import Cookies from 'js-cookie'
import { signIn } from '../../lib/api/auth'
import { AuthContext } from '../../App'
import SignInPresentational from './SignInPresentational'

export interface SignInParams {
  email: string
  password: string
}

export const SignInContainer = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)

  const params: SignInParams = {
    email: email,
    password: password
  }

  const handleSubmit = async (params: SignInParams) => {
    try {
      const res = await signIn(params)
      console.log(res)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        console.log('Signed in successfully!')
      } else {
        console.log('faild')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SignInPresentational
      currentUser={currentUser}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={() => handleSubmit(params)}
    />
  )
}
