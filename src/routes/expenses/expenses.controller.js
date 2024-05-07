const { getExpensesData, getExpensesSummaryData,
  postExpenseCreate, deleteExpense,
  putExpensesData, putExpensesSummaryData
 } = require("../../models/expenses/expenses.model")

// signed in
async function httpGetExpensesData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    console.log(userId)
    const resGetExpensesData = await getExpensesData(userId, email)

    console.log(resGetExpensesData)

    if (resGetExpensesData) return res.status(200).json(resGetExpensesData)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpGetExpensesSummaryData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const resGetExpensesSummaryData = await getExpensesSummaryData(userId, email)

    if (resGetExpensesSummaryData) return res.status(200).json(resGetExpensesSummaryData)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// expenses operations
async function httpPostExpenseCreate(req, res) {
  try {
    const expenseInfo = req.body
    const userId = req.params.userid
    const email = req.params.email
    const resPostExpenseCreate = await postExpenseCreate(userId, email, expenseInfo)

    if (resPostExpenseCreate) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpDeleteExpense(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const removingExpenseId = String(req.body)
    const resDeleteExpense = await deleteExpense(userId, email, removingExpenseId)

    if (resDeleteExpense) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// signed out
async function httpPutExpensesData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { expenses } = req.body
    const resPutExpensesData = await putExpensesData(userId, email, expenses)

    if (resPutExpensesData) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpPutExpensesSummaryData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { expensesSummary } = req.body
    const resPutExpensesSummaryData = await putExpensesSummaryData(userId, email, expensesSummary)
    
    if (resPutExpensesSummaryData) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetExpensesData,
  httpGetExpensesSummaryData,
  httpPostExpenseCreate,
  httpDeleteExpense,
  httpPutExpensesData,
  httpPutExpensesSummaryData,
}