import React, { useState } from 'react';
import Login from './components/loginogin';
import FileUpload from './components/file_uploadpload';
import FileList from './components/filelistileList';
import './styles.css';

function App() {
  const [signer, setSigner] = useState(null);

  return (
    <div className="app">
      <h1>Decentralized Cloud Storage</h1>
      <Login onConnect={setSigner} />
      {signer && (
        <>
          <FileUpload signer={signer} />
          <FileList signer={signer} />
        </>
      )}
    </div>
  );
}

export default App;