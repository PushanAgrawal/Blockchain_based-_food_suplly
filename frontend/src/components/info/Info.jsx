import React from 'react'
import { useState } from 'react';
import "./Info.css"
import Card from '@mui/material/Card';
import { Box, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ethers } from '../header/ethers-5.6.esm.min';
import { abi, contractAddress } from '../header/constant';
import { incrementByAmount } from "../redux/counter.jsx";
import { useSelector, useDispatch } from "react-redux";
// import count from 
// import Grid from '@mui/material';


const Info = () => {
  const {value , name, id, location } = useSelector((state)=>state.counter)
  // var [value , setvalue] = useState("hcgc")
  async function getinfo(){
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log("hi")
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        console.log("hi")
        const transactionResponse = await contract.getUni(signer.getAddress())
        // await listenForTransactionMine(transactionResponse, provider)
        // setCount(transactionResponse.toString())
        console.log(transactionResponse.toString())
        setvalue(transactionResponse.toString())
        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error)
      }}
    }
  return (
<Box
     
     display="flex"
     alignItems="center"
     justifyContent="center"
     
 >
<Box
  
  width={1500}
  >
    
        <Card > <CardContent>
         <div className='name-box' >
            
        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
        {name}
        </Typography>
    
        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
          {id}
       
        </Typography>
        
        {/* <Typography sx={{ mb: 1.5,fontSize: 30 }} color="text.secondary">
          
        </Typography> */}
         </div>
         <div className='name-box' >
        {/* <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
         {location}
        </Typography> */}
        </div>
      </CardContent></Card>
</Box>
   </Box>
 
  )
}

export default Info