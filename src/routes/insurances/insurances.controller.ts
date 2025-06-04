import { Request, Response } from "express"
import { getInsurancesData, getInsurancesSummaryData,
  postInsuranceCreate, deleteInsurance,
  putInsurancesData, putInsurancesSummaryData
} from "../../models/insurances/insurances.model.js"
import { User } from "../../models/users/users.types.js"
import { areInsurancesCached, getInsurances, getInsurancesSummary, isInsurancesSummaryCached, saveInsurances, saveInsurancesSummary } from "../../redis/queries/insurances/insurances.queries.js"


// signed in
export async function httpGetInsurancesData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const insurancesCached = await areInsurancesCached(user)
    if (insurancesCached) {
      const resInsurances = await getInsurances(user)
      res.status(200).json(resInsurances)
    } else {
      const resGetInsurancesData = await getInsurancesData(userId!, email!)
  
      if (resGetInsurancesData) {
        await saveInsurances(user, resGetInsurancesData.insurances)
        res.status(200).json(resGetInsurancesData)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpGetInsurancesSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const insurancesSummaryCached = await isInsurancesSummaryCached(user)
    if (insurancesSummaryCached) {
      const resInsurancesSummary = await getInsurancesSummary(user)
      res.status(200).json(resInsurancesSummary.insurancesSummary)
    } else {
      const resGetInsurancesSummaryData = await getInsurancesSummaryData(userId!, email!)
  
      if (resGetInsurancesSummaryData) {
        await saveInsurancesSummary(user, resGetInsurancesSummaryData)
        res.status(200).json(resGetInsurancesSummaryData)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// insurances operations
export async function httpPostInsurancesCreate(req: Request, res: Response): Promise<void> {
  try {
    const insuranceInfo = req.body
    const userId = req.params.userid
    const email = req.params.email
    const resPostInsuranceCreate = await postInsuranceCreate(userId!, email!, insuranceInfo)

    if (resPostInsuranceCreate) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpDeleteInsurance(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const removingInsuranceFor = String(req.body)
    const resDeleteInsurance = await deleteInsurance(userId!, email!, removingInsuranceFor)

    if (resDeleteInsurance) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// signed out
export async function httpPutInsurancesData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { insurances } = req.body
    await saveInsurances(user, insurances)
    const resPutInsurancesData = await putInsurancesData(userId!, email!, insurances)

    if (resPutInsurancesData) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpPutInsurancesSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { insurancesSummary } = req.body
    await saveInsurancesSummary(user, insurancesSummary)
    const resPutInsurancesSummaryData = await putInsurancesSummaryData(userId!, email!, insurancesSummary)
    
    if (resPutInsurancesSummaryData) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
