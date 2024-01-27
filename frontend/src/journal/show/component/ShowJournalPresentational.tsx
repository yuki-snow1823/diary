import { Container, Box, Typography } from '@mui/material'

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
      <Box mt={8}>
        <Box my={2}>
          <Typography variant="h3">{journal.title}</Typography>
        </Box>
        <Box my={6}>
          <Typography variant="body1" fontSize={24}>
            {journal.content}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
