const { getInsurances, getInsurancesSummary,
  createInsurance, removeInsurance,
  updateInsurances, updateInsurancesSummary
} = require("../../models/insurances/insurances.mongo.crud")

async function insurancesByUser(userId, email) {
  const insurances = await getInsurances(userId, email)
  return insurances.insurances
}

module.exports = {
  insurancesByUser
}