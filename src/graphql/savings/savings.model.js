const { getSavingsAccounts, getSavingsAccountsSummary,
  createSavingsAccount, updateSavingsAccount, closeSavingsAccount,
  updateSavingsAccounts, updateSavingsAccountsSummary
} = require("../../models/savings/savings.mongo.crud")

async function savingsAccountsByUser(userId, email) {
  const savingsAccounts = await getSavingsAccounts(userId, email)
  return savingsAccounts.savingsAccounts
}

async function savingsAccountsSummaryByUser(userId, email) {
  const savingsAccountsSummary = await getSavingsAccountsSummary(userId, email)
  return savingsAccountsSummary.savingsAccountsSummary
}

async function createUserSavingsAccount(userId, email, savingsAccountInfo) {
  console.log("Posting savings account creation");
  createSavingsAccount(userId, email, savingsAccountInfo);
  return true
}

async function updateUserSavingsAccount(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo) {
  console.log("Updating savings account");
  updateSavingsAccount(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo);
  return true
}

async function deleteUserSavingsAccount(userId, email, closingSavingsAccountName) {
  closeSavingsAccount(userId, email, closingSavingsAccountName);
  console.log("Deleting savings account");
  return true
}

async function updateUserSavingsAccounts(userId, email, savingsAccounts) {
  updateSavingsAccounts(userId, email, savingsAccounts);
  console.log("Putting savings accounts data");
  return true
}

module.exports = {
  savingsAccountsByUser,
  savingsAccountsSummaryByUser,
  createUserSavingsAccount,
  updateUserSavingsAccount,
  deleteUserSavingsAccount,
  updateUserSavingsAccounts
}