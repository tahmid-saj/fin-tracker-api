const insurancesModel = require("./insurances.model")

module.exports = {
  Query: {
    insurancesByUser: (parent, args) => {
      return insurancesModel.insurancesByUser(args.userId, args.email)
    },
    insurancesSummaryByUser: (parent, args) => {
      return insurancesModel.insurancesSummaryByUser(args.userId, args.email)
    }
  }
}