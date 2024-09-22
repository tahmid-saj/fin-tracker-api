// banking types

export type UserId = string;
export type Email = string;
export type BankingAccountName = string;

export type BankingAccount = {
  name: string;
  currentBalance: number;
  totalIn: number;
  totalOut: number;
  transactions?: Transaction[];
}

export type Transaction = {
  amount: number;
  type: string;
  reason?: string;
  addToExpenses?: boolean;
}

export type TransactionInfo = {
  bankingAccountName?: string;
  name?: string;
  amount: number;
  type: string;
  reason?: string;
  transferTo?: string;
  addToExpenses?: boolean;
}

export type BankingSummary = {
  [x: string]: any;
  currentAllBankingBalance?: number;
  totalAllBankingIn?: number;
  totalAllBankingOut?: number;
}