import express, { Router } from 'express'

import { httpGetSavingsAccountsData, httpGetSavingsAccountsSummaryData,
  httpPostSavingsAccountCreate, httpPutSavingsAccountData, httpDeleteSavingsAccount,
  httpPutSavingsAccountsData, httpPutSavingsAccountsSummaryData } from "./savings.controller.ts"

const savingsRouter: Router = express.Router();

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

export { savingsRouter }