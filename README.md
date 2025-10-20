# Decentralized Cloud Storage — Zero-Knowledge Prototype

This is a minimal, working prototype that demonstrates:
- Client-side encryption in the browser (AES-GCM)
- Upload encrypted blob to IPFS
- Register file metadata & permissions on Ethereum (Hardhat local chain or Sepolia)
- Permission check before decrypting

> Note: This is an academic prototype. For production, use proper HKDF, chunking/streaming, authenticated manifests, and secure IPFS credentials if using a provider.

## 1) Prerequisites
- Node.js >= 18
- MetaMask in your browser
- (Optional) Local IPFS daemon or an IPFS provider account
- RPC endpoint for Sepolia (Infura/Alchemy/etc.) if deploying to testnet

## 2) Install & Compile
```bash
npm install
npm run compile
```

## 3) Local Hardhat Network
In one terminal:
```bash
npm run node
```
In another terminal (new shell):
```bash
npm run deploy:local
```
Copy the printed `FileRegistry` address.

## 4) Deploy to Sepolia
Create `.env` from `.env.example` and fill:
```
SEPOLIA_RPC_URL=...
PRIVATE_KEY=...
ETHERSCAN_API_KEY=...
```
Then:
```bash
npm run deploy:sepolia
```

## 5) Frontend
Open `frontend/index.html` via a static server (recommended). For a quick test:
```bash
# Python 3
cd frontend
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```

Edit `frontend/app.js` and set:
```js
const CONTRACT_ADDRESS = "PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE";
```
Also adjust the IPFS client endpoint as needed.

## 6) Usage Flow
1. **Connect Wallet** (MetaMask).  
2. **Encrypt & Upload**: pick a file, it encrypts in-browser and uploads the ciphertext to IPFS, then calls `registerFile(...)`.  
3. **Grant Access**: enter `fileId` and another address to grant.  
4. **Retrieve & Decrypt**: the grantee (or owner) provides the `fileId` and the CID; app checks on-chain permission, fetches from IPFS, and decrypts in-browser.

## 7) Notes
- The AES key is derived from a message signature (demo-level KDF). Replace with a proper HKDF and per-file salt strategy.
- For chunking large files, implement streams and a manifest (list of per-chunk CIDs) that is stored as the `rootCid` or a JSON manifest CID.
- Keep provider credentials **off** the frontend. If using provider APIs, proxy via a minimal backend.

## 8) Testing
```bash
npm test
```
