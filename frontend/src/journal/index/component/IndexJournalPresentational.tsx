import React from 'react'
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material'

interface journal {
  id: number
  title: string
  content: string
}

type Props = {
  journals: journal[]
}

const IndexJournalPresentational: React.FC<Props> = ({ journals }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          投稿記事
        </Typography>

        <Paper elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journals.map((journal) => (
                <TableRow key={journal.id}>
                  <TableCell>{journal.id}</TableCell>
                  <TableCell>{journal.title}</TableCell>
                  <TableCell>{journal.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  )
}

export default IndexJournalPresentational
