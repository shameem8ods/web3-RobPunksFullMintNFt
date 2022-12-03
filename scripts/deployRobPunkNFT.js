const hre = require("hardhat");

async function main() {

  const RobPunksNFT = await hre.ethers.getContractFactory("RobPunksNFT");
  const robPunksNFT = await RobPunksNFT.deploy();

  await robPunksNFT.deployed();

  console.log(
    "RobPunksNFT deployed to ", robPunksNFT.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
