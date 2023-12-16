import React from 'react';
import { Container, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

interface user {
  id: number;
  name: string;
  nickname: string;
  email: string;
}

type Props = {
  users: user[];
}

export const IndexUserPresentational: React.FC<Props> = ({ users }) => {
  return (
    <Container>
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          ユーザー一覧
        </Typography>

        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Nickname</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.nickname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  );
}
