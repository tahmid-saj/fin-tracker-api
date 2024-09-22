import { BankingAccount, BankingSummary } from "../../models/banking/banking.types.js"

const bankingModel = require("./banking.model")

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
    bankingAccountsByUser: (parent: any, args: UserArgs): BankingAccount[] => {
      return bankingModel.getBankingAccountsByUser(args.userId, args.email)
    },
    bankingSummaryByUser: (parent: any, args: UserArgs): BankingSummary => {
      return bankingModel.getBankingSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserBankingAccount: (parent: any, args: UserArgs & { bankingAccountName: string }): boolean => {
      return bankingModel.createUserBankingAccount(args.userId, args.email, args.bankingAccountName)
    },
    updateUserBankingAccountTransaction: (parent: any, args: any): boolean => {
      return bankingModel.updateUserBankingAccountTransaction(args.userId, args.email, args.transactionInfo as TransactionInfo)
    },
    deleteUserBankingAccount: (parent: any, args: UserArgs & { bankingAccountName: string }): boolean => {
      return bankingModel.deleteUserBankingAccount(args.userId, args.email, args.bankingAccountName)
    },
    updateUserBankingAccounts: (parent: any, args: any): boolean => {
      return bankingModel.updateUserBankingAccounts(args.userId, args.email, args.bankingAccounts)
    },
    updateUserBankingSummary: (parent: any, args: any): boolean => {
      return bankingModel.updateUserBankingSummary(args.userId, args.email, args.bankingSummary)
    }
  }
}