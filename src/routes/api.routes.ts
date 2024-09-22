import { Router } from "express";

import express from 'express'

import { testRouter } from "./test-route/test-route.router.ts"
import { chatbotRouter } from "./chatbot/chatbot.router.ts"
import { expensesRouter } from "./expenses/expenses.router.ts"
import { bankingRouter } from "./banking/banking.router.ts"
import { investmentsRouter } from "./investments/investments.router.ts"
import { savingsRouter } from "./savings/savings.router.ts"
import { insurancesRouter } from "./insurances/insurances.router.ts"
import { marketDataRouter } from "./market-data/market-data.router.ts"
import { usefulToolsRouter } from "./useful-tools/useful-tools.router.ts"

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

export { api }