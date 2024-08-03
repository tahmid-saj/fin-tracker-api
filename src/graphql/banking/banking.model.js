const { getBankingAccounts, getBankingSummary } = require("../../models/banking/banking.mongo.crud")

async function getBankingAccountsByUser(userId, email) {
  const bankingAccounts = await getBankingAccounts(userId, email)
  return bankingAccounts.bankingAccounts
}

async function getBankingSummaryByUser(userId, email) {
  const bankingSummary = await getBankingSummary(userId, email)
  return bankingSummary.bankingSummary
}

module.exports = {
  getBankingAccountsByUser
}