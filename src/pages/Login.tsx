import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    localStorage.setItem('login', login);
    localStorage.setItem('password', password);
    console.debug(login, password)
    // alert('Password stored in local storage');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          name="login"
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Login;