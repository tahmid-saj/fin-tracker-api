const investmentsModel = require("./investments.model")

module.exports = {
  Query: {
    investmentsByUser: (parent, args) => {
      return investmentsModel.getInvestmentsByUser(args.userId, args.email)
    },
    investmentsSummaryByUser: (parent, args) => {
      return investmentsModel.getInvestmentsSummaryByUser(args.userId, args.email)
    }
  }
}