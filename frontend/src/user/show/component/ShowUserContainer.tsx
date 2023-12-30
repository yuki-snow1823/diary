import { ShowUserHooks } from '../hooks/ShowUserHooks'
import ShowUserPresentational from './ShowUserPresentational'

export const ShowUserContainer = () => {
  const { user } = ShowUserHooks()

  return <ShowUserPresentational user={user} />
}
