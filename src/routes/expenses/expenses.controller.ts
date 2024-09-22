import { Request, Response } from "express"
import { getExpensesData, getExpensesSummaryData,
  postExpenseCreate, deleteExpense,
  putExpensesData, putExpensesSummaryData
} from "../../models/expenses/expenses.model.ts"

// signed in
export async function httpGetExpensesData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const resGetExpensesData = await getExpensesData(userId, email)

    if (resGetExpensesData) res.status(200).json(resGetExpensesData)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpGetExpensesSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const resGetExpensesSummaryData = await getExpensesSummaryData(userId, email)

    if (resGetExpensesSummaryData) res.status(200).json(resGetExpensesSummaryData)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// expenses operations
export async function httpPostExpenseCreate(req: Request, res: Response): Promise<void> {
  try {
    const expenseInfo = req.body
    const userId = req.params.userid
    const email = req.params.email
    const resPostExpenseCreate = await postExpenseCreate(userId, email, expenseInfo)

    if (resPostExpenseCreate) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpDeleteExpense(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const removingExpenseId = Number(String(req.body))
    const resDeleteExpense = await deleteExpense(userId, email, removingExpenseId)

    if (resDeleteExpense) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// signed out
export async function httpPutExpensesData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { expenses } = req.body
    const resPutExpensesData = await putExpensesData(userId, email, expenses)

    if (resPutExpensesData) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpPutExpensesSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { expensesSummary } = req.body
    const resPutExpensesSummaryData = await putExpensesSummaryData(userId, email, expensesSummary)
    
    if (resPutExpensesSummaryData) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}