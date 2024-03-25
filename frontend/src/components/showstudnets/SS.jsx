import { Box, Typography  } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import React from 'react'
import { ethers } from '../header/ethers-5.6.esm.min';
import { abi, contractAddress } from '../header/constant';
import { extractFromIPFS } from '../../utils/ipfs';

const SS = () => {
  const [   dataArray
  , setData] = useState([]);
 
    async function getStudents(){
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          console.log("hi")
          await provider.send('eth_requestAccounts', [])
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi, signer)
          
          try {
            console.log("hi")
            const transactionResponse = await contract.getUniStud(signer.getAddress())
           
            console.log(transactionResponse.toString())
             var data = transactionResponse.map(value => value.toString()); // Convert BigNumbers to numbers if necessary
             var data=[0]
            
          
            var temp=[];
            for(var i=0;i<data.length;i++){
              console.log(data[i])
              data[i]="0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"
              var a={name:'',id:'',address:data[i],email:'',doa:''}
              var tranc = await contract.getStudentidentifier(data[i])
              console.log(tranc.toString())
              a.id = tranc.toString()
              tranc=await contract.getStudentname(data[i])
              a.name = tranc.toString()
              console.log(tranc.toString())

              tranc=await contract.getStudentipfs(data[i])
              console.log(tranc.toString())
              var res=await extractFromIPFS(tranc.toString())
              console.log(res.data)
              a.doa=res["doa"]
              a.email=res.email
              temp.push(a)

            }
            setData(temp)
            // setvalue(transactionResponse.toString())
            // await transactionResponse.wait(1)
          } catch (error) {
            console.log(error)
          }}
      
      }
  return (
    
    <Box
 
    margin={6}
    display="flex"
    justifyContent="center"
    alignItems="center"
    

    >
      
      
  <Box
   width={1500}
  >
       <Typography variant="h5" style={{ fontSize: '24px', marginBottom: '20px', textAlign:'center' }}>
       <button className='button'  onClick={()=>getStudents()}>STUDENTS</button></Typography>
       
 <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DOA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataArray.map((row) => (
            <TableRow key={row}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.doa}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
   
    </Box>
   
  );
};

export default SS