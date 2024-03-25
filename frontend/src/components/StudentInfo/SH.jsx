
import "./SH.css"

import { useState } from "react";
import { abi, contractAddress } from "../header/constant.jsx";

import { incrementByAmount , incrementName, incrementId } 
from "../redux/counter.jsx";
import { ethers } from "../header/ethers-5.6.esm.min.jsx";

import { useSelector, useDispatch } from "react-redux";
// const [count, setCount] = useState("");


function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  return new Promise((resolve, reject) => {
      try {
          provider.once(transactionResponse.hash, (transactionReceipt) => {
              console.log(
                  `Completed with ${transactionReceipt.confirmations} confirmations. `
              )
              resolve()
          })
      } catch (error) {
          reject(error)
      }
  })
}

async function addUni(){
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    console.log("hi")
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.registerUniversity("abcd","abcde","abcdef","abcdefg")
      await listenForTransactionMine(transactionResponse, provider)
      await transactionResponse.wait(1)
    } catch (error) {
      console.log(error)
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask"
  }

}


const SH = () => {
  const {value , name, id, location } = useSelector((state)=>state.counter)
  // const {name } = useSelector((state)=>state.counter)
  const dispatch =useDispatch()
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("hi")
        await ethereum.request({ method: "eth_requestAccounts" })
        console.log("hi")
      } catch (error) {
        console.log(error)
      }
      
      dispatch(incrementByAmount("CONNECTED"))
      getinfo()
      const accounts = await ethereum.request({ method: "eth_accounts" })
     
    } else {
      // connectButton.innerHTML = "Please install MetaMask"
    }
  }
  async function getinfo(){
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log("hi")
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        console.log("hi")
        var add= await signer.getAddress()
        add=String(add)
        console.log(add)
        var transactionResponse = await contract.getStudentname("0x73E29cD70CBA744Cd1277EC2B2383B6eB147619c")
        console.log(transactionResponse.toString())
        dispatch(incrementName(name+transactionResponse.toString()))
        transactionResponse = await contract.getStudentidentifier("0x73E29cD70CBA744Cd1277EC2B2383B6eB147619c")
        dispatch(incrementId(id+transactionResponse.toString()))
        // transactionResponse = await contract.getUniLocation(signer.getAddress())
        // dispatch(incrementName(location+transactionResponse.toString()))
   
      } catch (error) {
        console.log(error)
      }
    }
    } 
  
  
  
  return (
    <section className="h-wrapper ">
      <div className="flexCenter paddings innerWidth h-container">
        <img src="./ledger.jpg" alt="png" width={100} />
        <div className="h-menu flexCenter">
          {/* <a href="">Resedencies</a>
          <a href="">Our Value</a>
          <a href="">Contact Us</a>
          <a href="">Get Started</a> */}
  

          <button className="button" onClick={()=>connect()}>
        {value}
          </button>
      
          {/* <button className="button" onClick={()=>addUni()}>
          Add Uni
          </button>
          <button className="button" onClick={()=>getinfo()}>
          get info
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default SH;
