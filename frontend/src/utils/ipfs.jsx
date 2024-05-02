import axios from 'axios';
import proxify from 'proxify-url'
import { HttpsAgent } from 'agentkeepalive';


export async function extractFromIPFS(hash) {
  const agent = new HttpsAgent({
    rejectUnauthorized: false,
    requestCert: false,
  })
  const ipfsGateway =  'https://IPFS.IO/ipfs/';
 var response=""
  try {
     response = await axios.get(ipfsGateway + hash, {
      httpsAgent: agent,
    });
    console.log('Content extracted from IPFS:', response.data);
  } catch (error) {
    console.error('Error extracting content from IPFS:', error.message);
  }
  return response.data;
}

// Example usage with an IPFS hash


export async function ipfsUp(hashdeatils){
   
  var data = JSON.stringify({
    "pinataOptions": {
      "cidVersion": 1
    },
    "pinataMetadata": {
      "name": "testing",
      "keyvalues": {
        "customKey": "customValue",
        "customKey2": "customValue2"
      }
    },
    "pinataContent": hashdeatils
  });
  
  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: { 
      'Content-Type': 'application/json', 
      'pinata_api_key': "8a680c6b123600da9ddf",
      'pinata_secret_api_key': "a2a177c2fa74e32a08e0f67799c1beacb32389c2905c685b493a70912850819c",
      // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4YzMwOGM1Ni1hNDI5LTRmMmItODM3YS1kYTlmNjlhZDdhZWUiLCJlbWFpbCI6ImJpbGxpb25lYXIucHVzaGFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YTY4MGM2YjEyMzYwMGRhOWRkZiIsInNjb3BlZEtleVNlY3JldCI6ImEyYTE3N2MyZmE3NGUzMmEwOGUwZjY3Nzk5YzFiZWFjYjMyMzg5YzI5MDVjNjg1YjQ5M2E3MDkxMjg1MDgxOWMiLCJpYXQiOjE2OTczNjU1MTd9.VB1veVPx8H6glGywJ1dMQKuZC34zeIQvhnFehbieW7k'
    },
    data : data
  };
  
    const res= await axios(config);
    return res.data.IpfsHash;
  }
  
 
  


  
  
  // console.log(res.data);
  