import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { User } from 'App'

type Props = {
  user: User
}

const ShowUserPresentational: React.FC<Props> = ({ user }) => {
  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" align="center">
            ユーザーが見つかりません
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          ユーザー詳細
        </Typography>

        <Typography variant="h6">名前:</Typography>
        <Typography>{user.name}</Typography>

        {user.nickname && (
          <>
            <Typography variant="h6">ニックネーム:</Typography>
            <Typography>{user.nickname}</Typography>
          </>
        )}

        <Typography variant="h6">Eメール:</Typography>
        <Typography>{user.email}</Typography>
      </Box>
    </Container>
  )
}

export default ShowUserPresentational
