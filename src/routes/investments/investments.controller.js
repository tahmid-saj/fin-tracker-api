const { getInvestmentsData, getInvestmentsSummaryData, 
  postInvestmentCreate, putInvestmentData, deleteInvestment,
  putInvestmentsData, putInvestmentsSummaryData } = require("../../models/investments/investments.model");

// signed in
async function httpGetInvestmentsData(req, res) {
  // return res.status(200).json(getInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetInvestmentsData = await getInvestmentsData(userId, email);

    if (resGetInvestmentsData) return res.status(200).json(resGetInvestmentsData);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpGetInvestmentsSummaryData(req, res) {
  // return res.status(200).json(getInvestmentsSummaryData());
  try {
    const userId = req.params.userId;
    const email = req.params.email;
    const resGetInvestmentsSummaryData = await getInvestmentsSummaryData(userId, email);

    if (resGetInvestmentsSummaryData) return res.status(200).json(resGetInvestmentsSummaryData);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

// investments operations
async function httpPostInvestmentCreate(req, res) {
  // return res.status(200).json(postInvestmentCreate());
  try {
    const investmentInfo = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostInvestmentCreate = await postInvestmentCreate(userId, email, investmentInfo);

    if (resPostInvestmentCreate) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpPutInvestmentData(req, res) {
  // return res.status(200).json(putInvestmentData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const originalInvestmentInfo = req.body.originalInvestmentInfo;
    const updatedInvestmentInfo = req.body.updatedInvestmentInfo;
    const resPutInvestmentData = await putInvestmentData(userId, email, originalInvestmentInfo, updatedInvestmentInfo);

    if (resPutInvestmentData) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
};

async function httpDeleteInvestment(req, res) {
  // return res.status(200).json(deleteInvestment());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const closingInvestmentName = String(req.body);
    console.log(closingInvestmentName);
    const resDeleteInvestment = await deleteInvestment(userId, email, closingInvestmentName);

    if (resDeleteInvestment) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
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