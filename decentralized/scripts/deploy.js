async function main() {
  const StorageContract = await ethers.getContractFactory("StorageContract");
  const contract = await StorageContract.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}
main().catch((error) => { console.error(error); process.exit(1); });