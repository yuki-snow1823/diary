import React from 'react'
import { type } from 'os'
import { User } from '../../App'

type Props = {
  currentUser: User | undefined
  email: string
  password: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: () => Promise<void>
}

const LoginPresentational: React.FC<Props> = (props) => {
  return (
    <>
      <form>
        {props.currentUser ? <h2>{props.email}でログインしてるよ</h2> : ''}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            required
          />
        </div>
        <button
          onClick={() => props.handleSubmit()}
          type="button"
          disabled={!props.email || !props.password}
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default LoginPresentational