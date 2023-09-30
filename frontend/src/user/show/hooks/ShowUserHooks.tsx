import { USER_QUERY } from '../graphql/query'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

export const ShowUserHooks = () => {
  const { id } = useParams()

  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { id: id }
  })

  if (loading) {
    console.log("Loading user data...")
    return { user: null }
  }

  if (error) {
    console.error("Error fetching user data:", error)
    return { user: null }
  }

  const user = data && data.user ? data.user : null

  return { user }
}
