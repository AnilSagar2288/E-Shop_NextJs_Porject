import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/style';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import {useForm, Controller} from 'react-hook-form';
import {useSnackbar} from 'notistack';


export default function Register () {
  const {handleSubmit, control, formState: {errors}} = useForm ();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar ();
  const router = useRouter();
  const {redirect} = router.query;
  const {state, dispatch} = useContext (Store);
  const {userInfo} = state;

  useEffect(() => {
    if(userInfo){
      router.push('/');
    }
  }, []);


  const classes = useStyles ();
  const sumitHandler = async ({name,email, password, confirmPassword}) => {
    closeSnackbar ();
    if(password !== confirmPassword){
      enqueueSnackbar ("password don't match",{variant: 'error'});      
      return;
    }
    try {
      const {data} = await axios.post ('api/users/register', {name,email, password});
      dispatch({type: 'USER_LOGIN', payload:data})
      Cookies.set('userInfo', JSON.stringify({...data}));
      router.push(redirect || '/');

    } catch (err) {
      enqueueSnackbar (
        err.response.data ? err.response.data.message : err.message,
        {variant: 'error'}
      );
    }
  };
  return (
    <Layout title="Register">
      <form onSubmit={handleSubmit(sumitHandler)} className={classes.forms}>
        <Typography component="h1" variant="h1">
        Register
        </Typography>
        <List>
        <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2
              }}
              render={({field}) => (
                <TextField
                  variant="outlined"
                  id="name"
                  label="Name"
                  inputProps={{type: 'name'}}
                  fullWidth
                  error={Boolean (errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                          ? 'Name length is more than 1'
                          : 'Name is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />

          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({field}) => (
                <TextField
                  variant="outlined"
                  id="email"
                  label="Email"
                  inputProps={{type: 'email'}}
                  fullWidth
                  error={Boolean (errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />

          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({field}) => (
                <TextField
                  variant="outlined"
                  id="password"
                  label="Password"
                  inputProps={{type: 'password'}}
                  fullWidth
                  error={Boolean (errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                          ? 'Password length is more than 5'
                          : 'Password is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({field}) => (
                <TextField
                  variant="outlined"
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{type: 'password'}}
                  fullWidth
                  error={Boolean (errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                          ? 'Confirm Password length is more than 5'
                          : 'Confirm Password is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" color="primary" fullWidth>
            Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
