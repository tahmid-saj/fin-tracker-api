const bankingDatabase = require("./banking.mongo");
const axios = require("axios");


async function getBankingAccountsData() {
  console.log("Getting banking data");
};

async function getBankingSummaryData() {
  console.log("Getting banking summary data");
};

async function postBankingAccountCreate() {
  console.log("Posting banking account creation");
};

async function postBankingAccountTransaction() {
  console.log("Posting banking account transaction");
};

async function deleteBankingAccount() {
  console.log("Deleting banking account");
};

async function putBankingAccountsData() {
  console.log("Putting banking accounts data");
};

async function putBankingSummaryData() {
  console.log("Putting banking summary data");
};

module.exports = {
  getBankingAccountsData,
  getBankingSummaryData,
  postBankingAccountCreate,
  postBankingAccountTransaction,
  deleteBankingAccount,
  putBankingAccountsData,
  putBankingSummaryData,
}