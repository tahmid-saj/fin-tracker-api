const { getBankingAccountsData, getBankingSummaryData,
  postBankingAccountCreate, postBankingAccountTransaction, deleteBankingAccount,
  putBankingAccountsData, putBankingSummaryData } = require("../../models/banking/banking.model")

async function httpGetBankingAccountsData(req, res) {
  return res.status(200).json(await getBankingAccountsData());
};

async function httpGetBankingSummaryData(req, res) {
  return res.status(200).json(await getBankingSummaryData());
};

async function httpPostBankingAccountCreate(req, res) {
  return res.status(200).json(await postBankingAccountCreate()); 
};

async function httpPostBankingAccountTransaction(req, res) {
  return res.status(200).json(await postBankingAccountTransaction());
};

async function httpDeleteBankingAccount(req, res) {
  return res.status(200).json(await deleteBankingAccount());
};

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