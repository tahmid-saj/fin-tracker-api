// validations for expenses

import { ExpensesSummary } from "../../../models/expenses/expenses.types.js"

export const validateGetExpensesSummary = (expensesSummary: ExpensesSummary): boolean => {
  if (!expensesSummary) {
    return true
  }

  return false
}
