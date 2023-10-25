const { getInvestmentsData, getInvestmentsSummaryData, 
  postInvestmentCreate, putInvestmentData, deleteInvestment,
  putInvestmentsData, putInvestmentsSummaryData } = require("../../models/investments/investments.model");

// signed in
async function httpGetInvestmentsData(req, res) {
  return res.status(200).json(getInvestmentsData());
};

async function httpGetInvestmentsSummaryData(req, res) {
  return res.status(200).json(getInvestmentsSummaryData());
};

// investments operations
async function httpPostInvestmentCreate(req, res) {
  return res.status(200).json(postInvestmentCreate());
};

async function httpPutInvestmentData(req, res) {
  return res.status(200).json(putInvestmentData());
};

async function httpDeleteInvestment(req, res) {
  return res.status(200).json(deleteInvestment());
};

// signed out
async function httpPutInvestmentsData(req, res) {
  return res.status(200).json(putInvestmentsData());
};

async function httpPutInvestmentsSummaryData(req, res) {
  return res.status(200).json(putInvestmentsSummaryData());
};

module.exports = {
  httpGetInvestmentsData,
  httpGetInvestmentsSummaryData,
  httpPostInvestmentCreate,
  httpPutInvestmentData,
  httpDeleteInvestment,
  httpPutInvestmentsData,
  httpPutInvestmentsSummaryData,
};

