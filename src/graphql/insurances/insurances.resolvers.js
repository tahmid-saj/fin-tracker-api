const insurancesModel = require("./insurances.model")

module.exports = {
  Query: {
    insurancesByUser: (parent, args) => {
      return insurancesModel.insurancesByUser(args.userId, args.email)
    }
  }
}