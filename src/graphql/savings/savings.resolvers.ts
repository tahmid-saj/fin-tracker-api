import { SavingsAccount, SavingsAccountsSummary } from "../../models/savings/savings.types";

const savingsModel = require("./savings.model")

type UserArgs = {
  userId: string;
  email: string;
}

module.exports = {
  Query: {
    savingsAccountsByUser: (parent: any, args: UserArgs): SavingsAccount[] => {
      return savingsModel.savingsAccountsByUser(args.userId, args.email)
    },
    savingsAccountsSummaryByUser: (parent: any, args: UserArgs): SavingsAccountsSummary => {
      return savingsModel.savingsAccountsSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserSavingsAccount: (parent: any, args: any): boolean => {
      return savingsModel.createUserSavingsAccount(args.userId, args.email, args.savingsAccountInfo)
    },
    updateUserSavingsAccount: (parent: any, args: any): boolean => {
      const originalSavingsAccountInfo = args.savingsAccountInfoUpdate.originalSavingsAccountInfo
      const updatedSavingsAccountInfo = args.savingsAccountInfoUpdate.updatedSavingsAccountInfo
      return savingsModel.updateUserSavingsAccount(args.userId, args.email, originalSavingsAccountInfo, updatedSavingsAccountInfo)
    },
    deleteUserSavingsAccount: (parent: any, args: any): boolean => {
      return savingsModel.deleteUserSavingsAccount(args.userId, args.email, args.closingSavingsAccountName)
    },
    updateUserSavingsAccounts: (parent: any, args: any): boolean => {
      return savingsModel.updateUserSavingsAccounts(args.userId, args.email, args.savingsAccounts)
    },
    updateUserSavingsAccountsSummary: (parent: any, args: any): boolean => {
      return savingsModel.updateUserSavingsAccountsSummary(args.userId, args.email, args.savingsAccountsSummary)
    }
  }
}