const savingsModel = require("./savings.model")

module.exports = {
  Query: {
    savingsAccountsByUser: (parent, args) => {
      return savingsModel.savingsAccountsByUser(args.userId, args.email)
    }
  }
}