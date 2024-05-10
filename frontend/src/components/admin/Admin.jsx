import React, { useEffect, useState } from "react";
import Header from "../header/header";
import AddUni from "../addUni/AddUni";
import Univer from "./Univer";
import { ethers } from "../header/ethers-5.6.esm.min";
import { abi, contractAddress } from "../header/constant";
import { extractFromIPFS, ipfsUp } from "../../utils/ipfs";

const Admin = () => {
  const [universities, setUniversities] = useState(0);
  const [dataArray, setData] = useState([]);
  const [student, setstudent] = useState([]);
  const getuni = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("hi");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        console.log("hi");
        const transactionResponse = await contract.getUniversities();
        console.log(transactionResponse.toString());
        var data = await transactionResponse.map((value) => value.toString()); //
        console.log(typeof data);
        setUniversities(Object.keys(data).length);
        var temp = [];
        var students = [];

        for (var i = 0; i < data.length; i++) {
          console.log(data[i]);

          var a = { name: "", id: "", address: data[i], email: "", doa: "" };
          var tranc = await contract.getUniIdentifier(data[i]);
          console.log(tranc.toString());
          a.id = tranc.toString();
          tranc = await contract.getUniName(data[i]);
          a.name = tranc.toString();
          console.log(tranc.toString());

          tranc = await contract.getUniIpfs(data[i]);
          console.log(tranc.toString());
          var res = await extractFromIPFS(tranc.toString());
          // var res = await extractFromIPFS(tranc.toString());
          // var res = await extractFromIPFS(tranc.toString());
          // var res = await extractFromIPFS(tranc.toString());
          // var res = await extractFromIPFS(tranc.toString());
          // var res = await extractFromIPFS(tranc.toString());
          // var res = await extractFromIPFS(tranc.toString());
          console.log(res.data);
          a.doa = res["doe"];
          a.email = res.email;
          temp.push(a);
          tranc = await contract.getUniStudowner(data[i]);
          var stu = await tranc.map((value) => value.toString());
          console.log(stu);
          for (var s = 0; s < stu.length; s++) {
            var d = {
              name: "",
              id: "",
            };
             tranc = await contract.getStudentname(stu[s]);
            d.name = tranc.toString();
            tranc = await contract.getStudentidentifier(stu[s]);
            d.id = tranc.toString();
            students.push(d);
            console.log(students);
          }
        }
        setstudent(students);
        setData(temp);
        console.log(temp);
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    getuni();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    noOfDegree: "",
    location: "",
    id: "",
    doa: "",
    uniAdd: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var details = {
      doe: formData.doa,
      email: formData.email,
      noOfDegree: formData.noOfDegree,
    };
    console.log(formData);
    var hash = await ipfsUp(details);
    console.log("hash: " + hash);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      console.log("hi");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transactionResponse = await contract.registerUniversity(
          formData.name,
          formData.location,
          hash,
          formData.id,
          formData.uniAdd
        );
        // const transactionResponse = await contract.registerUniversity("abcd","location",hash,"dasda","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")
        // await listenForTransactionMine(transactionResponse, provider)
        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error);
      }
    }

    // Add your logic to handle form submission without reloading the page
  };

  return (
    <div className="flex flex-col gap-7">
      <div className=" flex flex-row justify-around">
        <div className="flex flex-col rounded-lg shadow-xl gap-1 border-2 border-green-200 bg-green-100 p-8 pr-[10rem] pl-8">
          <span className="text-xl font-mono">UNIVERSITIES</span>
          <span className="text-[5rem] font-Rampart text-green-800  text-center">
            {universities}
          </span>
          <span className="text-lg font-mono">University count</span>
          <span className="font-mono">student count : {100}</span>
        </div>
        <div className="flex flex-col rounded-lg shadow-xl gap-1 border-2 border-green-200 bg-green-100 p-8 pr-[10rem] pl-8">
          <span className="text-xl font-mono">Student</span>
          <span className="text-[5rem] font-Rampart text-green-800  text-center">
            {100}
          </span>
          <span className="text-lg font-mono">student count</span>
        </div>
      </div>
      <div className="flex m-10 justify-around rounded-lg shadow-lg gap-6 overflow-y-auto p-6 bg-green-100">
        <div className="w-1/2 flex flex-col gap-2 ">
          <div className="text-2xl font-Rampart  text-center    ">
            University
          </div>
          <div className="flex justify-around text-lg font-bold rounded-lg p-2 bg-green-500">
            <span>Name</span>
            <span>Email</span>
            <span>Id</span>
          </div>
          {/* <div className='flex justify-around text-lg font-bold rounded-lg p-2 bg-green-200'>
         
          <span>Name</span>
          <span>Name</span>
          <span>Name</span>
      

                </div> */}
          {dataArray.map((a) => (
            <div className="flex justify-around text-lg  rounded-lg p-2 bg-green-200">
              <span>{a.name}</span>
              <span>{a.email}</span>
              <span>{a.id}</span>
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col gap-2 ">
          <div className="text-xl font-Rampart  text-center ">Students</div>
          <div className="flex justify-around text-lg font-bold rounded-lg p-2 bg-green-500">
            <h2>Name</h2>
            <h2>University </h2>
          </div>
          {student.map((a) => (
            <div className="flex justify-around text-lg  rounded-lg p-2 bg-green-200">
              <span>{a.name}</span>

              <span>{a.id}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col m-10 p-5 gap-5 bg-green-100">
        <span className="text-center text-2xl font-bold font-mono">
          Add University Form
        </span>
        <div className="  flex flex-col gap-3">
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">Name : </span>

            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Email :{" "}
            </span>

            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              No of Degrees :{" "}
            </span>

            <input
              name="noOfDegree"
              value={formData.noOfDegree}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Date of Establishment :{" "}
            </span>

            <input
              name="doa"
              value={formData.doa}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">Id : </span>

            <input
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Wallet Address :{" "}
            </span>

            <input
              name="uniAdd"
              value={formData.uniAdd}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Location:{" "}
            </span>

            <input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-600 p-2 text-xl font-mono font-bold rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>

      {/* <AddUni></AddUni>   */}
      {/* <Univer></Univer>  */}
    </div>
  );
};

export default Admin;
