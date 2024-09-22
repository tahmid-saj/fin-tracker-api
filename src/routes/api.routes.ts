import { Router } from "express";

const express = require('express');

const { testRouter } = require("./test-route/test-route.router")
const { chatbotRouter } = require("./chatbot/chatbot.router")
const { expensesRouter } = require("./expenses/expenses.router")
const { bankingRouter } = require("./banking/banking.router");
const { investmentsRouter } = require("./investments/investments.router");
const { savingsRouter } = require("./savings/savings.router");
const { insurancesRouter } = require("./insurances/insurances.router");
const { marketDataRouter } = require("./market-data/market-data.router")
const { usefulToolsRouter } = require("./useful-tools/useful-tools.router")

const api: Router = express.Router();

api.use("/testroute", testRouter)
api.use("/chatbot", chatbotRouter)
api.use("/expenses", expensesRouter)
api.use("/banking", bankingRouter);
api.use("/investments", investmentsRouter);
api.use("/savings", savingsRouter);
api.use("/insurances", insurancesRouter);
api.use("/market-data", marketDataRouter)
api.use("/useful-tools", usefulToolsRouter)

module.exports = {
  api,
};
