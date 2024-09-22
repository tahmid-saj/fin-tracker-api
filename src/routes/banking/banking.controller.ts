import { Request, Response } from 'express';
import {
  getBankingAccountsData,
  getBankingSummaryData,
  postBankingAccountCreate,
  postBankingAccountTransaction,
  deleteBankingAccount,
  putBankingAccountsData,
  putBankingSummaryData
} from '../../models/banking/banking.model.ts';

// signed in
export async function httpGetBankingAccountsData(req: Request, res: Response): Promise<void> {
  try {
    const { userid, email } = req.params;
    const resGetBankingAccountsData = await getBankingAccountsData(userid, email);

    if (resGetBankingAccountsData) {
      res.status(200).json(resGetBankingAccountsData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpGetBankingSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const { userid, email } = req.params;
    const resGetBankingSummaryData = await getBankingSummaryData(userid, email);

    if (resGetBankingSummaryData) {
      res.status(200).json(resGetBankingSummaryData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// banking operations
export async function httpPostBankingAccountCreate(req: Request, res: Response): Promise<void> {
  try {
    const bankingAccountName = String(req.body);
    const { userid, email } = req.params;
    const resPostBankingAccountCreate = await postBankingAccountCreate(userid, email, bankingAccountName);

    if (resPostBankingAccountCreate) {
      res.status(200).json({ message: 'Account created' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpPostBankingAccountTransaction(req: Request, res: Response): Promise<void> {
  try {
    const transactionInfo = req.body;
    const { userid, email } = req.params;
    const resPostBankingAccountTransaction = await postBankingAccountTransaction(userid, email, transactionInfo);

    if (resPostBankingAccountTransaction) {
      res.status(200).json({ message: 'Transaction successful' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpDeleteBankingAccount(req: Request, res: Response): Promise<void> {
  try {
    const bankingAccountName = String(req.body);
    const { userid, email } = req.params;
    const resDeleteBankingAccount = await deleteBankingAccount(userid, email, bankingAccountName);

    if (resDeleteBankingAccount) {
      res.status(200).json({ message: 'Account deleted' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// signing out
export async function httpPutBankingAccountsData(req: Request, res: Response): Promise<void> {
  try {
    const { bankingAccounts } = req.body;
    const { userid, email } = req.params;
    const resPutBankingAccountsData = await putBankingAccountsData(userid, email, bankingAccounts);

    if (resPutBankingAccountsData) {
      res.status(200).json({ message: 'Accounts data updated' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpPutBankingSummaryData(req: Request, res: Response): Promise<void> {
  try {
    const { bankingSummary } = req.body;
    const { userid, email } = req.params;
    const resPutBankingSummaryData = await putBankingSummaryData(userid, email, bankingSummary);

    if (resPutBankingSummaryData) {
      res.status(200).json({ message: 'Summary data updated' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
