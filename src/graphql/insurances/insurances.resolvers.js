const insurancesModel = require("./insurances.model")

module.exports = {
  Query: {
    insurancesByUser: (parent, args) => {
      return insurancesModel.insurancesByUser(args.userId, args.email)
    },
    insurancesSummaryByUser: (parent, args) => {
      return insurancesModel.insurancesSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserInsurance: (parent, args) => {
      return insurancesModel.createUserInsurance(args.userId, args.email, args.insuranceInfo)
    },
    deleteUserInsurance: (parent, args) => {
      return insurancesModel.deleteUserInsurance(args.userId, args.email, args.removingInsuranceFor)
    },
    updateUserInsurances: (parent, args) => {
      return insurancesModel.updateUserInsurances(args.userId, args.email, args.insurances)
    }
  }
}