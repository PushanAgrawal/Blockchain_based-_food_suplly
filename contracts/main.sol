// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.20;



// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract MyToken is ERC721, Ownable {
//     constructor(address initialOwner, string memory name, string memory shortForm)
//         ERC721(name, shortForm)
//         Ownable(initialOwner)
//     {}

//     function safeMint(address to, uint256 tokenId) public onlyOwner {
//         _safeMint(to, tokenId);
//     }
// }
// // Contract for managing student identities, academic records, and credentials on the Ethereum blockchain
// contract StudentLedger {
    
//     // Mappings and Structs for Key Data
 
//     address owner; 
//     mapping(address => Student) public   students;
//     mapping(address => University)  universities;
   
//     struct   Student {
//         string identifier; // Unique identifier (e.g., national ID)
//         string name;
//         address univeristyAdress;
//         string detailsIpfs; // Securely stored off-chain with optional access control
        
//         AcademicRecord[] academicRecords;
//         // NonAcademicRecord[] nonAcademicRecords;
//         // SkillSet[] skillSets;
//         // Certificate[] certificates;
//            }

//     struct University {
//         string identifier;
//         string name;
//         string location;
//         string detailsIpfs;
//         // address[] authorizedPersonnelAddresses; // Authorized personnel for record management and certificate issuance
//     }


//     struct AcademicRecord {
//         string courseName;
//         uint credits;
//         string completionDate;
//         MyToken certi;
        
//     }

 



//     struct Endorsement {
//         address endorserAddress;
//         string role; // e.g., Professor, Industry Expert
//         string comment;
//     }

//     struct Certificate {
//         string certificateType; // e.g., degree, diploma, transcript
//         string issuingUniversity;
//         string issuedDate;
//         string metadata; // Additional details about the credential
//         bytes32 hash; // Cryptographic signature for verification
//     }

//    constructor() {
//         // balances[msg.sender] = totalSupply;
//         owner = msg.sender;
//     }

//     // Modifier to restrict access to authorized personnel
//    modifier onlyUniversity (address univeristyAdress) {
//       require(msg.sender == univeristyAdress );
//       require(bytes(universities[msg.sender].identifier).length!=0);
//       _;
//    }
  

//     // Functions for Registration and Data Management

//    function getStudent(address a) public view returns(string memory){
//     return students[a].name;
//    }
//    function getUni(address a) public view returns(string memory){
//     return universities[a].name;
//    }
//    function getData() public view  returns(string memory){
//     return "abcd";
//    }
   
//     function registerStudent(
//         string memory identifier,
//         string memory name,
//         address studentAdd,
//         address univeristyAdress,
//         string memory contactDetails
//     ) onlyUniversity(univeristyAdress) public {
//         require(bytes(students[studentAdd].identifier).length==0, "Already registered");
       
//          Student storage s = students[msg.sender];
//          s.identifier=identifier;
//          s.name=name;
//          s.detailsIpfs=contactDetails;
//     }

//     function registerUniversity(
//         string memory name,
//         string memory location,
//         string memory detailIpfs,
//         string memory identifier
//     ) public {
//         require(bytes(students[msg.sender].identifier).length==0, "Already registered");
//         universities[msg.sender] = University(identifier,name, location, detailIpfs);
//     }

  
//     // Functions for Record Management and Credential Issuance

//     function addAcademicRecord(
//         address studentAddress,
//         string memory courseName,
//         uint credits,
//         string memory completionDate
      
//     ) public  {
//         MyToken childContract;
//         childContract = new MyToken(studentAddress,"adsakd", "asdhas");
//         students[studentAddress].academicRecords.push(AcademicRecord(courseName, credits, completionDate,childContract));
//     }
//     function getAcademicRecors()  public view returns(MyToken ){
//       return students[msg.sender].academicRecords[0].certi ;

//     }

//     // function addNonAcademicRecord(
//     //     address studentAddress,
//     //     string memory title,
//     //     string memory organization,
//     //     string memory date,
//     //     string memory description
//     // ) public {
//     //     students[studentAddress].nonAcademicRecords.push(NonAcademicRecord(title, organization, date, description));
//     // }

// }