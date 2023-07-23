import { User } from '../../../App'
import { TextField, Button, Box, Container, Typography } from '@mui/material'

type Props = {
  currentUser: User | undefined
  title: string
  content: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setContent: React.Dispatch<React.SetStateAction<string>>
  handleCreateJournal: () => Promise<void>
}

const NewJournalPresentational: React.FC<Props> = (props) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="div" gutterBottom>
          新規投稿
        </Typography>
        <TextField
          fullWidth
          label="タイトル"
          variant="outlined"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="内容"
          variant="outlined"
          multiline
          rows={4}
          value={props.content}
          onChange={(e) => props.setContent(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={props.handleCreateJournal}
          sx={{ mt: 3 }}
        >
          投稿
        </Button>
      </Box>
    </Container>
  )
}

export default NewJournalPresentational
