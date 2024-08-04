const { getExpenses, getExpensesSummary
  
} = require("../../models/expenses/expenses.mongo.crud")

async function getExpensesByUser(userId, email) {
  const expenses = await getExpenses(userId, email)
  return expenses.expenses
}

async function getExpensesSummaryByUser(userId, email) {
  const expensesSummary = await getExpensesSummary(userId, email)
  return expensesSummary.expensesSummary
}

module.exports = {
  getExpensesByUser,
  getExpensesSummaryByUser
}