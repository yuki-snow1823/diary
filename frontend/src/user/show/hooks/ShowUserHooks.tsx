import { useContext } from 'react'
import { AuthContext } from 'App'

export const ShowUserHooks = () => {
  const { currentUser } = useContext(AuthContext)
  return {
    currentUser,
  }
}