import { Request, Response } from "express";
import { getInvestmentsData, getInvestmentsSummaryData, 
  postInvestmentCreate, putInvestmentData, deleteInvestment,
  putInvestmentsData, putInvestmentsSummaryData } from "../../models/investments/investments.model.ts"

// signed in
export async function httpGetInvestmentsData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(getInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetInvestmentsData = await getInvestmentsData(userId, email);

    if (resGetInvestmentsData) res.status(200).json(resGetInvestmentsData);
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
    const resGetInvestmentsSummaryData = await getInvestmentsSummaryData(userId, email);

    if (resGetInvestmentsSummaryData) res.status(200).json(resGetInvestmentsSummaryData);
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
    const resPostInvestmentCreate = await postInvestmentCreate(userId, email, investmentInfo);

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
    const resPutInvestmentData = await putInvestmentData(userId, email, originalInvestmentInfo, updatedInvestmentInfo);

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
    const resDeleteInvestment = await deleteInvestment(userId, email, closingInvestmentName);

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
    const { investments } = req.body;
    const resPutInvestmentsData = await putInvestmentsData(userId, email, investments);

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
    const { investmentsSummary } = req.body;
    const resPutInvestmentsSummaryData = await putInvestmentsSummaryData(userId, email, investmentsSummary);

    if (resPutInvestmentsSummaryData) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
