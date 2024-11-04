import React, { useState, useRef } from "react";
import { Button, Container, Typography, Box, TextField } from "@mui/material";
import { generateKeyPair, encryptData, decryptData } from "../utils";
import { useNavigate } from 'react-router-dom';

const GeneratePage = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const inputRef = useRef(null);
  const [login, setLogin] = useState("");
  const navigate = useNavigate();

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
  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard
        .writeText(inputRef.current.textContent.replace(/\u200B/g, ""))
        .then(() => {
          alert("Copied");
        });
    }
  };
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(login)
    console.log(publicKey)
    localStorage.setItem("login", login);
    localStorage.setItem("publicKey", publicKey);
    navigate('/messenger/');
  };
  return (
    <Container maxWidth="md">
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
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
            <Typography variant="h6">Public Key (save this)</Typography>
            <TextField
              name="password"
              type="password"
              value={publicKey}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
              ref={inputRef}
              onClick={copyToClipboard}
              required
            />
          </Box>
        )}

        {privateKey && (
          <>
            <Box mt={4}>
              <Typography variant="h6">
                Private Key (secretley share with friend)
              </Typography>
              <TextField
                value={privateKey}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  readOnly: true,
                }}
                ref={inputRef}
                onClick={copyToClipboard}
              />
            </Box>
            <Box mt={4}>
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
          </>
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
    </form>
    </Container>
  );
};

export default GeneratePage;
