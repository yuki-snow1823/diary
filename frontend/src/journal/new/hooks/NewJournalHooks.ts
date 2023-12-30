import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_JOURNAL } from '../graphql/mutation'
import { AuthContext } from '../../../App'
import { useNavigate } from 'react-router-dom'

export const NewJournalHooks = () => {
  const navigate = useNavigate()
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

      const journalId = res.data.createJournal.journal.id

      navigate(`/journals/${journalId}`)

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    handleCreateJournal,
    setTitle,
    setContent,
    title,
    content,
    currentUser
  }
}
