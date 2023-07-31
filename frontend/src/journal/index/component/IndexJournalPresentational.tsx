import { Container, Box, Typography } from "@mui/material"
import React from "react"

interface journal {
  id: number
  title: string
  content: string
}

type Props = {
  journals: journal[]
}

const IndexJournalPresentational: React.FC<Props> = (props) => {
  const journals = props.journals
  return (
    <>
      <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="div" gutterBottom>
          投稿記事一覧
        </Typography>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>content</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => {
              return (
                <tr>
                  <td>{journal.id}</td>
                  <td>{journal.title}</td>
                  <td>{journal.content}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Box>
    </Container>
    </>
  )
}

export default IndexJournalPresentational