import { NewJournalHooks } from '../hooks/NewJournalHooks'
import NewJournalPresentational from './NewJournalPresentational'

export const JournalNewContainer = () => {
  const {
    currentUser,
    title,
    content,
    handleCreateJournal,
    setTitle,
    setContent
  } = NewJournalHooks()

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
