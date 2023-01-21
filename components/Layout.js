import React, {useContext, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/Link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {createTheme} from '@material-ui/core/styles';
import useStyles from '../utils/style';
import {Store} from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({title, description, children}) {
  const router = useRouter();
  const {state, dispatch} = useContext (Store);
  const {darkMode, cart, userInfo} = state;
  const theme = createTheme ({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles ();
  const darkmodeChangeHandler = () => {
    dispatch ({type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'});
    const newDarkMode = !darkMode;
    Cookies.set ('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) =>{
    setAnchorEl(e.currentTarget);
  }

  const loginMenuCloseHandler = () =>{
    setAnchorEl(null);
  }

  const logoutClickHandler = () =>{
    setAnchorEl(null);
    dispatch({type: 'USER_LOGOUT'});
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/')
  }
  return (
    <div>
      <Head>
        <title>{title ? `${title}- Project Amazona` : ''}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow} />
            <div>
              <Switch checked={darkMode} onChange={darkmodeChangeHandler} />
              <NextLink href="/cart">
                <Link>
                  {cart.cartItems.length > 0
                    ? <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    : 'Cart'}
                </Link>
              </NextLink>
              {userInfo
                ? (
                <>
                <Button className={classes.navbarButton}
                  aria-controls="simple-menu"
                  aria-haspopup="true"                  
                  onClick={loginClickHandler}
                  >
                    {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                  <MenuItem onClick={loginMenuCloseHandler}>My account</MenuItem>
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
                </> 
                ): ( <NextLink href="/login">
                    <Link>Login</Link>
                  </NextLink>)}
            </div>
          </Toolbar>
        </AppBar>

        <Container className={classes.main}>
          {children}
        </Container>
        <footer className={classes.footer}>
          <Typography>
            All rights reserved. Next project amazona.
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
