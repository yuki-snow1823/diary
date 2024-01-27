import { ShowJournalPresentational } from './ShowJournalPresentational'
import { useParams } from 'react-router-dom'
import { FIND_JOURNAL } from '../graphql/query'
import { useQuery } from '@apollo/client'

export const ShowJournalContainer = () => {
  const urlParams = useParams<{ id: string }>()

  const { loading, error, data } = useQuery(FIND_JOURNAL, {
    variables: { id: urlParams.id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  return <ShowJournalPresentational journal={data.journal} />
}
