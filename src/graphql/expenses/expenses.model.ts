import { getExpenses, getExpensesSummary,
  createExpense, removeExpense, 
  updateExpenses, updateExpensesSummary
} from "../../models/expenses/expenses.mongo.crud.ts"
import { Email, Expense, ExpenseInfo, ExpensesSummary, RemovingExpenseId, UserId } from "../../models/expenses/expenses.types.ts"

export async function getExpensesByUser(userId: UserId, email: Email): Promise<Expense[]> {
  const expenses = await getExpenses(userId, email)
  return expenses.expenses
}

export async function getExpensesSummaryByUser(userId: UserId, email: Email): Promise<ExpensesSummary | void> {
  const expensesSummary = await getExpensesSummary(userId, email)
  return expensesSummary.expensesSummary
}

export async function createUserExpenses(userId: UserId, email: Email, expenseInfo: ExpenseInfo): Promise<boolean> {
  console.log("Posting expense creation")
  await createExpense(userId, email, expenseInfo)
  return true
}

export async function deleteUserExpenses(userId: UserId, email: Email, removingExpenseId: RemovingExpenseId): Promise<boolean> {
  await removeExpense(userId, email, removingExpenseId)
  console.log("Deleting expense")
  return true
}

export async function updateUserExpenses(userId: UserId, email: Email, expenses: Expense[]): Promise<boolean> {
  await updateExpenses(userId, email, expenses)
  console.log("Putting expenses data")
  return true
}

export async function updateUserExpensesSummary(userId: UserId, email: Email, expensesSummary: ExpensesSummary): Promise<boolean> {
  await updateExpensesSummary(userId, email, expensesSummary)
  console.log("Putting expenses summary data")
  return true
}
