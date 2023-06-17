import { Button, Box } from '@mui/material'
import { Favorite, Delete, Add, AccountCircle } from '@mui/icons-material'

export const Test = () => {
  return (
    <Box>
      <Button variant="contained">Hello World</Button>
      <Favorite></Favorite>
      <Delete></Delete>
      <Add></Add>
      <AccountCircle></AccountCircle>
    </Box>
  )
}
