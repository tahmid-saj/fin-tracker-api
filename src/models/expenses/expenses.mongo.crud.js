const { expensesDatabase, expensesSummaryDatabase } = require("./expenses.mongo")

const { validateGetExpensesSummary } = require("../../utils/validations/expenses/expenses.validations")

// TODO: move validation for crud to validation directory

// expenses crud for mongodb

// user sign in
async function getExpenses(userId, email) {
  const expenses = await expensesDatabase.find({
    userId: userId,
    email: email
  })
  .then(res => {
    const expenses = res.map(expense => {
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
  .catch(error => {
    // TODO: handle error
    console.log(error)
  })

  return {
    expenses: [ ...expenses ]
  }
}

async function getExpensesSummary(userId, email) {
  const expensesSummary = await expensesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then(res => {
    if (validateGetExpensesSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then(res => {
    const summary = {
      currentAllExpensesCost: res.currentAllExpensesCost
    }

    return summary
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  })

  return {
    expensesSummary: expensesSummary
  }
}

// expenses operations
async function createExpenseSummary(userId, email, expenseInfo) {
  const expenseSummaryExists = await expensesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })

  if (!expenseSummaryExists) {
    const newExpenseSummary = new expensesSummaryDatabase({
      userId: userId,
      email, email,
      currentAllExpensesCost: Number(expenseInfo.expenseCost)
    })

    await newExpenseSummary.save()
    console.log("created new expense summary")
  } else {
    await updateExpenseSummary(userId, email, expenseSummaryExists, expenseInfo)
  }
}

async function updateExpenseSummary(userId, email, expenseSummaryExists, expenseInfo) {
  await expensesSummaryDatabase.updateOne({
    userId: userId,
    email: email
  }, {
    $inc: {
      currentAllExpensesCost: Number(expenseInfo.expenseCost)
    }
  })
}

async function createExpense(userId, email, expenseInfo) {
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

async function removeExpense(userId, email, removingExpenseId) {
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
async function updateExpenses(userId, email, expenses) {
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

async function updateExpensesSummary(userId, email, expensesSummary) {
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

module.exports = {
  getExpenses,
  getExpensesSummary,
  createExpense,
  removeExpense,
  updateExpenses,
  updateExpensesSummary,
}