const bankingModel = require("./banking.model")

module.exports = {
  Query: {
    bankingAccountsByUser: (parent, args) => {
      return bankingModel.getBankingAccountsByUser(args.userId, args.email)
    },
    bankingSummaryByUser: (parent, args) => {
      return ""
    }
  }
}