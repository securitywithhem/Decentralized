import React, { useState, useEffect } from 'react';
import { getUserFiles, getFileHash } from '../utils/web3';
import { fetchFromIPFS } from '../utils/ipfs';
import { decryptFile, deriveKey } from '../utils/encryption';

const FileList = ({ signer }) => {
  const [files, setFiles] = useState([]);
  const [passphrase, setPassphrase] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      const userFiles = await getUserFiles(signer);
      setFiles(userFiles);
    };
    if (signer) loadFiles();
  }, [signer]);

  const handleDownload = async (fileName) => {
    const ipfsHash = await getFileHash(signer, fileName);
    const encrypted = await fetchFromIPFS(ipfsHash);
    const address = await signer.getAddress();
    const key = deriveKey(address, passphrase);
    const decrypted = decryptFile(encrypted, key);
    setSelectedFile(decrypted); // For display; for download, create blob
  };

  return (
    <div>
      <input type="password" placeholder="Passphrase" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
      <ul>
        {files.map((file) => (
          <li key={file}>
            {file} <button onClick={() => handleDownload(file)}>Download/Preview</button>
          </li>
        ))}
      </ul>
      {selectedFile && <pre>{selectedFile}</pre>} {/* For images: <img src={selectedFile} /> */}
    </div>
  );
};

export default FileList;