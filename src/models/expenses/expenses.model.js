const { expensesDatabase, expensesSummaryDatabase } = require("./expenses.mongo")

const { getExpenses, getExpensesSummary,
  createExpense, removeExpense,
  updateExpenses, updateExpensesSummary
} = require("./expenses.mongo.crud")

// TODO: handle error

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
  await createExpense(userId, email, expenseInfo)
  return true
}

// TODO: need to better manage summary on delete
async function deleteExpense(userId, email, removingExpenseId) {
  await removeExpense(userId, email, removingExpenseId)
  console.log("Deleting expense")
  return true
}

// signed out
async function putExpensesData(userId, email, expenses) {
  await updateExpenses(userId, email, expenses)
  console.log("Putting expenses data")
  return true
}

// TODO: need to better manage summary
async function putExpensesSummaryData(userId, email, expensesSummary) {
  await updateExpensesSummary(userId, email, expensesSummary)
  console.log("Putting expenses summary data")
  return true
}

module.exports = {
  getExpensesData,
  getExpensesSummaryData,
  postExpenseCreate,
  deleteExpense,
  putExpensesData,
  putExpensesSummaryData
}