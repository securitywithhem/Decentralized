import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); // Free Infura IPFS gateway

export async function uploadToIPFS(encryptedData) {
  const { cid } = await ipfs.add(encryptedData);
  return cid.toString();
}

export async function fetchFromIPFS(ipfsHash) {
  const chunks = [];
  for await (const chunk of ipfs.cat(ipfsHash)) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
}