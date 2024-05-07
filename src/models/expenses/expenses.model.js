const { expensesDatabase, expensesSummaryDatabase } = require("./expenses.mongo")

const { getExpenses, getExpensesSummary,
  createExpense, removeExpense,
  updateExpenses, updateExpensesSummary
} = require("./expenses.mongo.crud")

// signed in
async function getExpensesData(userId, email) {
  console.log("Getting expenses data")
  return getExpenses(userId, email)
}

// TODO: need to better manage summary
async function getExpensesSummaryData(userId, email) {
  console.log("Getting expenses summary data")
  return getExpensesSummary(userId, email)
}

// expenses operations
async function postExpenseCreate(userId, email, expenseInfo) {
  console.log("Posting expense creation")
  createExpense(userId, email, expenseInfo)
}

// TODO: need to better manage summary on delete
async function deleteExpense(userId, email, removingExpenseId) {
  removeExpense(userId, email, removingExpenseId)
  console.log("Deleting expense")
}

// signed out
async function putExpensesData(userId, email, expenses) {
  updateExpenses(userId, email, expenses)
  console.log("Putting expenses data")
}

// TODO: need to better manage summary
async function putExpensesSummaryData(userId, email, expensesSummary) {
  updateExpensesSummary(userId, email, expensesSummary)
  console.log("Putting expenses summary data")
}

module.exports = {
  getExpensesData,
  getExpensesSummaryData,
  postExpenseCreate,
  deleteExpense,
  putExpensesData,
  putExpensesSummaryData
}