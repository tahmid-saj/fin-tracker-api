const express = require('express');

const { chatbotRouter } = require("./chatbot/chatbot.router")
const { expensesRouter } = require("./expenses/expenses.router")
const { bankingRouter } = require("./banking/banking.router");
const { investmentsRouter } = require("./investments/investments.router");
const { savingsRouter } = require("./savings/savings.router");

const api = express.Router();

api.use("/chatbot", chatbotRouter)
api.use("/expenses", expensesRouter)
api.use("/banking", bankingRouter);
api.use("/investments", investmentsRouter);
api.use("/savings", savingsRouter);

module.exports = {
  api,
};
