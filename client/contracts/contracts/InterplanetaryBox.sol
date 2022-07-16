// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InterplanetaryBox is Ownable {
    string public Key;
    mapping(string => string) public files;
    string[] private fileNames;

    constructor(string memory key)  {
        Key = key;
    }
    
    function addFile(string memory cid, string memory fileName) public onlyOwner {
        fileNames.push(fileName);
        files[fileName] = cid;
    }

    function getFiles() public view onlyOwner returns (string[] memory) {
        return fileNames;
    }
}
