import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Typography, Box, Button, Paper } from '@mui/material';
import { generateKeyPair, encryptData, decryptData } from '../utils';
import { useLocation } from 'react-router-dom';
const MainPage = () => {
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [input, setInput] = useState(searchParams.get("m")||'');
  const [result, setResult] = useState('');
  const password = localStorage.getItem('password')
  // Check local storage for password and redirect to /login if not found
  useEffect(() => {
    const storedPassword = localStorage.getItem('password');
    if (!storedPassword) {
      navigate('/login'); // Redirect to /login if no password in localStorage
    }
  }, [navigate]);

  // Function to process input (you can modify this function as needed)
  const processInput = async () => {
    console.debug(password)
    console.debug(input)
    const decrypted = await decryptData(password, input);
    setResult(decrypted);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Logged as [{localStorage.getItem("login")}]
        </Typography>
        <TextField
          label="Enter something"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          margin="normal"
          InputProps={{
            sx: {
              backgroundColor: 'transparent', // Ensures it inherits the dark theme background
              color: 'inherit', // Inherits the text color from the dark theme
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={processInput}
          sx={{ marginTop: 2 }}
        >
          Process Text
        </Button>

        {result && (
          <Paper
            sx={{
              marginTop: 4,
              padding: 2,
              width: '100%',
              backgroundColor: '#2e2e2e',
            }}
            elevation={3}
          >
            <Typography variant="h6" gutterBottom>
              Result:
            </Typography>
            <Typography variant="body1">{result}</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default MainPage;