import React from 'react'
import { User } from '../../App'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {props.currentUser ? (
          <Typography variant="h4" component="h2" gutterBottom>
            {props.currentUser.email}
            <br />
            でログインしてるよ
          </Typography>
        ) : null}

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

        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={!props.email || !props.password}
          onClick={props.handleSubmit}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  )
}

export default SignInPresentational
