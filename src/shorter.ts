import pako from "pako";

export function compressBase64(inputStr) {
  // Compress and encode a string to Base64
  const compressedData = pako.deflate(inputStr, { to: "string" });
  return btoa(compressedData);
}

export function decompressBase64(encodedStr) {
  // Decode and decompress a Base64 string
  const compressedData = atob(encodedStr);
  const decompressedData = pako.inflate(compressedData, { to: "string" });
  return decompressedData;
}