import React from 'react'
import { ethers } from '../header/ethers-5.6.esm.min';
import { abi, contractAddress } from '../header/constant';
import Info from '../info/Info';
import SH from './SH';
import GAR from './GAR'; 
const StudentInfo = () => {

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
    <div>

        <Info></Info>
        <GAR></GAR>
    </div>
  )
}

export default StudentInfo