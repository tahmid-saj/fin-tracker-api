const { getBankingAccountsData, getBankingSummaryData,
  postBankingAccountCreate, postBankingAccountTransaction, deleteBankingAccount,
  putBankingAccountsData, putBankingSummaryData } = require("../../models/banking/banking.model")

// signed in
async function httpGetBankingAccountsData(req, res) {
  return res.status(200).json(await getBankingAccountsData());
};

async function httpGetBankingSummaryData(req, res) {
  return res.status(200).json(await getBankingSummaryData());
};

// activities
async function httpPostBankingAccountCreate(req, res) {
  try {
    const bankingAccountName = String(req.body);
    console.log(bankingAccountName);
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostBankingAccountCreate = await postBankingAccountCreate(userId, email, bankingAccountName);

    if (resPostBankingAccountCreate) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpPostBankingAccountTransaction(req, res) {
  return res.status(200).json(await postBankingAccountTransaction());
};

async function httpDeleteBankingAccount(req, res) {
  return res.status(200).json(await deleteBankingAccount());
};

// signing out
async function httpPutBankingAccountsData(req, res) {
  return res.status(200).json(await putBankingAccountsData());
};

async function httpPutBankingSummaryData(req, res) {
  return res.status(200).json(await putBankingSummaryData());
}

module.exports = {
  httpGetBankingAccountsData,
  httpGetBankingSummaryData,
  httpPostBankingAccountCreate,
  httpPostBankingAccountTransaction,
  httpDeleteBankingAccount,
  httpPutBankingAccountsData,
  httpPutBankingSummaryData
}