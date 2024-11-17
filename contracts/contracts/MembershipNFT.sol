// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MembershipNFT is ERC721, ERC721Enumerable, ERC2981, Ownable {

    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private supply;

    string public tokenUri;
    string public contractUri;
    uint256 public maxSupply;
    uint256 public price;
    uint256 public totalEarnings;
    uint256 public totalWithdrawn;
    uint96 public royalty;
    address public creator;
    address public creatorWithdrawal;
    address public joinf;

    mapping (address => bool) private minted;
    
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _tokenURI,
        address _creator,
        address _joinf,
        uint256 _supply,
        uint256 _price
    ) ERC721 (_name, _symbol) {
        tokenUri = _tokenURI;
        creator = _creator;
        creatorWithdrawal = _creator;
        joinf = _joinf;
        maxSupply = _supply;
        price = _price;
        supply.increment();
        _safeMint(creator, supply.current());
    }

    modifier mintCompliance(address _minter) {
        require(!minted[_minter], "Already minted!");
        require(supply.current() + 1 <= maxSupply, "Max supply exceeded!");
        _;
    }

    function mint() public payable mintCompliance(msg.sender) {
        require(msg.value >= price, "Insufficient funds!");
        supply.increment();
        minted[msg.sender] = true;
        totalEarnings = totalEarnings + msg.value;
        _safeMint(msg.sender, supply.current());
    }

    function initializeCollectionRoyalty(
        string memory _contractURI, 
        address _receiver, 
        uint96 _royalty
    ) public onlyOwner {
        contractUri = _contractURI;
        royalty = _royalty;
        setRoyaltyInfo(_receiver, _royalty);
        transferOwnership(_receiver);
    }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips) public onlyOwner {
        _setDefaultRoyalty(_receiver, _royaltyFeesInBips);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenUri;
    }

    function contractURI() public view returns (string memory) {
        return contractUri;
    }

    function setTokenURI(string calldata _tokenUri) public onlyOwner {
        tokenUri = _tokenUri;
    }

    function setContractURI(string calldata _contractUri) public onlyOwner {
        contractUri = _contractUri;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getMintedAmount() public view returns (uint) {
        return supply.current();
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        (bool fs, ) = payable(address(joinf)).call{value: address(this).balance * 25 / 1000}("");
        require(fs, "Transfer to joinf failed");
        (bool cs, ) = payable(address(creatorWithdrawal)).call{value: address(this).balance}("");
        require(cs, "Withdrawal to address failed");
        totalWithdrawn = totalWithdrawn + balance;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}