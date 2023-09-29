import { ChangeEvent, useState, useContext } from 'react'
import Cookies from 'js-cookie'
import { AuthContext } from 'App'
import { signUp } from 'lib/api/auth'
import { SignUpParams } from 'lib/api/auth'
import { useNavigate } from 'react-router-dom'

export const SignUpHooks = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const { setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)

  const params: SignUpParams = {
    name: name,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value)

  const handleSubmit = async () => {
    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        navigate('/journal/new')
        console.log('Signed up successfully!')
      } else {
        console.log('faild')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handleSubmit,
    currentUser,
    name,
    email,
    password,
    passwordConfirmation
  }
}
