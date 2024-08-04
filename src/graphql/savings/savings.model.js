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

module.exports = {
  savingsAccountsByUser,
  savingsAccountsSummaryByUser
}