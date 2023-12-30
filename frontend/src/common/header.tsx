import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from 'App'
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  const { isSignedIn } = useContext(AuthContext)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const renderMobileMenuItems = () => {
    return (
      <>
        {!isSignedIn && (
          <ListItem component={RouterLink} to="/" onClick={handleDrawerToggle}>
            ログイン
          </ListItem>
        )}
        {!isSignedIn && (
          <ListItem
            component={RouterLink}
            to="/sign_up"
            onClick={handleDrawerToggle}
          >
            新規登録
          </ListItem>
        )}
        <ListItem
          component={RouterLink}
          to="/users"
          onClick={handleDrawerToggle}
        >
          ユーザー
        </ListItem>
        {isSignedIn && (
          <ListItem
            component={RouterLink}
            to="/journals/new"
            onClick={handleDrawerToggle}
          >
            日記を書く
          </ListItem>
        )}
        <ListItem
          component={RouterLink}
          to="/journals"
          onClick={handleDrawerToggle}
        >
          みんなの日記
        </ListItem>
      </>
    )
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#372BA9' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <RouterLink
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Diary
          </RouterLink>
        </Typography>
        {isMobile ? (
          <Box sx={{ ml: 'auto' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <List>{renderMobileMenuItems()}</List>
            </Drawer>
          </Box>
        ) : (
          <Box sx={{ ml: 'auto' }}>
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
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
