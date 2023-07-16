import React, { useState, useContext, ChangeEvent } from 'react'
import Cookies from 'js-cookie'
import { signIn } from '../../lib/api/auth'
import { AuthContext } from '../../App'
import SignInPresentationl from './SignInPresentational'

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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const handleSubmit = async () => {
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
    <SignInPresentationl
      currentUser={currentUser}
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  )
}
