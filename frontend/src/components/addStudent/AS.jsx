import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { ipfsUp } from '../../utils/ipfs';
import { ethers } from '../header/ethers-5.6.esm.min';
import { abi, contractAddress } from '../header/constant'; 

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
const AS = () => {

  const [formData, setFormData] = useState({ name: '', email: '', doa:'', id:'',stuAdd:''});
  const [examData, setExamData] = useState({ Id: '', uniAdd: '',students:[]});
  const [acadData, setAcadData] = useState({ studentAdd: '', courseName: '',completionDate:"",examId:"",students:[], credits:0, marks:0});


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleExamChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };
  const handleAcadChange = (e) => {
   
    setAcadData({ ...acadData, [e.target.name]: e.target.value });
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var details={
        "doa":formData.doa,
        "email":formData.email
    }
    let hash = await ipfsUp(details);
    console.log("hash: "+hash)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      console.log("hi")
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.registerStudent(formData.id,formData.name,formData.stuAdd, signer.getAddress(),hash)
        await listenForTransactionMine(transactionResponse, provider)
        await transactionResponse.wait(1)
      } catch (error) {
        console.log(error)
      }
    } 

    // Add your logic to handle form submission without reloading the page
    
  };
  const addExamination = async (e) => {
    e.preventDefault();
    var stud= examData.students.split(",")
    // stud=['0x02869714153A46E861FaaD428b5fa32F0552', '0x4eF0f9924a2ADec9ca2E75022fFAF15a92cC731A']
  
    
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      console.log("hi")
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.addExam("10/20/10",examData.Id,examData.uniAdd,stud)
        await listenForTransactionMine(transactionResponse, provider)
        await transactionResponse.wait(1)
      } catch (error) {
        console.log(error)
      }
    } 

    // Add your logic to handle form submission without reloading the page
    
  };
  const addAcad = async (e) => {
    e.preventDefault();
    // var stud= examData.students.split(",")
    // stud=['0x02869714153A46E861FaaD428b5fa32F0552', '0x4eF0f9924a2ADec9ca2E75022fFAF15a92cC731A']
  
    
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      console.log("hi")
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.addAcademicRecord("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC","newcourse","1","10/3/12","1","1")
        await listenForTransactionMine(transactionResponse, provider)
        await transactionResponse.wait(1)
      } catch (error) {
        console.log(error)
      }
    } 

    // Add your logic to handle form submission without reloading the page
    
  };
  
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
        // await listenForTransactionMine(transactionResponse, provider)
        // setCount(transactionResponse.toString())
        console.log(transactionResponse.toString())
        const dataArray = transactionResponse.map(value => value.toString()); // Convert BigNumbers to numbers if necessary

        console.log('Array Data:', dataArray);
        // setvalue(transactionResponse.toString())
        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error)
      }}
  
  }
  return (
    <Box
    
    display="flex"
    justifyContent="center"
    alignItems="center"
    

    >

    <Box
    width={1500}
    display='flex'
    flex-direction= 'row'
    justify-content='space-around'
   

    >
      <Card variant="outlined">

    <form onSubmit={handleSubmit} style={{margin:'6px'}}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        name='name'
        margin="normal"
        value={formData.name}
        onChange={handleInputChange}
        />
      <TextField
        label="Id"
        variant="outlined"
        fullWidth
        name="id"
        margin="normal"
        value={formData.id}
        onChange={handleInputChange}
        />
      <TextField
        label="Date of Addmisson"
        variant="outlined"
        fullWidth
        name='doa'
        margin="normal"
        value={formData.doa}
        onChange={handleInputChange}
        />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name='email'
        margin="normal"
        value={formData.email}
        onChange={handleInputChange}
        />
      <TextField
        label="Student Address"
        variant="outlined"
        fullWidth
        name='stuAdd'
        margin="normal"
        value={formData.stuAdd}
        onChange={handleInputChange}
        />
      {/* <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          // value={role}
          // onChange={(e) => setRole(e.target.value)}
          >
          <MenuItem value="developer">1</MenuItem>
          <MenuItem value="designer">Designer</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </Select>
      </FormControl> */}
      <Button type="submit" variant="contained" color="primary">
        ADD STUDENT
      </Button>
    </form>
    </Card>
    <Card variant="outlined">

    <form onSubmit={addExamination} style={{margin:'6px'}}>
      <TextField
        label="Id"
        variant="outlined"
        fullWidth
        name='Id'
        margin="normal"
        value={examData.Id}
        onChange={handleExamChange}
        />
      
      <TextField
        label="University Address"
        variant="outlined"
        fullWidth
        margin="normal"
        name='uniAdd'
        value={examData.uniAdd}
        onChange={handleExamChange}
        />
      <TextField
        label="Student Adresses"
        variant="outlined"
        fullWidth
        margin="normal"
        name='students'
        value={examData.students}
        onChange={handleExamChange}
        
        />
      {/* <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
        label="Role"
        // value={role}
          // onChange={(e) => setRole(e.target.value)}
          >
          <MenuItem value="developer">1</MenuItem>
          <MenuItem value="designer">Designer</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          </Select>
        </FormControl> */}
      <Button type="submit" variant="contained" color="primary">
        ADD EXAM     
      </Button>
    </form>
        </Card>
        <Card variant="outlined">

    <form onSubmit={addAcad} style={{margin:'6px'}}>
      <TextField
        label="Studentn Address"
        variant="outlined"
        fullWidth
        name='studentAdd'
        margin="normal"
        value={acadData.studentAdd}
        onChange={handleAcadChange}
        />
        <TextField
        label="Course Name"
        variant="outlined"
        fullWidth
        name='courseName'
        margin="normal"
        value={acadData.courseName}
        onChange={handleAcadChange}
        />
        <TextField
        label="Credits"
        variant="outlined"
        fullWidth
        name='credits'
        margin="normal"
        value={acadData.credits}
        onChange={handleAcadChange}
        />
        <TextField
        label="Exam Id"
        variant="outlined"
        fullWidth
        name='examId'
        margin="normal"
        value={acadData.examId}
        onChange={handleAcadChange}
        />
        <TextField
        label="Name"
        variant="outlined"
        fullWidth
        name='completionDate'
        margin="normal"
        value={acadData.completionDate}
        onChange={handleAcadChange}
        />
      <TextField
        label="Id"
        variant="outlined"
        fullWidth
        name='marks'
        margin="normal"
        value={acadData.marks}
        onChange={handleAcadChange}
        />
     
      {/* <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        /> */}
      {/* <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
        label="Role"
        // value={role}
        // onChange={(e) => setRole(e.target.value)}
        >
        <MenuItem value="developer">1</MenuItem>
        <MenuItem value="designer">Designer</MenuItem>
        <MenuItem value="manager">Manager</MenuItem>
        </Select>
      </FormControl> */}
      <Button type="submit" variant="contained" color="primary">
        ADD ACADMEIC RECORD
      </Button>
    </form>
      </Card>
    
          </Box>
            </Box>
  )
}

export default AS