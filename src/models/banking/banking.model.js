const { bankingAccountsDatabase, bankingSummaryDatabase } = require("./banking.mongo");
const axios = require("axios");
 
const { createBankingAccount, addBankingAccountTransaction } = require("./banking.mongo.crud")

// user signs in
async function getBankingAccountsData() {
  console.log("Getting banking data");
};

async function getBankingSummaryData() {
  console.log("Getting banking summary data");
};

// banking operations
async function postBankingAccountCreate(userId, email, bankingAccountName) {
  createBankingAccount(userId, email, bankingAccountName);
  console.log("Posting banking account creation");
};

async function postBankingAccountTransaction(userId, email, transactionInfo) {
  addBankingAccountTransaction(userId, email, transactionInfo);
  console.log("Posting banking account transaction");
};

async function deleteBankingAccount() {
  console.log("Deleting banking account");
};

// user signed out
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