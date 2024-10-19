import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material';
import { generateKeyPair, encryptData, decryptData } from '../utils';

const GeneratePage = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  // Generate Key Pair and display
  const handleGenerateKeys = async () => {
    const { publicKey, privateKey } = await generateKeyPair();
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  };

  // Encrypt message with public key
  const handleEncrypt = async () => {
    const encrypted = await encryptData(publicKey, message);
    setEncryptedMessage(encrypted);
  };

  // Decrypt message with private key
  const handleDecrypt = async () => {
    const decrypted = await decryptData(privateKey, encryptedMessage);
    setDecryptedMessage(decrypted);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Generate RSA Key Pair
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateKeys}
          fullWidth
        >
          Generate Keys
        </Button>

        {publicKey && (
          <Box mt={4}>
            <Typography variant="h6">Public Key</Typography>
            <TextField
              value={publicKey}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        )}

        {privateKey && (
          <Box mt={4}>
            <Typography variant="h6">Private Key</Typography>
            <TextField
              value={privateKey}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        )}

        <Box mt={4}>
          <Typography variant="h6">Message to Encrypt</Typography>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={2}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEncrypt}
            fullWidth
            sx={{ mt: 2 }}
          >
            Encrypt Message
          </Button>
        </Box>

        {encryptedMessage && (
          <Box mt={4}>
            <Typography variant="h6">Encrypted Message</Typography>
            <TextField
              value={encryptedMessage}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDecrypt}
              fullWidth
              sx={{ mt: 2 }}
            >
              Decrypt Message
            </Button>
          </Box>
        )}

        {decryptedMessage && (
          <Box mt={4}>
            <Typography variant="h6">Decrypted Message</Typography>
            <TextField
              value={decryptedMessage}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default GeneratePage;