// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Sale {
    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price;
        uint256 amount;
    }

    IERC1155 public tokenContract;
    Listing[] public listings;

    constructor(IERC1155 _tokenContract) {
        tokenContract = _tokenContract;
    }

    function listToken(uint256 tokenId, uint256 price, uint256 amount) public {
        listings.push(Listing({
            seller: msg.sender,
            tokenId: tokenId,
            price: price,
            amount: amount
        }));
    }

    function getListings() public view returns (Listing[] memory) {
        return listings;
    }

    function buyToken(uint256 listingId) public payable {
        require(listingId < listings.length, "Invalid listing ID");

        Listing memory listing = listings[listingId];

        require(msg.value >= listing.price, "Sent value is less than the listing price");

        require(tokenContract.balanceOf(listing.seller, listing.tokenId) >= listing.amount, "Seller does not have enough tokens for sale");

        // Transfer the token from the seller to the buyer
        tokenContract.safeTransferFrom(listing.seller, msg.sender, listing.tokenId, listing.amount, "");

        // Transfer the payment to the seller
        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Failed to transfer Ether to the seller");

        // Remove the listing
        listings[listingId] = listings[listings.length - 1];
        listings.pop();
    }
}