// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract StudentLedger is ERC721 {

//     // ... (previous contract code)

//     // Using Counters library for unique token IDs
//     using Counters for Counters.Counter;
//     Counters.Counter tokenIdCounter;

//     // Function to issue a certificate as an ERC721 token
//     function issueCertificate(
//         address studentAddress,
//         string memory certificateType,
//         string memory issuingUniversity,
//         string memory issuedDate,
//         string memory metadata
//     ) public onlyAuthorized(msg.sender) {
//         uint256 tokenId = tokenIdCounter.current();
//         tokenIdCounter.increment();

//         bytes32 hash = keccak256(abi.encodePacked(msg.sender, studentAddress, certificateType, issuedDate));

//         _safeMint(studentAddress, tokenId);
//         _setTokenURI(tokenId, tokenURI(tokenId)); // Set a URI for displaying certificate details

//         students[studentAddress].certificates.push(Certificate(tokenId, certificateType, issuingUniversity, issuedDate, metadata, hash));
//     }

//     // Function to generate a token URI for certificate details
//     function tokenURI(uint256 tokenId) public view returns (string memory) {
//         Certificate memory certificate = students[_ownerOf(tokenId)].certificates[tokenId];
//         // Construct a URI containing certificate details (e.g., JSON format)
//         return string(abi.encodePacked("https://example.com/certificates/", tokenId, ".json"));
//     }

//     // ... (other contract functions)
// }
