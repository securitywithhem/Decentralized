import React, { useState } from 'react';
import { encryptFile, deriveKey } from '../utils/encryption';
import { uploadToIPFS } from '../utils/ipfs';
import { uploadMetadata } from '../utils/web3';

const FileUpload = ({ signer }) => {
  const [file, setFile] = useState(null);
  const [passphrase, setPassphrase] = useState('');
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file || !passphrase) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target.result;
      const address = await signer.getAddress();
      const key = deriveKey(address, passphrase);
      const encrypted = encryptFile(fileData, key);
      const ipfsHash = await uploadToIPFS(encrypted);
      await uploadMetadata(signer, file.name, ipfsHash);
      setStatus('Uploaded securely!');
    };
    reader.readAsText(file); // For binary files, use readAsArrayBuffer and adjust
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input type="password" placeholder="Passphrase" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default FileUpload;