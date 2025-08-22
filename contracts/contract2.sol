// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// /// @title TranscriptNFT
// /// @notice ERC721 token representing semester transcript certificates
// contract TranscriptNFT is ERC721, Ownable {
//     uint256 private _tokenCounter;
//     mapping(uint256 => string) private _tokenURIs;

//     event TranscriptMinted(uint256 indexed tokenId, address indexed to, string uri);

//     constructor() ERC721("SemesterTranscript", "TRNSC") {
//         _tokenCounter = 1; // start IDs at 1
//     }

//     /// @notice Mint a new transcript NFT
//     function mintTranscript(address to, string calldata tokenUri)
//         external
//         onlyOwner
//         returns (uint256)
//     {
//         uint256 tokenId = _tokenCounter;
//         _tokenCounter++;
//         _safeMint(to, tokenId);
//         _tokenURIs[tokenId] = tokenUri;
//         emit TranscriptMinted(tokenId, to, tokenUri);
//         return tokenId;
//     }

//     /// @notice Returns token URI for a given transcript NFT
//     function tokenURI(uint256 tokenId)
//         public
//         view
//         override
//         returns (string memory)
//     {
//         require(_exists(tokenId), "ERC721: URI query for nonexistent token");
//         return _tokenURIs[tokenId];
//     }
// }

// /// @title StudentLedger
// /// @notice Manages universities, students, exams, and issues semester transcripts as NFTs, with controlled access for hiring companies
// contract StudentLedger is Ownable {
//     TranscriptNFT public transcriptNFT;

//     struct Student {
//         string identifier;
//         string name;
//         address university;
//         string detailsIpfs;
//         uint256[] transcriptTokens;
//     }

//     struct University {
//         string identifier;
//         string name;
//         string location;
//         string detailsIpfs;
//         address[] students;
//     }

//     struct Exam {
//         string dateOfExam;
//         string identifier;
//         address[] participants;
//         address university;
//         uint256 maxMarks;
//     }

//     struct Permission {
//         uint256 expiresAt;  // timestamp when access expires
//         bool granted;
//     }

//     mapping(address => Student) public students;
//     mapping(address => University) public universities;
//     mapping(string => Exam)    public exams;
//     // student => hiringCompany => Permission
//     mapping(address => mapping(address => Permission)) public accessPermissions;

//     address[] public universityList;

//     event UniversityRegistered(address indexed uni);
//     event StudentRegistered(address indexed student, address indexed uni);
//     event ExamCreated(string indexed examId, address indexed uni);
//     event TranscriptIssued(address indexed student, uint256 tokenId);
//     event PermissionGranted(address indexed student, address indexed company, uint256 expiresAt);
//     event PermissionRevoked(address indexed student, address indexed company);

//     modifier onlyUniversity() {
//         require(bytes(universities[msg.sender].identifier).length != 0, "Not a registered university");
//         _;
//     }

//     modifier onlyStudent(address student) {
//         require(msg.sender == student, "Only the student can call this");
//         _;
//     }

//     modifier hasAccess(address student) {
//         Permission memory p = accessPermissions[student][msg.sender];
//         require(p.granted && block.timestamp <= p.expiresAt, "Access not granted or expired");
//         _;
//     }

//     constructor(address nftAddress) {
//         require(nftAddress != address(0), "Invalid NFT address");
//         transcriptNFT = TranscriptNFT(nftAddress);
//     }

//     /// @notice Register a new university (only owner)
//     function registerUniversity(
//         address uniAddress,
//         string calldata name,
//         string calldata location,
//         string calldata identifier,
//         string calldata detailsIpfs
//     ) external onlyOwner {
//         require(uniAddress != address(0), "Zero address");
//         require(bytes(universities[uniAddress].identifier).length == 0, "Already registered");
//         universities[uniAddress] = University({
//             identifier: identifier,
//             name: name,
//             location: location,
//             detailsIpfs: detailsIpfs,
//             students: new address[](0)
//         });
//         universityList.push(uniAddress);
//         emit UniversityRegistered(uniAddress);
//     }

//     /// @notice Register a student under caller university
//     function registerStudent(
//         address studentAddress,
//         string calldata identifier,
//         string calldata name,
//         string calldata detailsIpfs
//     ) external onlyUniversity {
//         require(studentAddress != address(0), "Zero address");
//         require(bytes(students[studentAddress].identifier).length == 0, "Student already registered");
//         Student storage s = students[studentAddress];
//         s.identifier = identifier;
//         s.name = name;
//         s.university = msg.sender;
//         s.detailsIpfs = detailsIpfs;
//         universities[msg.sender].students.push(studentAddress);
//         emit StudentRegistered(studentAddress, msg.sender);
//     }

//     /// @notice University creates an exam and enrolls participants
//     function addExam(
//         string calldata dateOfExam,
//         string calldata examId,
//         address[] calldata participants,
//         uint256 maxMarks
//     ) external onlyUniversity {
//         require(bytes(exams[examId].identifier).length == 0, "Exam ID exists");
//         exams[examId] = Exam({
//             dateOfExam: dateOfExam,
//             identifier: examId,
//             participants: participants,
//             university: msg.sender,
//             maxMarks: maxMarks
//         });
//         emit ExamCreated(examId, msg.sender);
//     }

//     /// @notice Issue a semester transcript: mints NFT and records token
//     function issueSemesterTranscript(
//         address studentAddress,
//         string calldata semester,
//         string calldata issuedDate,
//         string calldata metadataIpfs,
//         bytes32 /* transcriptHash */
//     ) external onlyUniversity {
//         require(students[studentAddress].university == msg.sender, "Not student's university");
//         uint256 tokenId = transcriptNFT.mintTranscript(studentAddress, metadataIpfs);
//         students[studentAddress].transcriptTokens.push(tokenId);
//         emit TranscriptIssued(studentAddress, tokenId);
//     }

//     /// @notice Student grants access to a hiring company for a duration (seconds)
//     function grantAccess(address company, uint256 durationSeconds)
//         external
//         onlyStudent(msg.sender)
//     {
//         require(company != address(0), "Zero address");
//         uint256 expiry = block.timestamp + durationSeconds;
//         accessPermissions[msg.sender][company] = Permission({ expiresAt: expiry, granted: true });
//         emit PermissionGranted(msg.sender, company, expiry);
//     }

//     /// @notice Student revokes access from a hiring company
//     function revokeAccess(address company) external onlyStudent(msg.sender) {
//         require(accessPermissions[msg.sender][company].granted, "No active permission");
//         delete accessPermissions[msg.sender][company];
//         emit PermissionRevoked(msg.sender, company);
//     }

//     /// @notice Get list of universities
//     function getUniversities() external view returns (address[] memory) {
//         return universityList;
//     }

//     /// @notice Get students under caller university
//     function getUniversityStudents() external view onlyUniversity returns (address[] memory) {
//         return universities[msg.sender].students;
//     }

//     /// @notice Get transcript token IDs for a student (only student or granted company)
//     function getStudentTranscripts(address studentAddress)
//         external
//         view
//         returns (uint256[] memory)
//     {
//         if (msg.sender != studentAddress) {
//             // require permission for third parties
//             require(
//                 accessPermissions[studentAddress][msg.sender].granted &&
//                 block.timestamp <= accessPermissions[studentAddress][msg.sender].expiresAt,
//                 "Access not granted or expired"
//             );
//         }
//         return students[studentAddress].transcriptTokens;
//     }

//     /// @notice Get exam details
//     function getExam(string calldata examId) external view returns (Exam memory) {
//         return exams[examId];
//     }
// }
