import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'

interface journal {
  id: number
  title: string
  content: string
}

type Props = {
  journal: journal
}

export const ShowJournalPresentational: React.FC<Props> = ({ journal }) => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>タイトル：</TableCell>
              <TableCell>{journal.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>内容：</TableCell>
              <TableCell>{journal.content}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}
