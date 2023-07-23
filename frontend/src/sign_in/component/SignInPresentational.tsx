import React from 'react'
import { User } from 'App'

type Props = {
  currentUser: User | undefined
  email: string
  password: string
  handleEmailChange: React.ChangeEventHandler<HTMLInputElement>
  handlePasswordChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: () => Promise<void>
}

const SignInPresentational: React.FC<Props> = (props) => {
  return (
    <>
      <form>
        {props.currentUser ? (
          <h2>{props.currentUser.email}でログインしてるよ</h2>
        ) : (
          ''
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={props.email}
            onChange={props.handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
            required
          />
        </div>
        <button
          onClick={props.handleSubmit}
          type="button"
          disabled={!props.email || !props.password}
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default SignInPresentational
