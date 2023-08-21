import { USER_QUERY } from '../graphql/query'
import { useQuery } from '@apollo/client'
import { User } from 'App'
import { useParams } from 'react-router-dom';

export const ShowUserHooks = () => {
  const { user_id } = useParams();

  console.log(user_id, "id")

  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { id: user_id }
  })

  const user = data

  return { user }
}
