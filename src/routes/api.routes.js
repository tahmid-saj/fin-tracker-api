const express = require('express');

const { bankingRouter } = require("./banking/banking.router");
const { investmentsRouter } = require("./investments/investments.router");
const { savingsRouter } = require("./savings/savings.router");

const api = express.Router();

api.use("/banking", bankingRouter);
api.use("/investments", investmentsRouter);
api.use("/savings", savingsRouter);

module.exports = {
  api,
};
