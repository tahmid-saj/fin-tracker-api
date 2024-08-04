const expensesModel = require("./expenses.model")

module.exports = {
  Query: {
    expensesByUser: (parent, args) => {
      return expensesModel.getExpensesByUser(args.userId, args.email)
    },
    expensesSummaryByUser: (parent, args) => {
      return expensesModel.getExpensesSummaryByUser(args.userId, args.email)
    }
  }
}