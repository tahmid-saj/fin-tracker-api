const { getInvestments, getInvestmentsSummary

} = require("../../models/investments/investments.mongo.crud")

async function getInvestmentsByUser(userId, email) {
  const investments = await getInvestments(userId, email)
  return investments.investments
}

async function getInvestmentsSummaryByUser(userId, email) {
  const investmentsSummary = await getInvestmentsSummary(userId, email)
  return investmentsSummary.investmentsSummary
}

module.exports = {
  getInvestmentsByUser,
  getInvestmentsSummaryByUser
}