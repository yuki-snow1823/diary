import { useMutation } from '@apollo/client'
import { CREATE_JOURNAL } from '../graphql/mutation'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../App'
import NewJournalPresentational from './JournalNewPresentational'


export const NewJournalContainer = () => {
  const { currentUser } = useContext(AuthContext)
  const [createJournal] = useMutation(CREATE_JOURNAL)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCreateJournal = async () => {
    try {
      const res = await createJournal({
        variables: {
          title: title,
          content: content,
          userId: currentUser?.id
        }
      })
      setTitle('')
      setContent('')
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  

  return (
    <NewJournalPresentational
      currentUser={currentUser}
      handleCreateJournal={handleCreateJournal}
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
    />
  )
}
