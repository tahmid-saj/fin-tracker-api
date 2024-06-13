const express = require('express');

const { httpGetSavingsAccountsData, httpGetSavingsAccountsSummaryData,
  httpPostSavingsAccountCreate, httpPutSavingsAccountData, httpDeleteSavingsAccount,
  httpPutSavingsAccountsData, httpPutSavingsAccountsSummaryData } = require("./savings.controller");

const savingsRouter = express.Router();

// TODO: move to env variables
// when user is signed in
savingsRouter.get("/accounts/:userid/:email", httpGetSavingsAccountsData);
savingsRouter.get("/summary/:userid/:email", httpGetSavingsAccountsSummaryData);

// investments operations
savingsRouter.post("/accounts/:userid/:email", httpPostSavingsAccountCreate);
savingsRouter.put("/accounts/:userid/:email", httpPutSavingsAccountData);
savingsRouter.delete("/accounts/:userid/:email", httpDeleteSavingsAccount);

// user is signing out
savingsRouter.put("/accounts/:userid/:email", httpPutSavingsAccountsData);
savingsRouter.put("/summary/:userid/:email", httpPutSavingsAccountsSummaryData);

module.exports = {
  savingsRouter,
}