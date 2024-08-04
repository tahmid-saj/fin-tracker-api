const { getExpenses, getExpensesSummary,
  createExpense, removeExpense, 
  updateExpenses, updateExpensesSummary
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

async function updateUserExpenses(userId, email, expenses) {
  await updateExpenses(userId, email, expenses)
  console.log("Putting expenses data")
  return true
}

async function updateUserExpensesSummary(userId, email, expensesSummary) {
  await updateExpensesSummary(userId, email, expensesSummary)
  console.log("Putting expenses summary data")
  return true
}

module.exports = {
  getExpensesByUser,
  getExpensesSummaryByUser,
  createUserExpenses,
  deleteUserExpenses,
  updateUserExpenses,
  updateUserExpensesSummary
}