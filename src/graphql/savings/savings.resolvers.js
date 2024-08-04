const savingsModel = require("./savings.model")

module.exports = {
  Query: {
    savingsAccountsByUser: (parent, args) => {
      return savingsModel.savingsAccountsByUser(args.userId, args.email)
    },
    savingsAccountsSummaryByUser: (parent, args) => {
      return savingsModel.savingsAccountsSummaryByUser(args.userId, args.email)
    }
  }
}