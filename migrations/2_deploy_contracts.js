let MyToken = artifacts.require("MyToken.sol");
let MyTokenSale = artifacts.require("MyTokenSale.sol");
let MyKycContract = artifacts.require("KycContract.sol");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(MyKycContract);
  await deployer.deploy(
    MyTokenSale,
    1,
    addr[0],
    MyToken.address,
    MyKycContract.address
  );

  let tokenInstance = await MyToken.deployed();
  await tokenInstance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
