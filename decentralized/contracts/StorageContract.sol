// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StorageContract {
    mapping(address => mapping(string => string)) private fileMetadata; // User address -> File name -> IPFS hash
    mapping(address => string[]) private userFiles; // List of user's file names

    event FileUploaded(address indexed user, string fileName, string ipfsHash);

    function uploadFile(string memory fileName, string memory ipfsHash) public {
        require(bytes(fileMetadata[msg.sender][fileName]).length == 0, "File exists");
        fileMetadata[msg.sender][fileName] = ipfsHash;
        userFiles[msg.sender].push(fileName);
        emit FileUploaded(msg.sender, fileName, ipfsHash);
    }

    function getFileHash(string memory fileName) public view returns (string memory) {
        return fileMetadata[msg.sender][fileName];
    }

    function getUserFiles() public view returns (string[] memory) {
        return userFiles[msg.sender];
    }
} 