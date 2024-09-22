import { Request, Response } from "express"
import { getInsurancesData, getInsurancesSummaryData,
  postInsuranceCreate, deleteInsurance,
  putInsurancesData, putInsurancesSummaryData
} from "../../models/insurances/insurances.model"


// signed in
async function httpGetInsurancesData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const resGetInsurancesData = await getInsurancesData(userId, email)

    if (resGetInsurancesData) res.status(200).json(resGetInsurancesData)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function httpGetInsurancesSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const resGetInsurancesSummaryData = await getInsurancesSummaryData(userId, email)

    if (resGetInsurancesSummaryData) res.status(200).json(resGetInsurancesSummaryData)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// insurances operations
async function httpPostInsurancesCreate(req: Request, res: Response): Promise<void> {
  try {
    const insuranceInfo = req.body
    const userId = req.params.userid
    const email = req.params.email
    const resPostInsuranceCreate = await postInsuranceCreate(userId, email, insuranceInfo)

    if (resPostInsuranceCreate) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function httpDeleteInsurance(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const removingInsuranceFor = String(req.body)
    const resDeleteInsurance = await deleteInsurance(userId, email, removingInsuranceFor)

    if (resDeleteInsurance) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// signed out
async function httpPutInsurancesData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { insurances } = req.body
    const resPutInsurancesData = await putInsurancesData(userId, email, insurances)

    if (resPutInsurancesData) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function httpPutInsurancesSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { insurancesSummary } = req.body
    const resPutInsurancesSummaryData = await putInsurancesSummaryData(userId, email, insurancesSummary)
    
    if (resPutInsurancesSummaryData) res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  httpGetInsurancesData,
  httpGetInsurancesSummaryData,
  httpPostInsurancesCreate,
  httpDeleteInsurance,
  httpPutInsurancesData,
  httpPutInsurancesSummaryData
}