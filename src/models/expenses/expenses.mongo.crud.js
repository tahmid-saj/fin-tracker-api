const { expensesDatabase, expensesSummaryDatabase } = require("./expenses.mongo")

const { validateGetExpensesSummary } = require("../../utils/validations/expenses/expenses.validations")

// expenses crud for mongodb

// user sign in
async function getExpenses(userId, email) {

}

async function getExpensesSummary(userId, email) {

}

// expenses operations
async function createExpenseSummary(userId, email, expenseInfo) {

}

async function createExpense(userId, email, expenseInfo) {

}

async function removeExpense(userId, email, removingExpenseId) {

}

// sign out
async function updateExpenses(userId, email, expenses) {

}

async function updateExpensesSummary(userId, email, expensesSummary) {

}

module.exports = {
  getExpenses,
  getExpensesSummary,
  createExpense,
  removeExpense,
  updateExpenses,
  updateExpensesSummary,
}