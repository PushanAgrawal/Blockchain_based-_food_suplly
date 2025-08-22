import React from "react";
import { ethers } from "../header/ethers-5.6.esm.min";
import { useEffect, useState } from "react";
import { abi, contractAddress } from "../header/constant";
import Info from "../info/Info";
import SH from "./SH";
import GAR from "./GAR";
import { extractFromIPFS, ipfsUp } from "../../utils/ipfs";

const StudentInfo = () => {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [dataArray, setData] = useState([]);
  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("hi");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        console.log("hi");
        var transactionResponse = await contract.getStudentname(
          signer.getAddress()
        );
        setname(transactionResponse.toString());
        transactionResponse = await contract.getStudentidentifier(
          signer.getAddress()
        );
        setid(transactionResponse.toString());

        var tranc = await contract.getCourse();
        console.log("get");
        var a = { marks: "", course: "" };
        a.marks = 20;
        a.course = "newcourse";

        a.course = tranc.toString();
        tranc = await contract.getMarks();
        a.marks = tranc.toString();
        var temp = [a];

        setData(temp);
        var tranc = await contract.getStudentipfs(signer.getAddress());
        var ans = tranc.toString();
        console.log(ans);
        var ipfsdata= extractFromIPFS(ans)
        // console.log(a);

        //   console.log(transactionResponse.toString())
        //    var data = transactionResponse.map(value => value.toString()); // Convert BigNumbers to numbers if necessary

        //   var temp=[];
        //   for(var i=0;i<1;i++){
        //     console.log(data[i])
        //     data[i]="0x73E29cD70CBA744Cd1277EC2B2383B6eB147619c"
        //     var a={marks:'',course:''}
        //     var tranc = await contract.getStudentidentifier(data[i])
        //     console.log(tranc.toString())
        //     a.id = tranc.toString()
        //     tranc=await contract.getStudentname(data[i])
        //     a.name = tranc.toString()
        //     console.log(tranc.toString())

        //     tranc=await contract.getStudentipfs(data[i])
        //     console.log(tranc.toString())
        //     var res=await extractFromIPFS(tranc.toString())
        //     console.log(res.data)
        //     a.doa=res["doa"]
        //     a.email=res.email
        //     temp.push(a)

        //   }
        //   setData(temp)
        // setvalue(transactionResponse.toString())
        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="flex flex-col ">
      <div className="m-20 bg-green-100 p-10 rounded-lg shadow-xl text-4xl  flex flex-row justify-around">
        <span className="font-mono">Name: {name}</span>
        <span className="font-mono">Id: {id}</span>
      </div>
      <div className="m-20 bg-green-100 p-10 rounded-lg shadow-xl text-4xl  flex flex-col justify-center items-center gap-4 ">
        <span>Marks</span>
        <div className="flex justify-around text-lg font-bold rounded-lg p-2 bg-green-500 w-4/5">
          <span>Course</span>
          <span>Marks</span>
        </div>
        {dataArray.map((a) => (
          <div
            key={a.marks}
            className="flex justify-around text-lg  rounded-lg p-2 bg-green-200 w-4/5"
          >
            <span>{a.course}</span>
            <span>{a.marks}</span>
            {/* <span>{a.id}</span> */}
          </div>
        ))}
      </div>

      {/* <Info></Info>
        <GAR></GAR> */}
    </div>
  );
};

export default StudentInfo;
