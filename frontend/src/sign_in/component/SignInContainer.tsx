import { SiginInHooks } from '../hooks/SiginInHooks'
import SignInPresentational from './SignInPresentational'

export const SignInContainer = () => {
  const {
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    currentUser,
    email,
    password
  } = SiginInHooks()

  return (
    <SignInPresentational
      currentUser={currentUser}
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  )
}
