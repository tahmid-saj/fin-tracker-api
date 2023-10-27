const { getSavingsAccountsData, getSavingsAccountsSummaryData, 
  postSavingsAccountCreate, putSavingsAccountData, deleteSavingsAccount,
  putSavingsAccountsData, putSavingsAccountsSummaryData } = require("../../models/savings/savings.model");

// signed in
async function httpGetSavingsAccountsData(req, res) {
  // return res.status(200).json(getInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetSavingsAccountsData = await getSavingsAccountsData(userId, email);

    if (resGetSavingsAccountsData) return res.status(200).json(resGetSavingsAccountsData);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpGetSavingsAccountsSummaryData(req, res) {
  // return res.status(200).json(getInvestmentsSummaryData());
  try {
    const userId = req.params.userId;
    const email = req.params.email;
    const resGetSavingsAccountsSummaryData = await getSavingsAccountsSummaryData(userId, email);

    if (resGetSavingsAccountsSummaryData) return res.status(200).json(resGetSavingsAccountsSummaryData);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

// savings operations
async function httpPostSavingsAccountCreate(req, res) {
  // return res.status(200).json(postInvestmentCreate());
  try {
    const savingsAccountInfo = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostSavingsAccountCreate = await postSavingsAccountCreate(userId, email, savingsAccountInfo);

    if (resPostSavingsAccountCreate) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpPutSavingsAccountData(req, res) {
  // return res.status(200).json(putInvestmentData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const originalSavingsAccountInfo = req.body.originalSavingsAccountInfo;
    const updatedSavingsAccountInfo = req.body.updatedSavingsAccountInfo;
    const resPutSavingsAccountData = await putSavingsAccountData(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo);

    if (resPutSavingsAccountData) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
};

async function httpDeleteSavingsAccount(req, res) {
  // return res.status(200).json(deleteInvestment());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const closingSavingsAccountName = String(req.body);
    console.log(closingSavingsAccountName);
    const resDeleteSavingsAccount = await deleteSavingsAccount(userId, email, closingSavingsAccountName);

    if (resDeleteSavingsAccount) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

// signed out
async function httpPutSavingsAccountsData(req, res) {
  // return res.status(200).json(putInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { savingsAccounts } = req.body;
    const resPutSavingsAccountsData = await putSavingsAccountsData(userId, email, savingsAccounts);

    if (resPutSavingsAccountsData) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpPutSavingsAccountsSummaryData(req, res) {
  // return res.status(200).json(putInvestmentsSummaryData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { savingsAccountsSummary } = req.body;
    const resPutSavingsAccountsSummaryData = await putSavingsAccountsSummaryData(userId, email, savingsAccountsSummary);

    if (resPutSavingsAccountsSummaryData) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

module.exports = {
  httpGetSavingsAccountsData,
  httpGetSavingsAccountsSummaryData,
  httpPostSavingsAccountCreate,
  httpPutSavingsAccountData,
  httpDeleteSavingsAccount,
  httpPutSavingsAccountsData,
  httpPutSavingsAccountsSummaryData,
}