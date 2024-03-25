import React from 'react'
import { useState } from 'react';
import "./Uni.css"
import Card from '@mui/material/Card';
import { Box, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ethers } from '../header/ethers-5.6.esm.min';
import { abi, contractAddress } from '../header/constant';
import { incrementByAmount } from "../redux/counter.jsx";
import { useSelector, useDispatch } from "react-redux";
import Info from '../info/Info.jsx';
import AS from '../addStudent/AS.jsx';
import SS from '../showstudnets/SS.jsx';
import Header from '../header/header.jsx';


// import count from 
// import Grid from '@mui/material';


const Uni = () => {
  const {value , name, id, location } = useSelector((state)=>state.counter)
  // var [value , setvalue] = useState("hcgc")
  async function getUni(){
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log("hi")
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      
      try {
        console.log("hi")
        const transactionResponse = await contract.getUni("0x73E29cD70CBA744Cd1277EC2B2383B6eB147619c")
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

<div className=''>

<Info></Info>
<AS></AS>
<SS></SS>
</div>






 
  )
}

export default Uni