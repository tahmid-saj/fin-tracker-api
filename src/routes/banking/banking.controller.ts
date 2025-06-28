import { Request, Response } from 'express';
import {
  getBankingAccountsData,
  getBankingSummaryData,
  postBankingAccountCreate,
  postBankingAccountTransaction,
  deleteBankingAccount,
  putBankingAccountsData,
  putBankingSummaryData
} from '../../models/banking/banking.model.js';
import { areBankingAccountsCached, getBankingAccounts, getBankingSummary, isBankingSummaryCached, 
  saveBankingAccounts, 
  saveBankingSummary } from '../../redis/queries/banking/banking.queries.js';
import { User } from '../../models/users/users.types.js';

// signed in
export async function httpGetBankingAccountsData(req: Request, res: Response): Promise<any> {
  try {
    const { userid, email } = req.params;
    const user: User = {
      userId: userid!,
      email: email!
    }

    const bankingAccountsCached = await areBankingAccountsCached(user)
    if (bankingAccountsCached) {
      const resBankingAccounts = await getBankingAccounts(user)
      return res.status(200).json(resBankingAccounts)
    } else {
      const resGetBankingAccountsData = await getBankingAccountsData(userid!, email!);
  
      if (resGetBankingAccountsData) {
        await saveBankingAccounts(user, resGetBankingAccountsData.bankingAccounts)
        return res.status(200).json(resGetBankingAccountsData);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpGetBankingSummaryData(req: Request, res: Response): Promise<any> {
  try {
    const { userid, email } = req.params;
    const user: User = {
      userId: userid!,
      email: email!
    }

    const bankingSummaryCached = await isBankingSummaryCached(user)
    if (bankingSummaryCached) {
      const resBankingSummary = await getBankingSummary(user)
      return res.status(200).json(resBankingSummary)
    } else {
      const resGetBankingSummaryData = await getBankingSummaryData(userid!, email!);
      if (resGetBankingSummaryData) {
        await saveBankingSummary(user, resGetBankingSummaryData.bankingSummary)
        return res.status(200).json(resGetBankingSummaryData);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// banking operations
export async function httpPostBankingAccountCreate(req: Request, res: Response): Promise<any> {
  try {
    const bankingAccountName = String(req.body);
    const { userid, email } = req.params;
    const resPostBankingAccountCreate = await postBankingAccountCreate(userid!, email!, bankingAccountName);

    if (resPostBankingAccountCreate) {
      return res.status(200).json({ message: 'Account created' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpPostBankingAccountTransaction(req: Request, res: Response): Promise<any> {
  try {
    const transactionInfo = req.body;
    const { userid, email } = req.params;
    const resPostBankingAccountTransaction = await postBankingAccountTransaction(userid!, email!, transactionInfo);

    if (resPostBankingAccountTransaction) {
      return res.status(200).json({ message: 'Transaction successful' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpDeleteBankingAccount(req: Request, res: Response): Promise<any> {
  try {
    const bankingAccountName = String(req.body);
    const { userid, email } = req.params;
    const resDeleteBankingAccount = await deleteBankingAccount(userid!, email!, bankingAccountName);

    if (resDeleteBankingAccount) {
      return res.status(200).json({ message: 'Account deleted' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// signing out
export async function httpPutBankingAccountsData(req: Request, res: Response): Promise<any> {
  try {
    const { bankingAccounts } = req.body;
    const { userid, email } = req.params;
    const user: User = {
      userId: userid!,
      email: email!
    }

    const resPutBankingAccountsData = await putBankingAccountsData(userid!, email!, bankingAccounts);

    if (resPutBankingAccountsData) {
      await saveBankingAccounts(user, bankingAccounts)
      return res.status(200).json({ message: 'Accounts data updated' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpPutBankingSummaryData(req: Request, res: Response): Promise<any> {
  try {
    const { bankingSummary } = req.body;
    const { userid, email } = req.params;
    const user: User = {
      userId: userid!,
      email: email!
    }

    const resPutBankingSummaryData = await putBankingSummaryData(userid!, email!, bankingSummary);

    if (resPutBankingSummaryData) {
      await saveBankingSummary(user, bankingSummary)
      return res.status(200).json({ message: 'Summary data updated' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
