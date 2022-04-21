"use strict";
const chai = require("chai");
const expect = chai.expect;

const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
module.exports = chai;
