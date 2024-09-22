
import { getSavingsAccounts, getSavingsAccountsSummary,
  createSavingsAccount, closeSavingsAccount, updateSavingsAccount,
  updateSavingsAccounts, updateSavingsAccountsSummary } from "./savings.mongo.crud.js"
import { ClosingSavingsAccountName, Email, SavingsAccount, SavingsAccountsSummary, UserId } from "./savings.types.js";

// signed in
export async function getSavingsAccountsData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting savings accounts data");
  return getSavingsAccounts(userId, email)
};

// TODO: need to better manage summary
export async function getSavingsAccountsSummaryData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting savings accounts summary data");
  return getSavingsAccountsSummary(userId, email);
};

// savings operations
export async function postSavingsAccountCreate(userId: UserId, email: Email, savingsAccountInfo: SavingsAccount): Promise<boolean> {
  console.log("Posting savings account creation");
  createSavingsAccount(userId, email, savingsAccountInfo);
  return true
};

// TODO: need to better manage summary on updating data
export async function putSavingsAccountData(userId: UserId, email: Email, 
  originalSavingsAccountInfo: SavingsAccount, updatedSavingsAccountInfo: SavingsAccount): Promise<boolean> {
  console.log("Updating savings account");
  updateSavingsAccount(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo);
  return true
};

// TODO: need to better manage summary on delete
export async function deleteSavingsAccount(userId: UserId, email: Email, closingSavingsAccountName: ClosingSavingsAccountName): Promise<boolean> {
  closeSavingsAccount(userId, email, closingSavingsAccountName);
  console.log("Deleting savings account");
  return true
};

// signed out
export async function putSavingsAccountsData(userId: UserId, email: Email, savingsAccounts: SavingsAccount[]): Promise<boolean> {
  updateSavingsAccounts(userId, email, savingsAccounts);
  console.log("Putting savings accounts data");
  return true
};

// TODO: need to better manage summary
export async function putSavingsAccountsSummaryData(userId: UserId, email: Email, savingsAccountsSummary: SavingsAccountsSummary): Promise<boolean> {
  updateSavingsAccountsSummary(userId, email, savingsAccountsSummary);
  console.log("Putting savings accounts summary data");
  return true
};