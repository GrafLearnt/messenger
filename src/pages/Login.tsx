import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [privateKey, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem('login', login);
    localStorage.setItem('privateKey', privateKey);
    navigate('/messenger/');
  };

  return (
    <Container maxWidth="sm">
      <form>
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
          required
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={privateKey}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <Button
          type="submit"
          name="submit"
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Submit
        </Button>
      </Box>
      </form>
    </Container>
  );
};

export default Login;