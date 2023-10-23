const express = require('express');

const { httpGetBankingData } = require("./banking.controller");

const bankingRouter = express.Router();

bankingRouter.get("/", httpGetBankingData);

module.exports = {
  bankingRouter,
}
