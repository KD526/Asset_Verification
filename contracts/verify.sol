// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Verify is ERC721URIStorage, Ownable {

      uint256 private _tokenIds;

    constructor() ERC721("Government Document", "GDOC") Ownable(msg.sender) {}

    function mintDocument(address recipient, string memory metadataURI)
        public 
        returns (uint256)
    {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }
}