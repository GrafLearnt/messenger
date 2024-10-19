// utils/cryptoUtils.js

// Function to generate RSA key pair
export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: "SHA-256" },
    },
    true, // Whether the key is extractable (i.e., can be used in exportKey)
    ["encrypt", "decrypt"]
  );

  // Export the public and private keys
  const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return {
    publicKey: arrayBufferToBase64(publicKey),
    privateKey: arrayBufferToBase64(privateKey),
  };
}

// Function to encrypt data using the public key
export async function encryptData(publicKeyString, data) {
  const publicKey = await importPublicKey(publicKeyString);
  const encodedData = new TextEncoder().encode(data);

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encodedData
  );

  return arrayBufferToBase64(encryptedData);
}

// Function to decrypt data using the private key
export async function decryptData(privateKeyString, encryptedData) {
  const privateKey = await importPrivateKey(privateKeyString);
  const encryptedBuffer = base64ToArrayBuffer(encryptedData);

  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedBuffer
  );

  return new TextDecoder().decode(decryptedData);
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return window.btoa(binary);
}

// Helper function to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binary = window.atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}

// Helper function to import a public key from a base64 string
async function importPublicKey(base64Key) {
  const binaryDerString = window.atob(base64Key);
  const binaryDer = str2ab(binaryDerString);

  return await window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
}

// Helper function to import a private key from a base64 string
async function importPrivateKey(base64Key) {
  const binaryDerString = window.atob(base64Key);
  const binaryDer = str2ab(binaryDerString);

  return await window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
}

// Convert string to ArrayBuffer
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}