import { Expense, ExpensesSummary } from "../../models/expenses/expenses.types";

const expensesModel = require("./expenses.model.ts")

type UserArgs = {
  userId: string;
  email: string;
}

module.exports = {
  Query: {
    expensesByUser: (parent: any, args: UserArgs): Expense[] => {
      return expensesModel.getExpensesByUser(args.userId, args.email)
    },
    expensesSummaryByUser: (parent: any, args: UserArgs): ExpensesSummary => {
      return expensesModel.getExpensesSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserExpenses: (parent: any, args: any): boolean => {
      return expensesModel.createUserExpenses(args.userId, args.email, args.expenseInfo)
    },
    deleteUserExpenses: (parent: any, args: any): boolean => {
      return expensesModel.deleteUserExpenses(args.userId, args.email, args.removingExpenseId)
    },
    updateUserExpenses: (parent: any, args: any): boolean => {
      return expensesModel.updateUserExpenses(args.userId, args.email, args.expenses)
    },
    updateUserExpensesSummary: (parent: any, args: any): boolean => {
      return expensesModel.updateUserExpensesSummary(args.userId, args.email, args.expensesSummary)
    }
  }
}