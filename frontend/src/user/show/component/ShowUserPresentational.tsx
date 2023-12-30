import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { User } from 'App'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'

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
          マイページ
        </Typography>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>名前:</TableCell>
              <TableCell>{user.name}</TableCell>
            </TableRow>

            {user.nickname && (
              <TableRow>
                <TableCell>ニックネーム:</TableCell>
                <TableCell>{user.nickname}</TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell>Eメール:</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}

export default ShowUserPresentational