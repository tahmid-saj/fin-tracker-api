const { getInsurances, getInsurancesSummary,
  createInsurance, removeInsurance,
  updateInsurances, updateInsurancesSummary
} = require("../../models/insurances/insurances.mongo.crud")

async function insurancesByUser(userId, email) {
  const insurances = await getInsurances(userId, email)
  return insurances.insurances
}

async function insurancesSummaryByUser(userId, email) {
  const insurancesSummary = await getInsurancesSummary(userId, email)
  return insurancesSummary.insurancesSummary
}

module.exports = {
  insurancesByUser,
  insurancesSummaryByUser
}