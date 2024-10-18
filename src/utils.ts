import forge from 'node-forge';

// Generate RSA key pair
const generateKeyPair = () => {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
  
  return { publicKey, privateKey };
};


// Encrypt a message using the public key
const encryptMessage = (message: string, publicKeyPem: string) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(message, 'RSA-OAEP');
  
  return forge.util.encode64(encrypted); // Encoded in Base64 for easier transmission
};

const decryptMessage = (encryptedMessage: string, privateKeyPem: string) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const encryptedBytes = forge.util.decode64(encryptedMessage);
  
  const decrypted = privateKey.decrypt(encryptedBytes, 'RSA-OAEP');
  return decrypted;
};

// const { publicKey, privateKey } = generateKeyPair();

// const message = "Hello, RSA!";
// const encryptedMessage = encryptMessage(message, publicKey);
// console.log("Encrypted:", encryptedMessage);

// const decryptedMessage = decryptMessage(encryptedMessage, privateKey);
// console.log("Decrypted:", decryptedMessage);