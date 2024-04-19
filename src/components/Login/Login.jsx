import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './style.css';
const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // Add a state variable to control the shaking animation

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://hic-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.status) {
          const token = responseData.data.token;
          const userId = responseData.data.userID;
          localStorage.setItem('authToken', token);
          localStorage.setItem('userID', userId);
          window.location.href = '/';
        } else {
          // Handle unsuccessful login, e.g., show an error message.
          setError('Login failed: ' + responseData.message);
          setIsShaking(true); // Trigger the shake animation
          setTimeout(() => {
            setIsShaking(false);
          }, 300);
        }
      } else {
        // Handle other network errors and access response data
        setError(responseData.message);
        setIsShaking(true); // Trigger the shake animation
        setTimeout(() => {
          setIsShaking(false);
        }, 300);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setIsShaking(true); // Trigger the shake animation
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}></Box>

      <Grid container component='main' sx={{ height: 'calc(100vh - 64px)' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/innercircle/login-logo.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'light',
            backgroundPosition: 'center',
            height: '300px',
            width: '150px',
            marginTop: '200px',
            backgroundSize: 'contain',
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              height: '550px',
              width: '400px',
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: '100px',
              padding: '50px',
              boxShadow: '1px 2px 7px rgba(0.3, 0.3, 0.3, 0.3)', // Add your shadow properties here
              borderRadius: '20px',
              animation: isShaking ? 'shake 0.5s' : '',
            }}
          >
            <img
              src='https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/innercircle/new/images/inner-circle-logo.webp'
              alt='Logo'
              height='400'
              width='150'
              style={{ marginRight: '16px', marginTop: '-20px' }}
            />
            <Avatar sx={{ m: 1, backgroundColor: '#FF8A4C' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5' sx={{ fontWeight: 'bold' }}>
              Sign in
            </Typography>

            {error && (
              <p
                className='text-danger'
                style={{
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  padding: '10px',
                  border: '1px solid #f5c6cb',
                  borderRadius: '5px',
                  marginTop: '10px',
                }}
              >
                {error}
              </p>
            )}

            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={toggleShowPassword}
                      aria-label={
                        showPassword ? 'Hide Password' : 'Show Password'
                      }
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#FF8A4C',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: 'red',
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
