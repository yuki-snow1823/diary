import client from './client'
import Cookies from 'js-cookie'

export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInParams {
  email: string
  password: string
}

export const signUp = (params: SignUpParams) => {
  return client.post('auth', params)
}

export const signIn = (params: SignInParams) => {
  return client.post('auth/sign_in', params)
}

export const signOut = () => {
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

export const getCurrentUser = () => {
  if (!Cookies.get('_access_token')) return
  if (!Cookies.get('_client')) return
  if (!Cookies.get('_uid')) return

  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}
