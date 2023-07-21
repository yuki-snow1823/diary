import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SignInPresentational from './SignInPresentational';

test('SignInPresentationalのフォームが適切に入力できる', async () => {
  let mockEmail = '';
  let mockPassword = '';

  const handleEmailChange = jest.fn(event => {
    mockEmail = event.target.value;
  });

  const handlePasswordChange = jest.fn(event => {
    mockPassword = event.target.value;
  });

  const handleSubmit = jest.fn(() => Promise.resolve());

  render(
    <SignInPresentational
      currentUser={undefined}
      email={mockEmail}
      password={mockPassword}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );

  const emailField = screen.getByLabelText(/email/i);
  const passwordField = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole('button', { name: /sign in/i });

  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();

  fireEvent.change(emailField, { target: { value: 'test@email.com' } });
  fireEvent.change(passwordField, { target: { value: 'testpassword' } });
  fireEvent.click(signInButton);

  expect(handleEmailChange).toHaveBeenCalledTimes(1);
  expect(handlePasswordChange).toHaveBeenCalledTimes(1);
  // handleSubmitもテストしたかったが、うまくいかなかったので一旦保留
});
