import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import { useSnackbar } from 'notistack';
import React, {useContext, useEffect, useState} from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import {Store} from '../utils/Store';
import useStyles from '../utils/style';

export default function Payment () {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const router = useRouter ();
  const {state, dispatch} = useContext (Store);
  const {cart: {shippingAddress}} = state;
  const [paymentMethod, setPaymentMethod] = useState ();
  const classes = useStyles();

  
  useEffect (() => {
    if (!shippingAddress.address) {
      router.push ('/shipping');
    } else {
      setPaymentMethod (Cookies.get ('paymnetMethod') || '');
    }
  }, []);
  const submitHandler = e => {
    closeSnackbar();
    e.preventDefault ();
    if(!paymentMethod){
      enqueueSnackbar("Payment method is required", {variant:'error'})
    }else{
      dispatch({type:'SAVE_PAYMENT_METHOD', payload:paymentMethod})
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className={classes.forms} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          <List>
            <ListItem>
              <FormControl>
                <RadioGroup
                  aria-level="Payment Method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={e => setPaymentMethod (e.target.value)}
                >
                  <FormControlLabel
                    label="Paypal"
                    value="Paypal"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Stripe"
                    value="Stripe"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button fullWidth type='submit' variant='contained' color='primary'>Continue</Button>
            </ListItem>
            <ListItem>
              <Button fullWidth type='button' variant='contained' onClick={()=>router.push('/shipping')}>Back</Button>
            </ListItem>
          </List>
        </Typography>
      </form>
    </Layout>
  );
}
