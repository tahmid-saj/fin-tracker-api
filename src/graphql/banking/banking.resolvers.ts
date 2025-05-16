import { BankingAccount, BankingSummary } from "../../models/banking/banking.types.js"

import { getBankingAccountsByUser, getBankingSummaryByUser, 
  createUserBankingAccount, updateUserBankingAccountTransaction, 
  deleteUserBankingAccount, updateUserBankingAccounts, updateUserBankingSummary } 
from "./banking.model"

type UserArgs = {
  userId: string;
  email: string;
}

type TransactionInfo = {
  bankingAccountName: string;
  amount: number;
  type: string;
  reason: string;
  transferTo: string;
  addToExpenses: boolean;
}

module.exports = {
  Query: {
    bankingAccountsByUser: (parent: any, args: UserArgs): Promise<BankingAccount[]> => {
      return getBankingAccountsByUser(args.userId, args.email)
    },
    bankingSummaryByUser: (parent: any, args: UserArgs): Promise<BankingSummary | void> => {
      return getBankingSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserBankingAccount: (parent: any, args: UserArgs & { bankingAccountName: string }): Promise<boolean> => {
      return createUserBankingAccount(args.userId, args.email, args.bankingAccountName)
    },
    updateUserBankingAccountTransaction: (parent: any, args: any): Promise<boolean> => {
      return updateUserBankingAccountTransaction(args.userId, args.email, args.transactionInfo as TransactionInfo)
    },
    deleteUserBankingAccount: (parent: any, args: UserArgs & { bankingAccountName: string }): Promise<boolean> => {
      return deleteUserBankingAccount(args.userId, args.email, args.bankingAccountName)
    },
    updateUserBankingAccounts: (parent: any, args: any): Promise<boolean> => {
      return updateUserBankingAccounts(args.userId, args.email, args.bankingAccounts)
    },
    updateUserBankingSummary: (parent: any, args: any): Promise<boolean> => {
      return updateUserBankingSummary(args.userId, args.email, args.bankingSummary)
    }
  }
}