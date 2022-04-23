const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProved = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777,
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProved(
          process.env.MNEMONIC,
          "http://127.0.0.1:7545",
          AccountIndex
        );
      },
      network_id: 5777,
    },
    goerli_infura: {
      provider: function () {
        return new HDWalletProved(
          process.env.MNEMONIC,
          "https://goerli.infura.io/v3/430c002f434b49658729302d56dab792",
          AccountIndex
        );
      },
      network_id: 5,
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProved(
          process.env.MNEMONIC,
          "https://ropsten.infura.io/v3/430c002f434b49658729302d56dab792",
          AccountIndex
        );
      },
      network_id: 3,
    },
  },
  compilers: {
    solc: {
      version: "0.6.2",
    },
  },
};
