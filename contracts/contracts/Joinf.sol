// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./MembershipNFT.sol";

error NotHavingCreatorRole(address user);
error CreatorExists(address user);
error PostNotFound(address creator, uint256 postId);

/*
* @title Joinf
* @notice Built for ETHBangkok’24 
*/
contract Joinf is Ownable {

    using Counters for Counters.Counter;

    event ProfileUpdated (
        address user,
        string newProfile
    );

    event MembershipLaunched (
        address user,
        address nftCollection,
        string contentUri,
        uint256 supply,
        uint256 price
    );

    event PostAdded (
        address creator,
        uint256 postId,
        string contentCid,
        string key
    );

    event PostEdited (
        address creator,
        uint256 postId,
        string contentCid,
        string key
    );

    event PostDeleted (
        address creator,
        uint256 postId
    );

    event CreatorFundsReleased (
        address withdrawalAddress,
        uint256 amount
    );

    struct Profile {
        string personalDetailCid;
        bool isContentCreator;
    }

    struct CreatorProfile {
        address membershipNft;
        Counters.Counter postCount;
    }

    struct Post {
        uint256 id;
        string contentCid;
        uint256 uploadTime;
        string key;
    }

    mapping (address => Profile) private profileRegistry;
    mapping (address => CreatorProfile) private creatorRegistry;
    mapping (address => mapping(uint256 => Post)) private postRegistry;

    modifier isContentCreator(address _user) {
        CreatorProfile memory profile = creatorRegistry[_user];
        if (profile.membershipNft == address(0)) {
            revert NotHavingCreatorRole(_user);
        }
        _;
    }

    modifier notCreator(address _user) {
        CreatorProfile memory profile = creatorRegistry[_user];
        if (profile.membershipNft != address(0)) {
            revert CreatorExists(_user);
        }
        _;
    }

    modifier postExists(address _creator, uint256 _postId) {
        Post memory post = postRegistry[_creator][_postId];
        if (post.id <= 0) {
            revert PostNotFound(_creator, _postId);
        }
        _;
    }

    /*
     * @notice Method to update profile details
     * @param contentCid CID to where new profile data is stored
     */
    function updateUserProfile(string calldata _contentCid) external {
        address _user = msg.sender;
        profileRegistry[_user].personalDetailCid = _contentCid;
        emit ProfileUpdated(_user, _contentCid);
    }

    /*
     * @notice Method to launch membership NFT and become a creator
     * @param name 
     * @param symbol 
     * @param nftUri 
     * @param collectionUri Link to collection details (for Opensea)
     * @param supply Max supply of membership NFT
     * @param price Sale price of each item
     * @param royalty Royalty to creator in bps (basis points)
     */
    function launchCreatorNFT(
        string calldata _name,
        string calldata _symbol,
        string calldata _nftUri,
        string calldata _collectionUri,
        uint256 _supply,
        uint256 _price,
        uint96 _royalty
    )
        external
        notCreator(msg.sender)
    {
        address _user = msg.sender;
        MembershipNFT newCollection = new MembershipNFT(
            _name,
            _symbol,
            _nftUri,
            _user,
            address(this),
            _supply,
            _price
        );
        newCollection.initializeCollectionRoyalty(_collectionUri, _user, _royalty);
        profileRegistry[_user].isContentCreator = true;
        creatorRegistry[_user].membershipNft = address(newCollection);
        emit MembershipLaunched(_user, address(newCollection), _nftUri, _supply, _price);
    }

    /*
     * @notice Method to add a post
     * @param contentCid CID to where post data is stored
     */
    function addContentPost(string calldata _contentCid, string calldata _key) 
        external 
        isContentCreator(msg.sender) 
    {
        address _creator = msg.sender;
        creatorRegistry[_creator].postCount.increment();
        uint256 _postId = creatorRegistry[_creator].postCount.current();
        postRegistry[_creator][_postId] = Post({
            id: _postId,
            contentCid: _contentCid,
            uploadTime: block.timestamp,
            key: _key
        });
        emit PostAdded(_creator, _postId, _contentCid, _key);
    }

    function getUserProfile(address _user) 
        external 
        view 
        returns (Profile memory) {
        return profileRegistry[_user];
    }

    function getCreatorProfile(address _creator) 
        external 
        view 
        isContentCreator(_creator)
        returns (CreatorProfile memory) 
    {
        return creatorRegistry[_creator];
    }

    function getCreatorContent(address _creator, uint256 _postId) 
        external 
        view
        postExists(_creator, _postId) 
        returns (Post memory) 
    {
        return postRegistry[_creator][_postId];
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    receive() external payable {}
    fallback() external payable {}
}