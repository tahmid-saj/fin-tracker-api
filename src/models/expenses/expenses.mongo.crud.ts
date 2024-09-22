import { expensesDatabase, expensesSummaryDatabase } from "./expenses.mongo.js"

import { validateGetExpensesSummary } from "../../utils/validations/expenses/expenses.validations.js"
import { Email, Expense, ExpenseInfo, ExpensesSummary, RemovingExpenseId, UserId } from "./expenses.types.js"
import { Document } from "mongodb"

// TODO: move validation for crud to validation directory

// expenses crud for mongodb

// user sign in
export async function getExpenses(userId: UserId, email: Email): Promise<{ expenses: Expense[] }> {
  const expenses = await expensesDatabase.find({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    const expenses = res.map((expense: Document) => {
      return {
        expenseFor: expense.expenseFor,
        expenseCost: expense.expenseCost,
        expenseDate: expense.expenseDate,
        expenseCategory: expense.expenseCategory,
        expenseId: expense.expenseId
      }
    })

    return expenses
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  })

  return {
    expenses: [ ...expenses ]
  }
}

export async function getExpensesSummary(userId: UserId, email: Email): Promise<{ expensesSummary: ExpensesSummary | void }> {
  const expensesSummary = await expensesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    if (validateGetExpensesSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then((res: Document) => {
    const summary = {
      currentAllExpensesCost: res.currentAllExpensesCost
    }

    return summary
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  })

  return {
    expensesSummary: expensesSummary
  }
}

// expenses operations
export async function createExpenseSummary(userId: UserId, email: Email, expenseInfo: ExpenseInfo): Promise<void> {
  const expenseSummaryExists = await expensesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })

  if (!expenseSummaryExists) {
    const newExpenseSummary = new expensesSummaryDatabase({
      userId: userId,
      email: email,
      currentAllExpensesCost: Number(expenseInfo.expenseCost)
    })

    await newExpenseSummary.save()
    console.log("created new expense summary")
  } else {
    await updateExpenseSummary(userId, email, expenseSummaryExists, expenseInfo)
  }
}

export async function updateExpenseSummary(userId: UserId, email: Email, 
  expenseSummaryExists: any, expenseInfo: ExpenseInfo) {
  await expensesSummaryDatabase.updateOne({
    userId: userId,
    email: email
  }, {
    $inc: {
      currentAllExpensesCost: Number(expenseInfo.expenseCost)
    }
  })
}

export async function createExpense(userId: UserId, email: Email, expenseInfo: ExpenseInfo): Promise<void> {
  const expenseExists = await expensesDatabase.findOne({
    userId: userId,
    email: email,
    expenseId: expenseInfo.expenseId
  })

  if (!expenseExists) {
    const newExpense = new expensesDatabase({
      userId: userId,
      email: email,
      expenseFor: expenseInfo.expenseFor,
      expenseCost: expenseInfo.expenseCost,
      expenseDate: expenseInfo.expenseDate,
      expenseCategory: expenseInfo.expenseCategory,
      expenseId: expenseInfo.expenseId
    })
  
    await newExpense.save()
    console.log("created new expense")
  
    await createExpenseSummary(userId, email, expenseInfo)
  } else {
    return
  }
}

export async function removeExpense(userId: UserId, email: Email, removingExpenseId: RemovingExpenseId): Promise<void> {
  const expenseExists = await expensesDatabase.findOne({
    userId: userId,
    email: email,
    expenseId: removingExpenseId
  })

  if (expenseExists) {
    await expensesSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      $inc: {
        currentAllExpensesCost: -Number(expenseExists.expenseCost),
      }
    })

    await expensesDatabase.deleteOne({
      userId: userId,
      email: email,
      expenseId: removingExpenseId
    })
  } else {
    return
  }
}

// sign out
export async function updateExpenses(userId: UserId, email: Email, expenses: Expense[]): Promise<void> {
  const expensesExist = await expensesDatabase.findOne({
    userId: userId,
    email: email
  })

  if (expensesExist && expenses !== undefined && expenses.length !== 0) {
    expenses.map(async (expense) => {
      await expensesDatabase.updateOne({
        userId: userId,
        email: email,
        expenseId: expense.expenseId
      }, {
        expenseFor: expense.expenseFor,
        expenseCost: expense.expenseCost,
        expenseDate: expense.expenseDate,
        expenseCategory: expense.expenseCategory
      })
    })
  } else {
    return
  }
}

export async function updateExpensesSummary(userId: UserId, email: Email, expensesSummary: ExpensesSummary): Promise<void> {
  const expensesSummaryExists = await expensesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })

  if (expensesSummaryExists && expensesSummary !== undefined && expensesSummary !== Object({})) {
    await expensesSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      currentAllExpensesCost: expensesSummary.currentAllExpensesCost
    })
  } else {
    return
  }
}