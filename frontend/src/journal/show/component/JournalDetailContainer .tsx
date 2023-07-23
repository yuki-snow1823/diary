import { useQuery } from '@apollo/client'
import { FIND_JOURNAL } from '../graphql/query'
import { useLayoutEffect } from 'react'

export const JournalDetailContainer = () => {
  const [findJournal] = useQuery(FIND_JOURNAL)

  useLayoutEffect (() => {
      const handleFindJournal = async (id: number)
      => {
        try {
          const res = await findJournal({
            variables: {
              journalId: id
            }
          })
        }
      }
    }
  )
}
