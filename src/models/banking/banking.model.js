const bankingDatabase = require("./banking.mongo");
const axios = require("axios");


async function getBankingData() {
  console.log("Getting banking data");
};

module.exports = {
  getBankingData,
}