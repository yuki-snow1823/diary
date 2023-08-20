import { SignUpHooks } from '../hooks/SignUpHooks'
import SignUpPresentational from './SignUpPresentational'

export const SignUpContainer = () => {
  const {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handleSubmit,
    currentUser,
    name,
    email,
    password,
    passwordConfirmation
  } = SignUpHooks()

  return (
    <SignUpPresentational
      currentUser={currentUser}
      name={name}
      email={email}
      password={password}
      passwordConfirmation={passwordConfirmation}
      handleNameChange={handleNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handlePasswordConfirmationChange={handlePasswordConfirmationChange}
      handleSubmit={handleSubmit}
    />
  )
}
