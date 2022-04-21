const MyToken = artifacts.require("MyToken");

const chai = require("./chaiSetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract("token test", async (accounts) => {
  const [deployerAcc, recipient, anotherAcc] = accounts;

  beforeEach(async () => {
    this.myToken = await MyToken.new(process.env.INITIAL_TOKENS);
  });

  it("all tokens should be in my account", async () => {
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    return expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("It's not possible to send more tokens than account 1 has", async () => {
    let instance = this.myToken;
    let balanceOfAccount = await instance.balanceOf(deployerAcc);
    await expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to
      .eventually.be.rejected;

    //check if the balance is still the same
    return expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });

  it("possible to send tokens between accounts", async () => {
    const sendTokens = 1;
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    await expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled;
    await expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    return expect(
      instance.balanceOf(recipient)
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });
});
