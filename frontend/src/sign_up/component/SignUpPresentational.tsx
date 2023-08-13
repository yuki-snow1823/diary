import React from 'react'
import { User } from '../../App'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {
  currentUser: User | undefined
  name: string
  email: string
  password: string
  passwordConfirmation: string
  handleNameChange: React.ChangeEventHandler<HTMLInputElement>
  handleEmailChange: React.ChangeEventHandler<HTMLInputElement>
  handlePasswordChange: React.ChangeEventHandler<HTMLInputElement>
  handlePasswordConfirmationChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: () => Promise<void>
}

const SignUpPresentational: React.FC<Props> = (props) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          新規登録
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          id="name"
          type="text"
          label="Name"
          value={props.name}
          onChange={props.handleNameChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          id="email"
          type="email"
          label="Email"
          value={props.email}
          onChange={props.handleEmailChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          id="password"
          type="password"
          label="Password"
          value={props.password}
          onChange={props.handlePasswordChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          id="passwordConfirmation"
          type="password"
          label="Password Confirmation"
          value={props.passwordConfirmation}
          onChange={props.handlePasswordConfirmationChange}
          required
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={
            !props.email ||
            !props.password ||
            props.password !== props.passwordConfirmation
          }
          onClick={props.handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  )
}

export default SignUpPresentational
