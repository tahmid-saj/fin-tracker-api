const express = require('express');

const { bankingRouter } = require("./banking/banking.router");

const api = express.Router();

api.use("/banking", bankingRouter);

module.exports = {
  api,
};
