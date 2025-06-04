import { Request, Response } from "express";
import { getInvestmentsData, getInvestmentsSummaryData, 
  postInvestmentCreate, putInvestmentData, deleteInvestment,
  putInvestmentsData, putInvestmentsSummaryData } from "../../models/investments/investments.model.js"
import { User } from "../../models/users/users.types.js";
import { areInvestmentsCached, getInvestments, getInvestmentsSummary, 
  isInvestmentsSummaryCached, saveInvestments, 
  saveInvestmentsSummary } from "../../redis/queries/investments/investments.queries.js";

// signed in
export async function httpGetInvestmentsData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(getInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const investmentsCached = await areInvestmentsCached(user)
    if (investmentsCached) {
      const resInvestments = await getInvestments(user)

      res.status(200).json(resInvestments)
    } else {
      const resGetInvestmentsData = await getInvestmentsData(userId!, email!);
  
      if (resGetInvestmentsData) {
        await saveInvestments(user, resGetInvestmentsData.investments)
        res.status(200).json(resGetInvestmentsData);
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpGetInvestmentsSummaryData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(getInvestmentsSummaryData());
  try {
    const userId = req.params.userId;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const investmentsSummaryCached = await isInvestmentsSummaryCached(user)
    if (investmentsSummaryCached) {
      const resInvestmentsSummary = await getInvestmentsSummary(user)
      res.status(200).json(resInvestmentsSummary)
    } else {
      const resGetInvestmentsSummaryData = await getInvestmentsSummaryData(userId!, email!);

      if (resGetInvestmentsSummaryData) {
        await saveInvestmentsSummary(user, resGetInvestmentsSummaryData.investmentsSummary)
        res.status(200).json(resGetInvestmentsSummaryData)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// investments operations
export async function httpPostInvestmentCreate(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(postInvestmentCreate());
  try {
    const investmentInfo = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostInvestmentCreate = await postInvestmentCreate(userId!, email!, investmentInfo);

    if (resPostInvestmentCreate) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpPutInvestmentData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putInvestmentData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const originalInvestmentInfo = req.body.originalInvestmentInfo;
    const updatedInvestmentInfo = req.body.updatedInvestmentInfo;
    const resPutInvestmentData = await putInvestmentData(userId!, email!, originalInvestmentInfo, updatedInvestmentInfo);

    if (resPutInvestmentData) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpDeleteInvestment(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(deleteInvestment());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const closingInvestmentName = String(req.body);
    const resDeleteInvestment = await deleteInvestment(userId!, email!, closingInvestmentName);

    if (resDeleteInvestment) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// signed out
export async function httpPutInvestmentsData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { investments } = req.body;
    await saveInvestments(user, investments)
    const resPutInvestmentsData = await putInvestmentsData(userId!, email!, investments);

    if (resPutInvestmentsData) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpPutInvestmentsSummaryData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putInvestmentsSummaryData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }
    const { investmentsSummary } = req.body;
    await saveInvestmentsSummary(user, investmentsSummary)
    const resPutInvestmentsSummaryData = await putInvestmentsSummaryData(userId!, email!, investmentsSummary);

    if (resPutInvestmentsSummaryData) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
