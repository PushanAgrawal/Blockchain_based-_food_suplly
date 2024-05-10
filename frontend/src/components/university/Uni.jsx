import React, { useEffect } from "react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import { ethers } from "../header/ethers-5.6.esm.min";
import { abi, contractAddress } from "../header/constant";
import { incrementByAmount } from "../redux/counter.jsx";
import { useSelector, useDispatch } from "react-redux";
import { extractFromIPFS, ipfsUp } from "../../utils/ipfs";
// import Info from "../info/Info.jsx";
// import AS from "../addStudent/AS.jsx";
// import SS from "../showstudnets/SS.jsx";
// import Header from "../header/header.jsx";

// import count from
// import Grid from '@mui/material';

const Uni = () => {
  const [dataArray, setData] = useState([]);
  const { value, name, id, location } = useSelector((state) => state.counter);
  var [uniid, setvalue] = useState("");
  var [uniname, setname] = useState("");
  async function getUni() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("hi");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        console.log(signer);
        // const transactionResponse = await contract.getUni(
        //   "0x73E29cD70CBA744Cd1277EC2B2383B6eB147619c"
        // );
        var tranc = await contract.getUniIdentifier(signer.getAddress());

        // await listenForTransactionMine(transactionResponse, provider)
        // setCount(transactionResponse.toString())
        console.log(tranc.toString());
        setvalue(tranc.toString());
        tranc = await contract.getUniName(signer.getAddress());
        setname(tranc.toString());

        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error);
      }
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    doa: "",
    id: "",
    stuAdd: "",
  });
  const [examData, setExamData] = useState({
    Id: "",
    uniAdd: "",
    students: [],
  });
  const [acadData, setAcadData] = useState({
    studentAdd: "",
    courseName: "",
    completionDate: "",
    examId: "",
    students: [],
    credits: 0,
    marks: 0,
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const handleExamChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };
  const handleAcadChange = (e) => {
    setAcadData({ ...acadData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var details = {
      doa: formData.doa,
      email: formData.email,
    };
    let hash = await ipfsUp(details);
    console.log("hash: " + hash);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      console.log("hi");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transactionResponse = await contract.registerStudent(
          formData.id,
          formData.name,
          formData.stuAdd,
          signer.getAddress(),
          hash
        );
        await listenForTransactionMine(transactionResponse, provider);
        await transactionResponse.wait(1);
      } catch (error) {
        console.log(error);
      }
    }

    // Add your logic to handle form submission without reloading the page
  };
  const addExamination = async (e) => {
    e.preventDefault();
    var stud = examData.students.split(",");
    // stud=['0x02869714153A46E861FaaD428b5fa32F0552', '0x4eF0f9924a2ADec9ca2E75022fFAF15a92cC731A']

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      console.log("hi");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transactionResponse = await contract.addExam(
          "10/20/10",
          examData.Id,
          examData.uniAdd,
          stud
        );
        await listenForTransactionMine(transactionResponse, provider);
        await transactionResponse.wait(1);
      } catch (error) {
        console.log(error);
      }
    }

    // Add your logic to handle form submission without reloading the page
  };
  const addAcad = async (e) => {
    e.preventDefault();
    // var stud= examData.students.split(",")
    // stud=['0x02869714153A46E861FaaD428b5fa32F0552', '0x4eF0f9924a2ADec9ca2E75022fFAF15a92cC731A']

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      console.log("hi");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transactionResponse = await contract.addAcademicRecord(
          acadData.studentAdd,
          acadData.courseName,
          acadData.credits,
          acadData.completionDate,
          acadData.examId,
          acadData.marks
        );
        await listenForTransactionMine(transactionResponse, provider);
        await transactionResponse.wait(1);
      } catch (error) {
        console.log(error);
      }
    }

    // Add your logic to handle form submission without reloading the page
  };
  useEffect(() => {
    getUni();
  }, [window.ethereum]);

  return (
    <div className="flex flex-col m-10">
      <div className="flex flex-row bg-green-100 rounded-lg shadow-lg gap-5 justify-around p-10 text-green-900 text-2xl">
        <span className="font-mono">Name: {uniname}</span>
        <span className="font-mono"> Id: {uniid}</span>
      </div>
      <div className="flex flex-col m-10 p-5 gap-5 bg-green-100">
        <span className="text-center text-2xl font-bold font-mono">
          Add Student Form
        </span>
        <div className="  flex flex-col gap-3">
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
              Date of Admisson :{" "}
            </span>

            <input
              name="doa"
              value={formData.doa}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>

          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Wallet Address :{" "}
            </span>

            <input
              name="stuAdd"
              value={formData.stuAdd}
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
      <div className="flex flex-col m-10 p-5 gap-5 bg-green-100">
        <span className="text-center text-2xl font-bold font-mono">
          Add Acadmeic Record Form
        </span>
        <div className="  flex flex-col gap-3">
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Student Adresss :{" "}
            </span>

            <input
              name="studentAdd"
              value={acadData.studentAdd}
              onChange={handleAcadChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Course Name :{" "}
            </span>

            <input
              name="courseName"
              value={acadData.courseName}
              onChange={handleAcadChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Credits :{" "}
            </span>

            <input
              name="credits"
              value={acadData.credits}
              onChange={handleAcadChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Exam Id :{" "}
            </span>

            <input
              name="examId"
              value={acadData.examId}
              onChange={handleAcadChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>

          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Completion Date :{" "}
            </span>

            <input
              name="completionDate"
              value={acadData.completionDate}
              onChange={handleAcadChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Marks :{" "}
            </span>

            <input
              name="marks"
              value={acadData.marks}
              onChange={handleAcadChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>

          <button
            onClick={addAcad}
            className="bg-green-600 p-2 text-xl font-mono font-bold rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="flex flex-col m-10 p-5 gap-5 bg-green-100">
        <span className="text-center text-2xl font-bold font-mono">
          Add Exam Form
        </span>
        <div className="  flex flex-col gap-3">
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">Id : </span>

            <input
              name="Id"
              value={examData.Id}
              onChange={handleInputChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              University Address :{" "}
            </span>

            <input
              name="uniAdd"
              value={examData.uniAdd}
              onChange={handleExamChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>
          <div className="flex  gap-3  ">
            <span className="font-mono text-xl whitespace-nowrap">
              Students :{" "}
            </span>

            <input
              name="students"
              value={examData.students}
              onChange={handleExamChange}
              className="rounded-lg w-full  border border-slate-900"
            ></input>
          </div>

          <button
            onClick={addExamination}
            className="bg-green-600 p-2 text-xl font-mono font-bold rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Uni;
