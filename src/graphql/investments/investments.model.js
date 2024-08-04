const { getInvestments, getInvestmentsSummary,
  createInvestment, updateInvestment, closeInvestment,
  updateInvestments
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

async function updateUserInvestment(userId, email, originalInvestmentInfo, updatedInvestmentInfo) {
  console.log("Updating investment");
  updateInvestment(userId, email, originalInvestmentInfo, updatedInvestmentInfo);
  return true
}

async function deleteUserInvestment(userId, email, closingInvestmentName) {
  closeInvestment(userId, email, closingInvestmentName);
  console.log("Deleting investment");
  return true
}

async function updateUserInvestments(userId, email, investments) {
  updateInvestments(userId, email, investments);
  console.log("Putting investments data");
  return true
}

module.exports = {
  getInvestmentsByUser,
  getInvestmentsSummaryByUser,
  createUserInvestment,
  updateUserInvestment,
  deleteUserInvestment,
  updateUserInvestments
}