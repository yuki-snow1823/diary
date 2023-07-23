import { JournalNewHooks } from '../hooks/JournalNewHooks'
import NewJournalPresentational from './JournalNewPresentational'

export const NewJournalContainer = () => {
  const {
    currentUser,
    title,
    content,
    handleCreateJournal,
    setTitle,
    setContent
  } = JournalNewHooks()

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
