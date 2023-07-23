import { useQuery } from '@apollo/client'
import { FIND_JOURNAL } from '../graphql/query'
import { Link, useParams } from 'react-router-dom'

export const JournalDetailContainer = () => {
  const urlParams = useParams<{ id: string }>()
  const { loading, error, data } = useQuery(FIND_JOURNAL, {
    variables: { id: urlParams.id }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>
  console.log(data.journal.title)
  return (
    <>
      <p>{data.journal.id}</p>
      <p>{data.journal.title}</p>
      <p>{data.journal.content}</p>
      <Link to="/journal/new">journal/new</Link>
    </>
  )
}
