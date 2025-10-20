// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title FileRegistry - Minimal on-chain metadata & permission registry for encrypted IPFS files
contract FileRegistry {
    struct File {
        address owner;
        string rootCid;         // CID or manifest CID
        bytes32 fileHash;       // SHA-256 of plaintext (optional if you prefer ciphertext hash)
        uint256 size;           // bytes (plaintext size for UX only)
        uint256 uploadedAt;     // block timestamp
        string filename;        // UI convenience
    }

    uint256 public fileCount;
    mapping(uint256 => File) public files;
    mapping(uint256 => mapping(address => bool)) public permissions; // fileId => (addr => allowed)

    event FileRegistered(uint256 indexed fileId, address indexed owner, string rootCid, string filename);
    event AccessGranted(uint256 indexed fileId, address indexed grantee);
    event AccessRevoked(uint256 indexed fileId, address indexed grantee);

    modifier onlyOwner(uint256 fileId) {
        require(files[fileId].owner == msg.sender, "Not owner");
        _;
    }

    function registerFile(
        string calldata rootCid,
        bytes32 fileHash,
        uint256 size,
        string calldata filename
    ) external returns (uint256) {
        fileCount += 1;
        files[fileCount] = File({
            owner: msg.sender,
            rootCid: rootCid,
            fileHash: fileHash,
            size: size,
            uploadedAt: block.timestamp,
            filename: filename
        });
        // owner has implicit access
        permissions[fileCount][msg.sender] = true;
        emit FileRegistered(fileCount, msg.sender, rootCid, filename);
        return fileCount;
    }

    function grantAccess(uint256 fileId, address grantee) external onlyOwner(fileId) {
        permissions[fileId][grantee] = true;
        emit AccessGranted(fileId, grantee);
    }

    function revokeAccess(uint256 fileId, address grantee) external onlyOwner(fileId) {
        permissions[fileId][grantee] = false;
        emit AccessRevoked(fileId, grantee);
    }

    function hasAccess(uint256 fileId, address user) external view returns (bool) {
        return permissions[fileId][user];
    }
}
