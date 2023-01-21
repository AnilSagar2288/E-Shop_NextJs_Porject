import {
    Button,
    List,
    ListItem,
    TextField,
    Typography,
  } from '@material-ui/core';
  import React, {useContext, useEffect} from 'react';
  import Layout from '../components/Layout';
  import useStyles from '../utils/style';
  import NextLink from 'next/link';
  import { Store } from '../utils/Store';
  import { useRouter } from 'next/router';
  import Cookies from 'js-cookie';
  import {useForm, Controller} from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';

  
  
  export default function Shipping () {
    const {handleSubmit, control, formState: {errors},setValue} = useForm ();
    const router = useRouter();
    const {redirect} = router.query;
    const {state, dispatch} = useContext (Store);
    const {userInfo, cart:{shippingAddress}} = state;
  
    useEffect(() => {
      if(!userInfo){
        router.push('/login?redirect=/shipping');
      }
      setValue('fullName',shippingAddress.fullName );
      setValue('address',shippingAddress.address );
      setValue('city',shippingAddress.city );
      setValue('postalCode',shippingAddress.postalCode );
      setValue('country',shippingAddress.country );

    }, []);
  
  
    const classes = useStyles ();
    const sumitHandler =  ({fullName,address, city, postalCode,country}) => {          
        dispatch({type: 'SAVE_SHIPPING_ADDRESS', payload:{fullName,address, city, postalCode,country}})
        Cookies.set('shippingAddress', JSON.stringify({...{fullName,address, city, postalCode,country}}));
        router.push('/payment');      
    };
    return (
      <Layout title="Shipping Address">
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(sumitHandler)} className={classes.forms}>
          <Typography component="h1" variant="h1">
          Shipping Address
          </Typography>
          <List>
          <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2
                }}
                render={({field}) => (
                  <TextField
                    variant="outlined"
                    id="fullName"
                    label="Full Name"                    
                    fullWidth
                    error={Boolean (errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === 'minLength'
                            ? 'Full Name length is more than 1'
                            : 'Full Name is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2
                }}
                render={({field}) => (
                  <TextField
                    variant="outlined"
                    id="address"
                    label="Address"                    
                    fullWidth
                    error={Boolean (errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                            ? 'Address length is more than 1'
                            : 'Address is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2
                }}
                render={({field}) => (
                  <TextField
                    variant="outlined"
                    id="city"
                    label="City"                    
                    fullWidth
                    error={Boolean (errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === 'minLength'
                            ? 'City length is more than 1'
                            : 'City is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2
                }}
                render={({field}) => (
                  <TextField
                    variant="outlined"
                    id="postalCode"
                    label="Postal Code"                    
                    fullWidth
                    error={Boolean (errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === 'minLength'
                            ? 'Postal Code length is more than 1'
                            : 'Postal Code is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2
                }}
                render={({field}) => (
                  <TextField
                    variant="outlined"
                    id="country"
                    label="Country"                    
                    fullWidth
                    error={Boolean (errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === 'minLength'
                            ? 'Country length is more than 1'
                            : 'Country is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Button variant="contained" type="submit" color="primary" fullWidth>
              Continue
              </Button>
            </ListItem>            
          </List>
        </form>
      </Layout>
    );
  }
  