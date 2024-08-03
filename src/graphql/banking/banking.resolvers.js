const bankingModel = require("./banking.model")

module.exports = {
  Query: {
    bankingAccountsByUser: (parent, args) => {
      return bankingModel.getBankingAccountsByUser(args.userId, args.email)
    },
    bankingSummaryByUser: (parent, args) => {
      return bankingModel.getBankingSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserBankingAccount: (parent, args) => {
      return bankingModel.createUserBankingAccount(args.userId, args.email, args.bankingAccountName)
    },
    updateUserBankingAccountTransaction: (parent, args) => {
      return bankingModel.updateUserBankingAccountTransaction(args.userId, args.email, args.transactionInfo)
    },
    deleteUserBankingAccount: (parent, args) => {
      return bankingModel.deleteUserBankingAccount(args.userId, args.email, args.bankingAccountName)
    },
    updateUserBankingAccounts: (parent, args) => {
      return bankingModel.updateUserBankingAccounts(args.userId, args.email, args.bankingAccounts)
    },
    updateUserBankingSummary: (parent, args) => {
      return bankingModel.updateUserBankingSummary(args.userId, args.email, args.bankingSummary)
    }
  }
}