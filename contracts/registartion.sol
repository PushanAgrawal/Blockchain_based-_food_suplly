// // SPDX-License-Identifier: MIT
// pragma solidity >=0.6.0 <0.9.0;

// contract registration{

//     address public owner;
//     mapping(address=>string) Universities; 
//     mapping(address=>string) Students ;

//     event updatedUniversity(address a, string  ipfshash);
//     event updatedStudent(address a, string  ipfshash);
    
//      constructor() {
//         // balances[msg.sender] = totalSupply;
//         owner = msg.sender;
//     }
//     modifier onlyOwner {
//        require(msg.sender == owner);
//        _;
//     }
//     modifier onlyUniversity {
//        require(bytes(SeedProducer[msg.sender]).length!=0);
//        _;
//     }

//     function addUniversity(address a, string memory ipfshash) onlyOwner public {
//         require(bytes(Universities[a]).length==0,
//         "seedproducer exists already"
//         );
//         Universities[a] = ipfshash;
//         emit updatedUniversity(a, ipfshash); (a ,ipfshash);
//     }
//     function addStudent(address a, string memory ipfshash) onlyUniversity public {
//         require(bytes(Students[a]).length=!0,
//         "seedproducer exists already"
//         );
//         Students[a] = ipfshash;
//         emit updatedStudent(a, ipfshash); (a ,ipfshash);
//     }

//     function Student(address a) public view  returns  (string memory){

//         return Students[a];

//     }
//     function Universiy(a)(address a) public view  returns  (string memory){

//         return Universities[a];

//     }

     
// }