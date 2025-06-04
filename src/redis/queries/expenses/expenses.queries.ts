import { Expense, ExpensesSummary } from "../../../models/expenses/expenses.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { expensesKey, expensesSummaryCategoriesKey, 
  expensesSummaryKey, expensesSummaryPastMonthExpensesKey } from "./expenses.keys.js";

// helper functions
export const serializeExpenses = (expenses: Expense[]) => {
  return expenses.map((expense) => {
    return `for=${expense.expenseFor}!cost=${expense.expenseCost}!date=${expense.expenseDate}!category=${expense.expenseCategory}!id=${expense.expenseId}`
  })
}

export const deserializeExpenses = (expenses: string[]): { expenses: Expense[] } => {
  return {
    expenses: expenses.map((expense) => {
      const data = expense.split("!")
      const expenseFor = data[0]?.split("=")[1]!
      const expenseCost = Number(data[1]?.split("=")[1])!
      const expenseDate = data[2]?.split("=")[1]!
      const expenseCategory = data[3]?.split("=")[1]!
      const expenseId = Number(data[4]?.split("=")[1])!

      return {
        expenseFor, expenseCost, expenseDate, expenseCategory, expenseId
      }
  })}
}

export const serializeExpensesSummary = (expensesSummary: ExpensesSummary) => {
  return {
    currentAllExpensesCost: expensesSummary.currentAllExpensesCost,
    currentAllExpensesCategories: expensesSummary.currentAllExpensesCategories ? expensesSummary.currentAllExpensesCategories : [],
    pastMonthAllExpensesCost: expensesSummary.pastMonthAllExpensesCost ? expensesSummary.pastMonthAllExpensesCost : 0,
    pastMonthExpenses: expensesSummary.pastMonthExpenses ? serializeExpenses(expensesSummary.pastMonthExpenses!) : []
  }
}

export const deserializeExpensesSummary = (expensesSummary: { [key: string]: string },
  currentAllExpensesCategories: string[], pastMonthExpenses: string[]) => {

  let resExpensesSummary: ExpensesSummary = {
    currentAllExpensesCost: Number(expensesSummary.currentAllExpensesCost),
    pastMonthAllExpensesCost: Number(expensesSummary.pastMonthAllExpensesCost)
  }

  const resPastMonthExpenses = deserializeExpenses(pastMonthExpenses)

  return {
    expensesSummary: {
      currentAllExpensesCost: resExpensesSummary.currentAllExpensesCost,
      currentAllExpensesCategories: currentAllExpensesCategories,
      pastMonthAllExpensesCost: resExpensesSummary.pastMonthAllExpensesCost,
      pastMonthExpenses: resPastMonthExpenses
    }
  }
}

export const areExpensesCached = async (user: User) => {
  return await redisClient.exists(expensesKey(user))
}

export const isExpensesSummaryCached = async (user: User) => {
  return await redisClient.exists(expensesSummaryKey(user))
}

export const getExpenses = async (user: User) => {
  const resExpenses = await redisClient.lRange(expensesKey(user), 0, -1)
  return deserializeExpenses(resExpenses)
}

export const getExpensesSummary = async (user: User) => {
  const resExpensesSummary = await redisClient.hGetAll(expensesSummaryKey(user))
  const resExpensesSummaryCategories = await redisClient.lRange(expensesSummaryCategoriesKey(user), 0, -1)
  const resExpensesSummaryPastMonth = await redisClient.lRange(expensesSummaryPastMonthExpensesKey(user), 0, -1)
  return deserializeExpensesSummary(resExpensesSummary, resExpensesSummaryCategories, resExpensesSummaryPastMonth)
}

export const saveExpenses = async (user: User, expenses: Expense[]) => {
  // save the expenses
  await redisClient.rPush(expensesKey(user), serializeExpenses(expenses))
}

export const saveExpensesSummary = async (user: User, expensesSummary: ExpensesSummary) => {
  const serializedExpensesSummary = serializeExpensesSummary(expensesSummary)

  // save the expenses in a hash
  await redisClient.hSet(expensesSummaryKey(user), {
    currentAllExpensesCost: serializedExpensesSummary.currentAllExpensesCost!,
    pastMonthAllExpensesCost: serializedExpensesSummary.pastMonthAllExpensesCost!
  })

  // save the expenses categories and past month expenses in a list
  if (serializedExpensesSummary.currentAllExpensesCategories?.length !== 0) {
    await redisClient.rPush(expensesSummaryCategoriesKey(user), 
      serializedExpensesSummary.currentAllExpensesCategories)
  }
  
  if (serializedExpensesSummary.pastMonthExpenses?.length !== 0) {
    await redisClient.rPush(expensesSummaryPastMonthExpensesKey(user),
      serializedExpensesSummary.pastMonthExpenses)
  }
}