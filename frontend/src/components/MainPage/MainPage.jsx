import { Box, Card, CardContent, Button } from "@mui/material";
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
import { ethers } from "../header/ethers-5.6.esm.min.jsx";
import { useState } from "react";
import { abi, contractAddress } from "../header/constant.jsx";

// import {dispatch} from
// import Card from '@mui/material'

const MainPage = () => {
  const navigate = useNavigate();
  async function loginMin() {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("hi");
        await ethereum.request({ method: "eth_requestAccounts" });
        console.log("hi");
      } catch (error) {
        console.log(error);
      }

      // dispatch(incrementByAmount("CONNECTED"))
      getAdmin();
      const accounts = await ethereum.request({ method: "eth_accounts" });
    } else {
      // connectButton.innerHTML = "Please install MetaMask"
    }
  }
  async function getAdmin() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("hi");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        console.log("hi");
        var add = await signer.getAddress();
        add = String(add);
        console.log(add);
        var transactionResponse = await contract.getowner();
        if (transactionResponse.toString() == add) {
          navigate("/admin");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        console.log("hi");
        var add = await signer.getAddress();
        add = String(add);
        console.log(add);
        var transactionResponse = await contract.getowner();
        if (transactionResponse.toString() == add) {
          navigate("/admin");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    // <Box
    // display="flex"
    // justifyContent="center"
    // alignItems="center"
    // margin={10}

    // >
    //     <Box
    //     width={1000}
    //     height={500}
    //     >

    //     <Card variant='outlined'>
    //        <CardContent >
    //         <div className='newClass'>

    //        <Button type="submit" variant="contained" color="primary" >
    //         <a href='/admin'>MINISTRY</a>

    //   </Button>
    //        <Button type="submit" variant="contained" color="primary">

    //         <a href='/uni'>UNIVERSITY</a>
    //   </Button>
    //        <Button type="submit" variant="contained" color="primary">
    //         <a href='/student'>STUDENT</a>

    //   </Button>
    //         </div>
    //        </CardContent>
    //     </Card>

    //     </Box>
    // </Box>

    <div className="flex items-center justify-center   ">
      <div className="flex  flex-col items-center justify-center gap-1  bg-black mx-[10rem] my-[5rem]  w-1/2 rounded-2xl shadow-2xl ">
        <div className="flex ml-[10rem] mr-[10rem] mt-3 pt-1   justify-center rounded-lg text-slate-300 text-2xl">
          <span className="font-Rampart brightness-125">Connect WALLET</span>
        </div>
        <div className="flex flex-col gap-5 ml-3 mr-3 p-10 w-full text-center ">
          <div className="flex -flex-row justify-around ">
            <div
              className="flex   mt-3 mb-1 hover:animate-bounce bg-emerald-900	brightness-150 text-2xl hover:bg-sky-800    justify-center p-2 pl-5 pr-5 rounded-lg text-slate-300 cursor-pointer"
              onClick={() => loginMin()}
            >
              <span className="font-Rampart">Ministry</span>
            </div>

            <Link to={"./student"}>
              <div className="flex   mt-3 mb-1 hover:animate-bounce  bg-emerald-900	brightness-150 text-2xl hover:bg-sky-800    justify-center p-2 pl-5 pr-5 rounded-lg text-slate-300 cursor-pointer ">
                <span className="font-Rampart">Student</span>
              </div>
            </Link>
          </div>
          <div className="flex -flex-row justify-around ">
            <div className="flex   mt-3 mb-1 hover:animate-bounce bg-emerald-900	brightness-150 text-2xl hover:bg-sky-800    justify-center p-2 pl-5 pr-5 rounded-lg text-slate-300">
              <Link to={"/uni"}>
                <span className="font-Rampart">Instutuion</span>
              </Link>
            </div>
            <div className="flex   mt-3 mb-1 hover:animate-bounce bg-emerald-900	brightness-150  text-2xl hover:bg-sky-800  justify-center p-2 pl-5 pr-5 rounded-lg text-slate-300">
              <span className="font-Rampart">Companies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
