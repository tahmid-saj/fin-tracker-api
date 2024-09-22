import { Investment, InvestmentsSummary } from "../../models/investments/investments.types.ts";

const investmentsModel = require("./investments.model.ts")

type UserArgs = {
  userId: string;
  email: string;
}

module.exports = {
  Query: {
    investmentsByUser: (parent: any, args: UserArgs): Investment[] => {
      return investmentsModel.getInvestmentsByUser(args.userId, args.email)
    },
    investmentsSummaryByUser: (parent: any, args: UserArgs): InvestmentsSummary => {
      return investmentsModel.getInvestmentsSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserInvestment: (parent: any, args: any): boolean => {
      return investmentsModel.createUserInvestment(args.userId, args.email, args.investmentInfo)
    },
    updateUserInvestment: (parent: any, args: any): boolean => {
      const originalInvestmentInfo = args.investmentInfoUpdate.originalInvestmentInfo
      const updatedInvestmentInfo = args.investmentInfoUpdate.updatedInvestmentInfo
      return investmentsModel.updateUserInvestment(args.userId, args.email, originalInvestmentInfo, updatedInvestmentInfo)
    },
    deleteUserInvestment: (parent: any, args: any): boolean => {
      return investmentsModel.deleteUserInvestment(args.userId, args.email, args.closingInvestmentName)
    },
    updateUserInvestments: (parent: any, args: any): boolean => {
      return investmentsModel.updateUserInvestments(args.userId, args.email, args.investments)
    },
    updateUserInvestmentsSummary: (parent: any, args: any): boolean => {
      return investmentsModel.updateUserInvestmentsSummary(args.userId, args.email, args.investmentsSummary)
    }
  }
}