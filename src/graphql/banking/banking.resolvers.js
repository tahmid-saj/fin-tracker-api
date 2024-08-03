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
      const transactionInfo = {
        bankingAccountName: args.bankingAccountName,
        amount: args.amount,
        type: args.type,
        reason: args.reason,
        transferTo: args.transferTo,
        addToExpenses: args.addToExpenses
      }

      return bankingModel.updateUserBankingAccountTransaction(args.userId, args.email, transactionInfo)
    }
  }
}