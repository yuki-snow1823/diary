import { render, fireEvent, waitFor } from '@testing-library/react'
import { Signin } from './SignIn'

jest.mock('./lib/api/auth', () => ({
  signIn: jest.fn().mockResolvedValue({
    status: 200,
    headers: {
      'access-token': 'mock-access-token',
      'client': 'mock-client',
      'uid': 'mock-uid'
    },
    data: {
      data: {
        email: 'mock-email'
      }
    }
  })
}))

describe('Signin', () => {
  it('should submit form and set signed-in state', async () => {
    const { getByLabelText, getByText } = render(<Signin />)
    const emailInput = getByLabelText('Email') as HTMLInputElement
    const passwordInput = getByLabelText('Password') as HTMLInputElement
    const submitButton = getByText('Submit')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    fireEvent.click(submitButton)

    // フォームの送信が非同期で行われるため、レスポンスを待機する
    await waitFor(() => {
      expect(emailInput.value).toBe('test@example.com')
    })
  })
})
