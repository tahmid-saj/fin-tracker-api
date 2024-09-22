import { Request, Response } from "express";
import { getSavingsAccountsData, getSavingsAccountsSummaryData, 
  postSavingsAccountCreate, putSavingsAccountData, deleteSavingsAccount,
  putSavingsAccountsData, putSavingsAccountsSummaryData } from "../../models/savings/savings.model.js"

// signed in
export async function httpGetSavingsAccountsData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(getInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetSavingsAccountsData = await getSavingsAccountsData(userId!, email!);

    if (resGetSavingsAccountsData) res.status(200).json(resGetSavingsAccountsData);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpGetSavingsAccountsSummaryData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(getInvestmentsSummaryData());
  try {
    const userId = req.params.userId;
    const email = req.params.email;
    const resGetSavingsAccountsSummaryData = await getSavingsAccountsSummaryData(userId!, email!);

    if (resGetSavingsAccountsSummaryData) res.status(200).json(resGetSavingsAccountsSummaryData);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// savings operations
export async function httpPostSavingsAccountCreate(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(postInvestmentCreate());
  try {
    const savingsAccountInfo = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostSavingsAccountCreate = await postSavingsAccountCreate(userId!, email!, savingsAccountInfo);

    if (resPostSavingsAccountCreate) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpPutSavingsAccountData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putInvestmentData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const originalSavingsAccountInfo = req.body.originalSavingsAccountInfo;
    const updatedSavingsAccountInfo = req.body.updatedSavingsAccountInfo;
    const resPutSavingsAccountData = await putSavingsAccountData(userId!, email!, originalSavingsAccountInfo, updatedSavingsAccountInfo);

    if (resPutSavingsAccountData) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpDeleteSavingsAccount(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(deleteInvestment());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const closingSavingsAccountName = String(req.body);
    const resDeleteSavingsAccount = await deleteSavingsAccount(userId!, email!, closingSavingsAccountName);

    if (resDeleteSavingsAccount) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// signed out
export async function httpPutSavingsAccountsData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putInvestmentsData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { savingsAccounts } = req.body;
    const resPutSavingsAccountsData = await putSavingsAccountsData(userId!, email!, savingsAccounts);

    if (resPutSavingsAccountsData) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpPutSavingsAccountsSummaryData(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putInvestmentsSummaryData());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { savingsAccountsSummary } = req.body;
    const resPutSavingsAccountsSummaryData = await putSavingsAccountsSummaryData(userId!, email!, savingsAccountsSummary);

    if (resPutSavingsAccountsSummaryData) res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
