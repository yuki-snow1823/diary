import { useQuery } from '@apollo/client'
import { FIND_JOURNAL } from '../graphql/query'

export const JournalDetailContainer = () => {
  const { loading, error, data } = useQuery(FIND_JOURNAL, { variables: { id: 1 } })
	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;
  console.log(data.journal.title)
  return (
    <>
      <p>{data.journal.id}</p>
      <p>{data.journal.title}</p>
      <p>{data.journal.content}</p>
    </>
  )
}
