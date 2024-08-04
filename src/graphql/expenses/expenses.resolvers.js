const expensesModel = require("./expenses.model")

module.exports = {
  Query: {
    expensesByUser: (parent, args) => {
      return expensesModel.getExpensesByUser(args.userId, args.email)
    },
    expensesSummaryByUser: (parent, args) => {
      return expensesModel.getExpensesSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserExpenses: (parent, args) => {
      return expensesModel.createUserExpenses(args.userId, args.email, args.expenseInfo)
    },
    deleteUserExpenses: (parent, args) => {
      return expensesModel.deleteUserExpenses(args.userId, args.email, args.removingExpenseId)
    },
    updateUserExpenses: (parent, args) => {
      return expensesModel.updateUserExpenses(args.userId, args.email, args.expenses)
    },
    updateUserExpensesSummary: (parent, args) => {
      return expensesModel.updateUserExpensesSummary(args.userId, args.email, args.expensesSummary)
    }
  }
}