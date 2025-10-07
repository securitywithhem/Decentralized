require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY", // Get free key from infura.io
      accounts: ["YOUR_METAMASK_PRIVATE_KEY"] // Export from MetaMask (test account only!)
    }
  }
};