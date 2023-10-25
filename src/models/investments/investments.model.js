const { investmentsDatabase, investmentsSummaryDatabase } = require("./investments.mongo");

const { createInvestment } = require("./investments.mongo.crud");

// signed in
async function getInvestmentsData() {

};

async function getInvestmentsSummaryData() {

};

// investments operations
async function postInvestmentCreate(userId, email, investment) {
  console.log("Posting investment creation");
  createInvestment(userId, email, investment);
};

async function putInvestmentData() {

};

async function deleteInvestment() {

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

