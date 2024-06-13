const express = require("express")

const { httpGetExpensesData, httpGetExpensesSummaryData,
  httpPostExpenseCreate, httpDeleteExpense,
  httpPutExpensesData, httpPutExpensesSummaryData
 } = require("./expenses.controller")

const expensesRouter = express.Router()

// TODO: move to env variables
// when user is signed in
expensesRouter.get("/expenses/:userid/:email", httpGetExpensesData)
expensesRouter.get("/summary/:userid/:email", httpGetExpensesSummaryData)

// expenses operations
expensesRouter.post("/expenses/:userid/:email", httpPostExpenseCreate)
expensesRouter.delete("/expenses/:userid/:email/remove", httpDeleteExpense)

// user is signing out
expensesRouter.put("/expenses/:userid/:email", httpPutExpensesData)
expensesRouter.put("/summary/:userid/:email", httpPutExpensesSummaryData)

module.exports = {
  expensesRouter
}