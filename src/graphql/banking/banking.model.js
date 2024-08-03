const { getBankingAccounts, getBankingSummary,
  createBankingAccount
} = require("../../models/banking/banking.mongo.crud")

async function getBankingAccountsByUser(userId, email) {
  const bankingAccounts = await getBankingAccounts(userId, email)
  return bankingAccounts.bankingAccounts
}

async function getBankingSummaryByUser(userId, email) {
  const bankingSummary = await getBankingSummary(userId, email)
  return bankingSummary.bankingSummary
}

async function createUserBankingAccount(userId, email, bankingAccountName) {
  createBankingAccount(userId, email, bankingAccountName)
  console.log("Posting banking account creation");
  return true
}

module.exports = {
  getBankingAccountsByUser,
  getBankingSummaryByUser,
  createUserBankingAccount
}