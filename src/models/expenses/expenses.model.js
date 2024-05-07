const { expensesDatabase, expensesSummaryDatabase } = require("./expenses.mongo")

// signed in
async function getExpensesData(userId, email) {

}

// TODO: need to better manage summary
async function getExpensesSummaryData(userId, email) {

}

// expenses operations
async function postExpenseCreate(userId, email, expenseInfo) {

}

// TODO: need to better manage summary on delete
async function deleteExpense(userId, email, expenseId) {

}

// signed out
async function putExpensesData(userId, email, expenses) {

}

// TODO: need to better manage summary
async function putExpensesSummaryData(userId, email, expensesSummary) {

}

module.exports = {
  getExpensesData,
  getExpensesSummaryData,
  postExpenseCreate,
  deleteExpense,
  putExpensesData,
  putExpensesSummaryData
}