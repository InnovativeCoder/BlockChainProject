const MyTokenSale = artifacts.require("MyTokenSale");
const MyToken = artifacts.require("MyToken");
const KycContract = artifacts.require("KycContract");

const chai = require("./chaiSetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract("Token Sale Test", async (accounts) => {
  const [deployerAcc, recipient, anotherAcc] = accounts;

  it("shouldnt have any token in my deployerAcc", async () => {
    let instance = await MyToken.deployed();
    return expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("all tokens should be in the TokenSale Smart Contract by default", async () => {
    let instance = await MyToken.deployed();
    let balanceOfTokenSaleSmartContract = await instance.balanceOf(
      MyTokenSale.address
    );
    let totalSupply = await instance.totalSupply();
    return expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(
      totalSupply
    );
  });

  it("should be possible to buy tokens", async () => {
    let tokenInstance = await MyToken.deployed();
    let tokenSaleInstance = await MyTokenSale.deployed();
    let kycInstance = await KycContract.deployed();
    let balanceBefore = await tokenInstance.balanceOf(deployerAcc);
    await kycInstance.setKycCompleted(deployerAcc, { from: deployerAcc });
    balanceBefore = balanceBefore.add(new BN(1));
    expect(
      tokenSaleInstance.sendTransaction({
        from: deployerAcc,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.fulfilled;
    expect(
      tokenInstance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(balanceBefore);
  });
});
