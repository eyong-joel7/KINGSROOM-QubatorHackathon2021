import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NotificationModal from '../Modals';
import { ChevronLeft } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ProfileScreen({pageControl}) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(()=> {
      if(localStorage.getItem('firstName')!==''){
          setFirstName(localStorage.getItem('firstName'))
          console.log('')
      }
      if(localStorage.getItem('lastName')!==''){
          setLastName(localStorage.getItem('lastName'))
      }
      if(localStorage.getItem('email')!==''){
          setEmail(localStorage.getItem('email'))
      }
  },[])
const update = (e) => {
    e.preventDefault();
  
    if(firstName && lastName && email){
        localStorage.setItem('firstName',firstName);
        localStorage.setItem('lastName',lastName);
        localStorage.setItem('email',email);
        setMessage('Profile Updated Successfully')
        setShow(true);
    }
    else {
        setMessage('Please validate all required fields');
        setShow(true)
    }
}
const handleClose = () => {setShow(false); pageControl('home')}

  return (
    <div style ={{width: '100%', padding:'20px'}}>
       <div onClick = {()=> handleClose()} style = {{display: 'flex', alignItems:'center'}}> <ChevronLeft/><span>Back</span></div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit = {(e)=> update(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
               value={firstName}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange = {(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastName}
                autoComplete="lastName"
                onChange = {(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                autoComplete="email"
                onChange = {(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
          type = "submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
   
      <NotificationModal message = {message}  show  = {show} handleClose = {handleClose}/>
    </Container>
    </div>
  );
}