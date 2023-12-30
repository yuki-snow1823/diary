import IndexJournalPresentational from './IndexJournalPresentational'
import { GET_JOURNALS } from '../graphql/query'
import { useQuery } from '@apollo/client'

export const IndexJournalContainer = () => {
  const { loading, error, data } = useQuery(GET_JOURNALS)
  if (loading) return null
  if (error) return <div>Error!</div>

  return <IndexJournalPresentational journals={data.journals} />
}
