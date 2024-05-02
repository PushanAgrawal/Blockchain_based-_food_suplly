
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;



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
// Contract for managing student identities, academic records, and credentials on the Ethereum blockchain
contract StudentLedger {
    
    // Mappings and Structs for Key Data
 
    address owner; 
    mapping(address => Student) public   students;
    mapping(address => University)  universities;
    mapping(string => Exam) public  Exams;
    address[] uniAdds;



    constructor(){
        owner =msg.sender;
    }

   
    struct   Student {
        string identifier; // Unique identifier (e.g., national ID)
        string name;
        address univeristyAdress;
        string detailsIpfs; // Securely stored off-chain with optional access control
        
        AcademicRecord[] academicRecords;
        // NonAcademicRecord[] nonAcademicRecords;
        // SkillSet[] skillSets;
        // Certificate[] certificates;
           }

    struct University {
        string identifier;
        string name;
        string location;
        string detailsIpfs;
        address[] STU;
        // address[] authorizedPersonnelAddresses; // Authorized personnel for record management and certificate issuance
    }


    struct AcademicRecord {
        string courseName;
        string credits;
        string completionDate;
        // Exam exam ;
        string marks;
        
    }

 



    struct Endorsement {
        address endorserAddress;
        string role; // e.g., Professor, Industry Expert
        string comment;
    }

    struct Certificate {
        string certificateType; // e.g., degree, diploma, transcript
        string issuingUniversity;
        string issuedDate;
        string metadata; // Additional details about the credential
        bytes32 hash; // Cryptographic signature for verification
    }

    struct Exam {
        string doe;
        string identifier;
        address[] parStud;
        address uniAdd;
        uint maxMarks;

    }

   

    // Modifier to restrict access to authorized personnel
   modifier onlyUniversity (address univeristyAdress) {
      require(msg.sender == univeristyAdress );
      require(bytes(universities[msg.sender].identifier).length!=0);
      _;
   }
  
   modifier onlyowner () {
      require(msg.sender == owner );

      _;
   }
   modifier  onlyaddUni(address stu){
    require(bytes(universities[msg.sender].identifier).length!=0, "wrong uni");
    require(students[stu].univeristyAdress==msg.sender, "wrong uni stud");
    _;
   }
   modifier  onlyExam(string memory examId){
    require(Exams[examId].uniAdd==msg.sender, "wrong exam id");
    // require(bytes(universities[msg.sender].identifier).length!=0);
    // require(students[stu].univeristyAdress==msg.sender);
    _;
   }
   
  
    // function getAllStudent() public view returns(string[] memory){
    //     string[] memory a ;
    //     for()

    // }
    // Functions for Registration and Data Management

 function getowner() public  view returns(address){
    return owner;
 }
 function getUniStud() public  view returns(address[] memory){
    return universities[msg.sender].STU;
 }

 function getUniStudowner(address add) public onlyowner()  view returns(address[] memory){
    return universities[add].STU;
 }
 function getUniversities() public  view returns(address[] memory){
    return uniAdds;
 }



   function getStudentidentifier(address a) public view returns(string memory){
    return students[a].identifier;
   }
   function getStudentname(address a) public view returns(string memory){
    return students[a].name;
   }
   function getStudentipfs(address a) public view returns(string memory){
    return students[a].detailsIpfs;
   }
   function getStudentuniAdress(address a) public view returns(address ){
    return students[a].univeristyAdress;
   }
   function getUniName(address a) public view returns(string memory){
    return universities[a].name;
   }
   function getUniIdentifier(address a) public view returns(string memory){
    return universities[a].identifier;
   }
   function getUniLocation(address a) public view returns(string memory){
    return universities[a].location;
   }
   function getExamdoe(string memory a) public view returns(string memory){
    return Exams[a].doe;
   }
   function getExamId(string memory a) public view returns(string memory){
    return Exams[a].identifier;
   }
   function getExamUniadd(string memory a) public view returns(address ){
    return Exams[a].uniAdd;
   }
   function getUniIpfs(address a) public view returns(string memory){
    return universities[a].detailsIpfs;
   }
 
   
    function registerStudent(
        string memory identifier,
        string memory name,
        address studentAdd,
        address univeristyAdress,
        string memory contactDetails
    ) onlyUniversity(univeristyAdress) public {
        require(bytes(students[studentAdd].identifier).length==0, "Already registered");
         universities[msg.sender].STU.push(studentAdd);
         Student storage s = students[studentAdd];
         s.identifier=identifier;
         s.name=name;
         s.detailsIpfs=contactDetails;
    }

    function registerUniversity(
        string memory name,
        string memory location,
        string memory detailIpfs,
        string memory identifier,
        address  UniAdd
      
    ) public   {
        // require(bytes(universities[UniAdd].identifier).length==0, "Already registered");
        University storage U =universities[UniAdd];
        U.identifier=identifier;
        U.name = name;
        U.location=location;
        U.detailsIpfs=detailIpfs;
        uniAdds.push(UniAdd);
        
        // universities[msg.sender] = University(identifier,name, location, detailIpfs,stu);
    }

    function addExam( string memory doe,
        string memory identifier,
        address uniAdd,
        address[] memory parStud)public onlyUniversity(uniAdd) {
            Exam memory a = Exam(doe , identifier, parStud,uniAdd, 100);
            Exams[identifier]= a;
    }
  
    // Functions for Record Management and Credential Issuance

    function addAcademicRecord(
        address studentAddress,
        string memory courseName,
        string memory credits,
        string memory completionDate,
        string memory examId,
        string memory marks
        
      
    ) public  {
        // Exam memory e =Exams[examId];
        
        
        students[studentAddress].academicRecords.push(AcademicRecord(courseName, credits, completionDate,marks));
    }
    function getCourse()  public view returns( string memory){
      return students[msg.sender].academicRecords[0].courseName ;

    }
    function getMarks()  public view returns( string memory){
      return students[msg.sender].academicRecords[0].marks ;

    }
    // function getAcademicRecords()  public view returns( string memory){
    //   return students[msg.sender].academicRecords[0].courseName ;

    // }

    // function addNonAcademicRecord(
    //     address studentAddress,
    //     string memory title,
    //     string memory organization,
    //     string memory date,
    //     string memory description
    // ) public {
    //     students[studentAddress].nonAcademicRecords.push(NonAcademicRecord(title, organization, date, description));
    // }

}