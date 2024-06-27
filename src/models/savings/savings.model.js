const { savingsAccountsDatabase, savingsAccountsSummaryDatabase } = require("./savings.mongo");

const { getSavingsAccounts, getSavingsAccountsSummary,
  createSavingsAccount, closeSavingsAccount, updateSavingsAccount,
  updateSavingsAccounts, updateSavingsAccountsSummary } = require("./savings.mongo.crud");

// signed in
async function getSavingsAccountsData(userId, email) {
  console.log("Getting savings accounts data");
  return getSavingsAccounts(userId, email)
};

// TODO: need to better manage summary
async function getSavingsAccountsSummaryData(userId, email) {
  console.log("Getting savings accounts summary data");
  return getSavingsAccountsSummary(userId, email);
};

// savings operations
async function postSavingsAccountCreate(userId, email, savingsAccountInfo) {
  console.log("Posting savings account creation");
  createSavingsAccount(userId, email, savingsAccountInfo);
  return true
};

// TODO: need to better manage summary on updating data
async function putSavingsAccountData(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo) {
  console.log("Updating savings account");
  updateSavingsAccount(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo);
  return true
};

// TODO: need to better manage summary on delete
async function deleteSavingsAccount(userId, email, closingSavingsAccountName) {
  closeSavingsAccount(userId, email, closingSavingsAccountName);
  console.log("Deleting savings account");
  return true
};

// signed out
async function putSavingsAccountsData(userId, email, savingsAccounts) {
  updateSavingsAccounts(userId, email, savingsAccounts);
  console.log("Putting savings accounts data");
  return true
};

// TODO: need to better manage summary
async function putSavingsAccountsSummaryData(userId, email, savingsAccountsSummary) {
  updateSavingsAccountsSummary(userId, email, savingsAccountsSummary);
  console.log("Putting savings accounts summary data");
  return true
};

module.exports = {
  getSavingsAccountsData,
  getSavingsAccountsSummaryData,
  postSavingsAccountCreate,
  putSavingsAccountData,
  deleteSavingsAccount,
  putSavingsAccountsData,
  putSavingsAccountsSummaryData,
}