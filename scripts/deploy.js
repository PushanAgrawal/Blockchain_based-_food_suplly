const { ethers } = require("hardhat")


async function main(){

  const [owner,seed,farmer,process,dist,retail] = await ethers.getSigners();

  const tranc =  await ethers.getContractFactory('StudentLedger');
  const tranc_dep = await tranc.deploy();

  console.log(tranc_dep);
  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });