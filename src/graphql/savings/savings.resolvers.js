const savingsModel = require("./savings.model")

module.exports = {
  Query: {
    savingsAccountsByUser: (parent, args) => {
      return savingsModel.savingsAccountsByUser(args.userId, args.email)
    },
    savingsAccountsSummaryByUser: (parent, args) => {
      return savingsModel.savingsAccountsSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserSavingsAccount: (parent, args) => {
      return savingsModel.createUserSavingsAccount(args.userId, args.email, args.savingsAccountInfo)
    },
    updateUserSavingsAccount: (parent, args) => {
      const originalSavingsAccountInfo = args.savingsAccountInfoUpdate.originalSavingsAccountInfo
      const updatedSavingsAccountInfo = args.savingsAccountInfoUpdate.updatedSavingsAccountInfo
      return savingsModel.updateUserSavingsAccount(args.userId, args.email, originalSavingsAccountInfo, updatedSavingsAccountInfo)
    },
    deleteUserSavingsAccount: (parent, args) => {
      return savingsModel.deleteUserSavingsAccount(args.userId, args.email, args.closingSavingsAccountName)
    },
    updateUserSavingsAccounts: (parent, args) => {
      return savingsModel.updateUserSavingsAccounts(args.userId, args.email, args.savingsAccounts)
    },
    updateUserSavingsAccountsSummary: (parent, args) => {
      return savingsModel.updateUserSavingsAccountsSummary(args.userId, args.email, args.savingsAccountsSummary)
    }
  }
}