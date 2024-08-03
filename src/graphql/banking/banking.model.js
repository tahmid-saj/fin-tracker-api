const { getBankingAccounts, getBankingSummary,
  createBankingAccount, addBankingAccountTransaction
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

async function updateUserBankingAccountTransaction(userId, email, transactionInfo) {
  addBankingAccountTransaction(userId, email, transactionInfo)
  console.log("Posting banking account transaction");
  return true
}

module.exports = {
  getBankingAccountsByUser,
  getBankingSummaryByUser,
  createUserBankingAccount,
  updateUserBankingAccountTransaction
}