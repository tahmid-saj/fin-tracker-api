const { bankingAccountsDatabase, bankingSummaryDatabase } = require("./banking.mongo");
const axios = require("axios");
 
const { getBankingAccounts, getBankingSummary,
  createBankingAccount, addBankingAccountTransaction, closeBankingAccount,
  updateBankingAccounts, updateBankingSummary } = require("./banking.mongo.crud")

// user signs in
async function getBankingAccountsData(userid, email) {
  console.log("Getting banking data");
  return getBankingAccounts(userid, email);
};

async function getBankingSummaryData(userid, email) {
  console.log("Getting banking summary data");
  return getBankingSummary(userid, email);
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

async function deleteBankingAccount(userId, email, bankingAccountName) {
  closeBankingAccount(userId, email, bankingAccountName);
  console.log("Deleting banking account");
};

// user signed out
async function putBankingAccountsData(userId, email, bankingAccounts) {
  updateBankingAccounts(userId, email, bankingAccounts);
  console.log("Putting banking accounts data");
};

async function putBankingSummaryData(userId, email, bankingSummary) {
  updateBankingSummary(userId, email, bankingSummary);
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