import { ethers } from 'ethers';

const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // Paste from deploy step
const ABI = [ /* Paste the ABI from artifacts/contracts/StorageContract.json after compile */ ];

export async function connectWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

export async function uploadMetadata(signer, fileName, ipfsHash) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  const tx = await contract.uploadFile(fileName, ipfsHash);
  await tx.wait();
}

export async function getUserFiles(signer) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return await contract.getUserFiles();
}

export async function getFileHash(signer, fileName) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return await contract.getFileHash(fileName);
}