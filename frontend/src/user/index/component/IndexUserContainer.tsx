import { GET_USERS } from '../../graphql/query'
import { useQuery } from '@apollo/client'
import { IndexUserPresentational } from './IndexUserPresentational'

export const IndexUserContainer: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return null
  if (error) return <div>Error!</div>

  return <IndexUserPresentational users={data.users} />
}
