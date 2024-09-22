import { getBankingAccounts, getBankingSummary,
  createBankingAccount, addBankingAccountTransaction, closeBankingAccount,
  updateBankingAccounts, updateBankingSummary
} from "../../models/banking/banking.mongo.crud.ts"
import { BankingAccount, BankingAccountName, BankingSummary, Email, TransactionInfo, UserId } from "../../models/banking/banking.types.ts"

export async function getBankingAccountsByUser(userId: UserId, email: Email): Promise<BankingAccount[]> {
  const bankingAccounts = await getBankingAccounts(userId, email)
  return bankingAccounts.bankingAccounts
}

export async function getBankingSummaryByUser(userId: UserId, email: Email): Promise<BankingSummary | void> {
  const bankingSummary = await getBankingSummary(userId, email)
  return bankingSummary.bankingSummary
}

export async function createUserBankingAccount(userId: UserId, email: Email, bankingAccountName: BankingAccountName): Promise<boolean> {
  createBankingAccount(userId, email, bankingAccountName)
  console.log("Posting banking account creation");
  return true
}

export async function updateUserBankingAccountTransaction(userId: UserId, email: Email, transactionInfo: TransactionInfo): Promise<Boolean> {
  addBankingAccountTransaction(userId, email, transactionInfo)
  console.log("Posting banking account transaction");
  return true
}

export async function deleteUserBankingAccount(userId: UserId, email: Email, bankingAccountName: BankingAccountName): Promise<Boolean> {
  closeBankingAccount(userId, email, bankingAccountName);
  console.log("Deleting banking account");
  return true
}

export async function updateUserBankingAccounts(userId: UserId, email: Email, bankingAccounts: BankingAccount[]): Promise<boolean> {
  updateBankingAccounts(userId, email, bankingAccounts);
  console.log("Putting banking accounts data");
  return true
}

export async function updateUserBankingSummary(userId: UserId, email: Email, bankingSummary: BankingSummary): Promise<boolean> {
  updateBankingSummary(userId, email, bankingSummary);
  console.log("Putting banking summary data");
  return true
}