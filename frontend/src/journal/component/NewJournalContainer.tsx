import { useMutation } from '@apollo/client';
import { CREATE_JOURNAL } from '../graphql/mutation'
import { useContext } from 'react'
import { AuthContext } from '../../App'
import NewJournalPresentational from './NewJournalPresentational';

export const NewJournalContainer = () => {
  const { currentUser } = useContext(AuthContext)
  const [createJournal] = useMutation(CREATE_JOURNAL);

  const handleCreateJournal = async (title: string, content: string) => {
    try {
      const res = await createJournal({
        variables: {
          title,
          content,
          userId: currentUser?.id
        }
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <NewJournalPresentational
      currentUser={currentUser}
      handleCreateJournal={handleCreateJournal}
    />
  )
}
