// savings types

export type UserId = string;
export type Email = string;
export type ClosingSavingsAccountName = string;

export type SavingsAccount = {
  savingsAccountName: string;
  initialDeposit: number;
  startDate: string;
  monthlyContribution: number;
  contributionPeriod: number;
  contributionInterval: string;
  apy: number;

  totalSavings: number;
  totalContribution: number;
  totalInterest: number;

  savings: SavingsCalculationRecord[];
}

export type SavingsAccountCalculated = {
  totalSavings: number;
  totalContribution: number;
  totalInterest: number;

  savings: SavingsCalculationRecord[];
}

export type SavingsCalculationRecord = {
  currentDate: string;
  interestEarned: number;
  totalInterestEarned: number;
  balance: number;
}

export type SavingsAccountsSummary = {
  currentAllSavingsAccountsBalance?: number;
  totalAllContribution?: number;
  totalAllInterest?: number;
}

export type SavingsAccountInfo = {
  originalSavingsAccountInfo: SavingsAccount;
  updatedSavingsAccountInfo: SavingsAccount;
}