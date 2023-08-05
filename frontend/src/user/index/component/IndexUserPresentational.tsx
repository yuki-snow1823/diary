import { Container, Box, Typography } from '@mui/material'
import React from 'react'

interface user {
  id: number
  name: string
  nickname: string
  email: string
}

type Props = {
  users: user[]
}

export const IndexUserPresentational: React.FC<Props> = (props) => {
  const users = props.users
  return (
    <>
      <Container>
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="div" gutterBottom>
            ユーザー一覧
          </Typography>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>nickname</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Container>
    </>
  )
}
