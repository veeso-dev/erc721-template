import { ethers } from "hardhat";
require("dotenv").config();

const { OWNER_ADDRESS } = process.env;

async function main() {
  // deploy meow storage
  const contract = await ethers.deployContract("MyNft", [OWNER_ADDRESS]);
  const deployedContract = await contract.deploy();
  await deployedContract.deployed();
  console.log(`Contract deployed to ${deployedContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
