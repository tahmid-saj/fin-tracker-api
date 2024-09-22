import { getSavingsAccounts, getSavingsAccountsSummary,
  createSavingsAccount, updateSavingsAccount, closeSavingsAccount,
  updateSavingsAccounts, updateSavingsAccountsSummary
} from "../../models/savings/savings.mongo.crud.js"
import { ClosingSavingsAccountName, Email, SavingsAccount, SavingsAccountInfo, SavingsAccountsSummary, UserId } from "../../models/savings/savings.types.js"

export async function savingsAccountsByUser(userId: UserId, email: Email): Promise<SavingsAccount[]> {
  const savingsAccounts = await getSavingsAccounts(userId, email)
  return savingsAccounts.savingsAccounts
}

export async function savingsAccountsSummaryByUser(userId: UserId, email: Email): Promise<SavingsAccountsSummary | void> {
  const savingsAccountsSummary = await getSavingsAccountsSummary(userId, email)
  return savingsAccountsSummary.savingsAccountsSummary
}

export async function createUserSavingsAccount(userId: UserId, email: Email, savingsAccountInfo: SavingsAccount): Promise<boolean> {
  console.log("Posting savings account creation");
  createSavingsAccount(userId, email, savingsAccountInfo);
  return true
}

export async function updateUserSavingsAccount(userId: UserId, email: Email, 
  originalSavingsAccountInfo: SavingsAccount, updatedSavingsAccountInfo: SavingsAccount): Promise<boolean> {
  console.log("Updating savings account");
  updateSavingsAccount(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo);
  return true
}

export async function deleteUserSavingsAccount(userId: UserId, email: Email, closingSavingsAccountName: ClosingSavingsAccountName): Promise<boolean> {
  closeSavingsAccount(userId, email, closingSavingsAccountName);
  console.log("Deleting savings account");
  return true
}

export async function updateUserSavingsAccounts(userId: UserId, email: Email, savingsAccounts: SavingsAccount[]): Promise<boolean> {
  updateSavingsAccounts(userId, email, savingsAccounts);
  console.log("Putting savings accounts data");
  return true
}

export async function updateUserSavingsAccountsSummary(userId: UserId, email: Email, savingsAccountsSummary: SavingsAccountsSummary): Promise<boolean> {
  updateSavingsAccountsSummary(userId, email, savingsAccountsSummary);
  console.log("Putting savings accounts summary data");
  return true
}
