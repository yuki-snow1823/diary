import { User } from '../../App'
import { useState } from 'react'
import { TextField, Button, Box, Container, Typography } from '@mui/material'

type Props = {
  currentUser: User | undefined
  handleCreateJournal: (title: string, content: string) => Promise<void>
}

const NewJournalPresentational: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    props.handleCreateJournal(title, content)
    setTitle('')
    setContent('')
  }

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="内容"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          投稿
        </Button>
      </Box>
    </Container>
  )
}

export default NewJournalPresentational
