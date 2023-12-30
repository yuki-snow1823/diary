import { useQuery } from '@apollo/client'
import { FIND_JOURNAL } from '../graphql/query'
import { useParams } from 'react-router-dom'
import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'

export const ShowJournalContainer = () => {
  const urlParams = useParams<{ id: string }>()

  const { loading, error, data } = useQuery(FIND_JOURNAL, {
    variables: { id: urlParams.id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>ID:</TableCell>
              <TableCell>{data.journal.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Title:</TableCell>
              <TableCell>{data.journal.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Content:</TableCell>
              <TableCell>{data.journal.content}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}
