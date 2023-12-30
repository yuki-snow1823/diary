import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from 'App'

const Header = () => {
  const { isSignedIn } = useContext(AuthContext)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Diary
          </RouterLink>
        </Typography>
        {!isSignedIn && (
          <Button color="inherit" component={RouterLink} to="/">
            ログイン
          </Button>
        )}
        {!isSignedIn && (
          <Button color="inherit" component={RouterLink} to="/sign_up">
            新規登録
          </Button>
        )}
        <Button color="inherit" component={RouterLink} to="/users">
          ユーザー
        </Button>
        {isSignedIn && (
          <Button color="inherit" component={RouterLink} to="/journals/new">
            日記を書く
          </Button>
        )}
        <Button color="inherit" component={RouterLink} to="/journals">
          みんなの日記
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
