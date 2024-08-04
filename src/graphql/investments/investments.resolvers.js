const investmentsModel = require("./investments.model")

module.exports = {
  Query: {
    investmentsByUser: (parent, args) => {
      return investmentsModel.getInvestmentsByUser(args.userId, args.email)
    },
    investmentsSummaryByUser: (parent, args) => {
      return investmentsModel.getInvestmentsSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserInvestment: (parent, args) => {
      return investmentsModel.createUserInvestment(args.userId, args.email, args.investmentInfo)
    },
    updateUserInvestment: (parent, args) => {
      const originalInvestmentInfo = args.investmentInfoUpdate.originalInvestmentInfo
      const updatedInvestmentInfo = args.investmentInfoUpdate.updatedInvestmentInfo
      return investmentsModel.updateUserInvestment(args.userId, args.email, originalInvestmentInfo, updatedInvestmentInfo)
    },
    deleteUserInvestment: (parent, args) => {
      return investmentsModel.deleteUserInvestment(args.userId, args.email, args.closingInvestmentName)
    },
    updateUserInvestments: (parent, args) => {
      return investmentsModel.updateUserInvestments(args.userId, args.email, args.investments)
    },
    updateUserInvestmentsSummary: (parent, args) => {
      return investmentsModel.updateUserInvestmentsSummary(args.userId, args.email, args.investmentsSummary)
    }
  }
}