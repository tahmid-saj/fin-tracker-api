import { Router } from "express";

import express from 'express'

import { testRouter } from "./test-route/test-route.router.js"
import { chatbotRouter } from "./chatbot/chatbot.router.js"
import { expensesRouter } from "./expenses/expenses.router.js"
import { bankingRouter } from "./banking/banking.router.js"
import { investmentsRouter } from "./investments/investments.router.js"
import { savingsRouter } from "./savings/savings.router.js"
import { insurancesRouter } from "./insurances/insurances.router.js"
import { marketDataRouter } from "./market-data/market-data.router.js"
import { usefulToolsRouter } from "./useful-tools/useful-tools.router.js"
import { predictionsRouter } from "./predictions/predictions.router.js";

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
api.use("/market-predictions", predictionsRouter)

export { api }