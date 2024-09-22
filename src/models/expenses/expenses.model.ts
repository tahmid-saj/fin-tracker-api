
import { UserId, Email, RemovingExpenseId, Expense, ExpensesSummary, ExpenseInfo } from "./expenses.types.ts"

import { getExpenses, getExpensesSummary,
  createExpense, removeExpense,
  updateExpenses, updateExpensesSummary
} from "./expenses.mongo.crud.ts"

// TODO: handle error

// signed in
export async function getExpensesData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting expenses data")
  return getExpenses(userId, email)
}

// TODO: need to better manage summary
export async function getExpensesSummaryData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting expenses summary data")
  return getExpensesSummary(userId, email)
}

// expenses operations
export async function postExpenseCreate(userId: UserId, email: Email, expenseInfo: ExpenseInfo): Promise<boolean> {
  console.log("Posting expense creation")
  await createExpense(userId, email, expenseInfo)
  return true
}

// TODO: need to better manage summary on delete
export async function deleteExpense(userId: UserId, email: Email, removingExpenseId: RemovingExpenseId): Promise<boolean> {
  await removeExpense(userId, email, removingExpenseId)
  console.log("Deleting expense")
  return true
}

// signed out
export async function putExpensesData(userId: UserId, email: Email, expenses: Expense[]): Promise<boolean> {
  await updateExpenses(userId, email, expenses)
  console.log("Putting expenses data")
  return true
}

// TODO: need to better manage summary
export async function putExpensesSummaryData(userId: UserId, email: Email, expensesSummary: ExpensesSummary): Promise<boolean> {
  await updateExpensesSummary(userId, email, expensesSummary)
  console.log("Putting expenses summary data")
  return true
}