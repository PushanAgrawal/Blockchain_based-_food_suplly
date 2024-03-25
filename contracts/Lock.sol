// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// // Contract for managing student identities, academic records, and credentials on the Ethereum blockchain

// contract StudentLedger {

//     // Mappings and Structs for Key Data

//     mapping(address => Student)  students;
//     mapping(address => University)  universities;
//     mapping(address => AuthorizedPersonnel) public authorizedPersonnel;

//     struct Student {
//         address studentAddress;
//         string identifier; // Unique identifier (e.g., national ID)
//         string name;
//         string dob;
//         string contactDetails; // Securely stored off-chain with optional access control
//         // mapping(string => bool) privacyPreferences; // Control individual data field visibility
//         AcademicRecord[] academicRecords;
//         NonAcademicRecord[] nonAcademicRecords;
//         SkillSet[] skillSets;
//         Certificate[] certificates;
//         // mapping(address => AccessGrant[]) accessGrants; // Temporary access permission for entities
//     }

//     struct University {
//         address universityAddress;
//         string name;
//         string location;
//         string ipfs;
//         // address[] authorizedPersonnelAddresses; // Authorized personnel for record management and certificate issuance
//     }

//     struct AuthorizedPersonnel {
//         address personnelAddress;
//         University university;
//         string role; // e.g., Dean, Professor, Registrar
//     }

//     struct AcademicRecord {
//         string courseName;
//         uint credits;
//         string completionDate;
        
//     }

//     struct NonAcademicRecord {
//         string title;
//         string organization;
//         string date;
//         string description;
//     }

//     struct SkillSet {
//         string skillName;
//         string proficiencyLevel;
//         Endorsement[] endorsements;
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

//     struct AccessGrant {
//         address grantedTo;
//         string purpose;
//         uint expirationDate;
//     }

//     // Modifier to restrict access to authorized personnel

//     modifier onlyAuthorized(address personnelAddress) {
//         require(authorizedPersonnel[personnelAddress].university.universityAddress == msg.sender, "Unauthorized personnel");
//         _;
//     }

//     // Functions for Registration and Data Management

//     function registerStudent(
//         string memory identifier,
//         string memory name,
//         string memory dob,
//         string memory contactDetails
//     ) public {
//         require(students[msg.sender].studentAddress != msg.sender, "Already registered");
//         students[msg.sender] =  Student(
//             msg.sender,
//             identifier,
//             name,
//             dob,
//             contactDetails
//             // new mapping(string => bool)(true) // Default privacy preferences: all private
//         );
//     }

//     function registerUniversity(
//         string memory name,
//         string memory location,
//         string memory website
//     ) public {
//         require(!universities[msg.sender].universityAddress, "Already registered");
//         universities[msg.sender] = University(msg.sender, name, location, website);
//     }

//     function addAuthorizedPersonnel(address personnelAddress, string memory role) public onlyAuthorized(msg.sender) {
//         authorizedPersonnel[personnelAddress] = AuthorizedPersonnel(personnelAddress, universities[msg.sender], role);
//         universities[msg.sender].authorizedPersonnelAddresses.push(personnelAddress);
//     }

//     // Functions for Record Management and Credential Issuance

//     function addAcademicRecord(
//         address studentAddress,
//         string memory courseName,
//         uint credits,
//         string memory completionDate
      
//     ) public onlyAuthorized(msg.sender) {
//         students[studentAddress].academicRecords.push(AcademicRecord(courseName, credits, completionDate));
//     }

//     function addNonAcademicRecord(
//         address studentAddress,
//         string memory title,
//         string memory organization,
//         string memory date,
//         string memory description
//     ) public {
//         students[studentAddress].nonAcademicRecords.push(NonAcademicRecord(title, organization, date, description));
//     }

// }