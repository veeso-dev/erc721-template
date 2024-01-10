// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyNft is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    // maximum amount of mintable nft
    uint256 public MAX_SUPPLY;

    constructor(
        address initialOwner
    ) ERC721("MyNft", "NFT") Ownable(initialOwner) {
        _tokenIdCounter = 0;
        MAX_SUPPLY = 7777;
    }

    /// @notice mint a new NFT
    /// @param _receiver address to give the nft to
    /// @param _uri token uri
    /// @return _newItemId the id of the minted token
    function safeMint(
        address _receiver,
        string memory _uri
    ) public onlyOwner returns (uint256 _newItemId) {
        require(
            _tokenIdCounter <= MAX_SUPPLY,
            "Mint would exceed max supply of tokens"
        );
        _tokenIdCounter += 1;
        uint256 tokenId = _tokenIdCounter;
        _safeMint(_receiver, tokenId);
        _setTokenURI(tokenId, _uri);

        return tokenId;
    }
}
