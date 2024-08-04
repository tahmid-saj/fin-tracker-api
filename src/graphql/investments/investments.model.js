const { getInvestments, getInvestmentsSummary,
  createInvestment
} = require("../../models/investments/investments.mongo.crud")

async function getInvestmentsByUser(userId, email) {
  const investments = await getInvestments(userId, email)
  return investments.investments
}

async function getInvestmentsSummaryByUser(userId, email) {
  const investmentsSummary = await getInvestmentsSummary(userId, email)
  return investmentsSummary.investmentsSummary
}

async function createUserInvestment(userId, email, investmentInfo) {
  console.log("Posting investment creation");
  createInvestment(userId, email, investmentInfo);
  return true
}

module.exports = {
  getInvestmentsByUser,
  getInvestmentsSummaryByUser,
  createUserInvestment
}