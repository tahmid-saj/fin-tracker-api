import express, { Router } from "express"

import { httpGetExpensesData, httpGetExpensesSummaryData,
  httpPostExpenseCreate, httpDeleteExpense,
  httpPutExpensesData, httpPutExpensesSummaryData
} from "./expenses.controller.js"

const expensesRouter: Router = express.Router()

// TODO: move to env variables
// when user is signed in
expensesRouter.get("/expenses/:userid/:email", httpGetExpensesData)
expensesRouter.get("/summary/:userid/:email", httpGetExpensesSummaryData)

// expenses operations
expensesRouter.post("/expenses/:userid/:email", httpPostExpenseCreate)
expensesRouter.delete("/expenses/:userid/:email", httpDeleteExpense)

// user is signing out
expensesRouter.put("/expenses/:userid/:email", httpPutExpensesData)
expensesRouter.put("/summary/:userid/:email", httpPutExpensesSummaryData)

export { expensesRouter }