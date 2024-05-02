import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Card } from '@mui/material';
import { ipfsUp } from '../../utils/ipfs';
import { ethers } from '../header/ethers-5.6.esm.min';
import { abi, contractAddress } from '../header/constant'; 
const AddUni = () => {


    // function registerUniversity(
    //     string memory name,
    //     string memory location,
    //     string memory detailIpfs,
    //     string memory identifier
    const [formData, setFormData] = useState({ name: '', email: '',noOfDegree:'' ,location:'', id:'',doa:'',uniAdd:''});


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    var details={
        "doe":formData.doa,
        "email":formData.email,
        "noOfDegree":formData.noOfDegree
    }
    var hash = await ipfsUp(details);
    console.log("hash: "+hash)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      console.log("hi")
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.registerUniversity(formData.name,formData.location,hash,formData.id,formData.uniAdd )
        // const transactionResponse = await contract.registerUniversity("abcd","location",hash,"dasda","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")
        // await listenForTransactionMine(transactionResponse, provider)
        // await transactionResponse.wait(1)
      } catch (error) {
        console.log(error)
      }
    } 

    // Add your logic to handle form submission without reloading the page
    
  };


  return (
    <Box
    
    display="flex"
    justifyContent="center"
    alignItems="center"
    margin={5}
    

    >

    <Box
    width={1000}
    display='flex'
    flex-direction= 'row'
    justify-content='space-around'
   
    >
      <Card>


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
        margin="normal"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        />
      <TextField
        label="Date of Establishment"
        variant="outlined"
        fullWidth
        margin="normal"
        name='doa'
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
        label="No of Degree Offered"
        variant="outlined"
        fullWidth
        margin="normal"
        name='noOfDegree'
        value={formData.noOfDegree}
        onChange={handleInputChange}
        />
      <TextField
        label="University Address"
        variant="outlined"
        fullWidth
        margin="normal"
        name='uniAdd'
        value={formData.uniAdd}
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
        ADD UNIVERSITY
      </Button>
    </form>

      </Card>
   
    
          </Box>
            </Box>




  )
}

export default AddUni