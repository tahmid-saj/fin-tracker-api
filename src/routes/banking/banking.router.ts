import express, { Router } from 'express';
import {
  httpGetBankingAccountsData,
  httpGetBankingSummaryData,
  httpPostBankingAccountCreate,
  httpPostBankingAccountTransaction,
  httpDeleteBankingAccount,
  httpPutBankingAccountsData,
  httpPutBankingSummaryData
} from './banking.controller.js';

const bankingRouter: Router = express.Router();

// TODO: move to env variables
// when user is signed in, frontend will send this and populate the banking accounts data from mongodb
bankingRouter.get("/accounts/:userid/:email", httpGetBankingAccountsData);
// when user is signed in, frontend will send this and populate the banking summary data from mongodb
bankingRouter.get("/summary/:userid/:email", httpGetBankingSummaryData);

// when user is creating a new bank account, frontend will send this and add the bank account data to mongodb
bankingRouter.post("/accounts/:userid/:email", httpPostBankingAccountCreate);
// when user is creating a transaction, frontend will send this and add the transaction data to mongodb
bankingRouter.post("/accounts/:userid/:email/transaction", httpPostBankingAccountTransaction);
// when user is closing a bank account, frontend will send this and delete the bank account from mongodb
bankingRouter.delete("/accounts/:userid/:email", httpDeleteBankingAccount);

// when user is signed out, frontend will send this request and the updated banking accounts data to mongodb
bankingRouter.put("/accounts/:userid/:email", httpPutBankingAccountsData);
// when user is signed out, frontend will send this request and the updated banking summary data to mongodb
bankingRouter.put("/summary/:userid/:email", httpPutBankingSummaryData);

export { bankingRouter };
