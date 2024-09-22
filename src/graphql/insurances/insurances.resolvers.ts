import { Insurance, insurancesSummary } from "../../models/insurances/insurances.types.js";

const insurancesModel = require("./insurances.model.js")

type UserArgs = {
  userId: string;
  email: string;
}

module.exports = {
  Query: {
    insurancesByUser: (parent: any, args: UserArgs): Insurance[] => {
      return insurancesModel.insurancesByUser(args.userId, args.email)
    },
    insurancesSummaryByUser: (parent: any, args: UserArgs): insurancesSummary => {
      return insurancesModel.insurancesSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserInsurance: (parent: any, args: any): boolean => {
      return insurancesModel.createUserInsurance(args.userId, args.email, args.insuranceInfo)
    },
    deleteUserInsurance: (parent: any, args: any): boolean => {
      return insurancesModel.deleteUserInsurance(args.userId, args.email, args.removingInsuranceFor)
    },
    updateUserInsurances: (parent: any, args: any): boolean => {
      return insurancesModel.updateUserInsurances(args.userId, args.email, args.insurances)
    },
    updateUserInsurancesSummary: (parent: any, args: any): boolean => {
      return insurancesModel.updateUserInsurancesSummary(args.userId, args.email, args.insurancesSummary)
    }
  }
}