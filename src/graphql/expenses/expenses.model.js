const { getExpenses, getExpensesSummary,
  createExpense, removeExpense
  
} = require("../../models/expenses/expenses.mongo.crud")

async function getExpensesByUser(userId, email) {
  const expenses = await getExpenses(userId, email)
  return expenses.expenses
}

async function getExpensesSummaryByUser(userId, email) {
  const expensesSummary = await getExpensesSummary(userId, email)
  return expensesSummary.expensesSummary
}

async function createUserExpenses(userId, email, expenseInfo) {
  console.log("Posting expense creation")
  await createExpense(userId, email, expenseInfo)
  return true
}

async function deleteUserExpenses(userId, email, removingExpenseId) {
  await removeExpense(userId, email, removingExpenseId)
  console.log("Deleting expense")
  return true
}

module.exports = {
  getExpensesByUser,
  getExpensesSummaryByUser,
  createUserExpenses,
  deleteUserExpenses
}