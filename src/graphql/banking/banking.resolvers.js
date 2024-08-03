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
    }
  }
}