const { investmentsDatabase, investmentsSummaryDatabase } = require("./investments.mongo");

const { getInvestments, getInvestmentsSummary,
  createInvestment, closeInvestment, updateInvestment,
  updateInvestments, updateInvestmentsSummary } = require("./investments.mongo.crud");

// signed in
async function getInvestmentsData(userId, email) {
  console.log("Getting investments data");
  return getInvestments(userId, email)
};

// TODO: need to better manage summary
async function getInvestmentsSummaryData(userId, email) {
  console.log("Getting investments summary data");
  return getInvestmentsSummary(userId, email);
};

// investments operations
async function postInvestmentCreate(userId, email, investmentInfo) {
  console.log("Posting investment creation");
  createInvestment(userId, email, investmentInfo);
};

// TODO: need to better manage summary on updating data
async function putInvestmentData(userId, email, originalInvestmentInfo, updatedInvestmentInfo) {
  console.log("Updating investment");
  updateInvestment(userId, email, originalInvestmentInfo, updatedInvestmentInfo);
};

// TODO: need to better manage summary on delete
async function deleteInvestment(userId, email, closingInvestmentName) {
  closeInvestment(userId, email, closingInvestmentName);
  console.log("Deleting investment");
};

// signed out
async function putInvestmentsData(userId, email, investments) {
  updateInvestments(userId, email, investments);
  console.log("Putting investments data");
};

// TODO: need to better manage summary
async function putInvestmentsSummaryData(userId, email, investmentsSummary) {
  updateInvestmentsSummary(userId, email, investmentsSummary);
  console.log("Putting investments summary data");
};

module.exports = {
  getInvestmentsData,
  getInvestmentsSummaryData,
  postInvestmentCreate,
  putInvestmentData,
  deleteInvestment,
  putInvestmentsData,
  putInvestmentsSummaryData
}