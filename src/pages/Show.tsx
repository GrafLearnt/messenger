import React, { useState } from 'react';
import { compressBase64, decompressBase64 } from '../shorter';

export default function Show() {
  const [input, setInput] = useState('');
  const [compressed, setCompressed] = useState('');
  const [decompressed, setDecompressed] = useState('');

  const handleCompress = () => {
    const result = compressBase64(input);
    setCompressed(result);
  };

  const handleDecompress = () => {
    const result = decompressBase64(compressed);
    setDecompressed(result);
  };

  return (
    <div>
      <h2>Base64 Compression Demo</h2>
      <textarea value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleCompress}>Compress</button>
      <p>Compressed String: {compressed}</p>
      <button onClick={handleDecompress}>Decompress</button>
      <p>Decompressed String: {decompressed}</p>
    </div>
  );
}