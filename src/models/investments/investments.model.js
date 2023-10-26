const { investmentsDatabase, investmentsSummaryDatabase } = require("./investments.mongo");

const { getInvestments, getInvestmentsSummary,
  createInvestment, deleteInvestment, updateInvestment } = require("./investments.mongo.crud");

// signed in
async function getInvestmentsData(userId, email) {
  console.log("Getting investments data");
  return getInvestments(userId, email)
};

async function getInvestmentsSummaryData(userId, email) {
  console.log("Getting investments summary data");
  return getInvestmentsSummary(userId, email);
};

// investments operations
async function postInvestmentCreate(userId, email, investment) {
  console.log("Posting investment creation");
  createInvestment(userId, email, investment);
};

async function putInvestmentData(userId, email, originalInvestmentInfo, updatedInvestmentInfo) {
  console.log("Updating investment");
  updateInvestment(userId, email, originalInvestmentInfo, updatedInvestmentInfo);
};

async function deleteInvestment(userId, email, closingInvestmentName) {
  console.log("Deleting investment");
  deleteInvestment(userId, email, closingInvestmentName);
};

// signed out
async function putInvestmentsData() {

};

async function putInvestmentsSummaryData() {

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