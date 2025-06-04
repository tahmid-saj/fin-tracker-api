import { Request, Response } from "express"
import { getExpensesData, getExpensesSummaryData,
  postExpenseCreate, deleteExpense,
  putExpensesData, putExpensesSummaryData
} from "../../models/expenses/expenses.model.js"
import { User } from "../../models/users/users.types.js"
import { areExpensesCached, getExpenses, getExpensesSummary, 
  isExpensesSummaryCached, saveExpenses, saveExpensesSummary } from "../../redis/queries/expenses/expenses.queries.js"

// signed in
export async function httpGetExpensesData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const expensesCached = await areExpensesCached(user)
    if (expensesCached) {
      const resExpenses = await getExpenses(user)
      res.status(200).json(resExpenses)
      return
    } else {
      const resGetExpensesData = await getExpensesData(userId!, email!)

      if (resGetExpensesData) {
        await saveExpenses(user, resGetExpensesData.expenses)
        res.status(200).json(resGetExpensesData) 
      }
    }
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
    const user: User = {
      userId: userId!,
      email: email!
    }

    const expensesSummaryCached = await isExpensesSummaryCached(user)
    if (expensesSummaryCached) {
      const resExpensesSummary = await getExpensesSummary(user)
      res.status(200).json(resExpensesSummary)
      return
    } else {
      const resGetExpensesSummaryData = await getExpensesSummaryData(userId!, email!)
  
      if (resGetExpensesSummaryData) {
        await saveExpensesSummary(user, resGetExpensesSummaryData.expensesSummary)
        res.status(200).json(resGetExpensesSummaryData)
      }
    }
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
    const resPostExpenseCreate = await postExpenseCreate(userId!, email!, expenseInfo)

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
    const resDeleteExpense = await deleteExpense(userId!, email!, removingExpenseId)

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
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { expenses } = req.body
    await saveExpenses(user, expenses)
    const resPutExpensesData = await putExpensesData(userId!, email!, expenses)

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
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { expensesSummary } = req.body
    await saveExpensesSummary(user, expensesSummary)
    const resPutExpensesSummaryData = await putExpensesSummaryData(userId!, email!, expensesSummary)
    
    if (resPutExpensesSummaryData) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}