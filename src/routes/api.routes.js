const express = require('express');

const { bankingRouter } = require("./banking/banking.router");
const { investmentsRouter } = require("./investments/investments.router");

const api = express.Router();

api.use("/banking", bankingRouter);
api.use("/investments", investmentsRouter)

module.exports = {
  api,
};
