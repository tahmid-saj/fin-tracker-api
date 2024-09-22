
import {
  getBankingAccounts,
  getBankingSummary,
  createBankingAccount,
  addBankingAccountTransaction,
  closeBankingAccount,
  updateBankingAccounts,
  updateBankingSummary
} from "./banking.mongo.crud.ts";

import { UserId, Email, BankingAccountName, BankingAccount, TransactionInfo, BankingSummary } from "./banking.types.ts";

// user signs in
export async function getBankingAccountsData(userid: UserId, email: Email): Promise<any> {
  console.log("Getting banking data");
  return getBankingAccounts(userid, email);
}

export async function getBankingSummaryData(userid: UserId, email: Email): Promise<any> {
  console.log("Getting banking summary data");
  return getBankingSummary(userid, email);
}

// banking operations
export async function postBankingAccountCreate(
  userId: UserId,
  email: Email,
  bankingAccountName: BankingAccountName
): Promise<boolean> {
  await createBankingAccount(userId, email, bankingAccountName);
  console.log("Posting banking account creation");
  return true;
}

export async function postBankingAccountTransaction(
  userId: UserId,
  email: Email,
  transactionInfo: TransactionInfo
): Promise<boolean> {
  await addBankingAccountTransaction(userId, email, transactionInfo);
  console.log("Posting banking account transaction");
  return true;
}

export async function deleteBankingAccount(
  userId: UserId,
  email: Email,
  bankingAccountName: BankingAccountName
): Promise<boolean> {
  await closeBankingAccount(userId, email, bankingAccountName);
  console.log("Deleting banking account");
  return true;
}

// user signed out
export async function putBankingAccountsData(
  userId: UserId,
  email: Email,
  bankingAccounts: BankingAccount[]
): Promise<boolean> {
  await updateBankingAccounts(userId, email, bankingAccounts);
  console.log("Putting banking accounts data");
  return true;
}

export async function putBankingSummaryData(
  userId: UserId,
  email: Email,
  bankingSummary: BankingSummary
): Promise<boolean> {
  await updateBankingSummary(userId, email, bankingSummary);
  console.log("Putting banking summary data");
  return true;
}
