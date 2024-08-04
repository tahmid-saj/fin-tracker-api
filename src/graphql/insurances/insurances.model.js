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

async function createUserInsurance(userId, email, insuranceInfo) {
  console.log("Posting insurance creation")
  await createInsurance(userId, email, insuranceInfo)
  return true
}

async function deleteUserInsurance(userId, email, removingInsuranceFor) {
  await removeInsurance(userId, email, removingInsuranceFor)
  console.log("Deleting insurance")
  return true
} 

module.exports = {
  insurancesByUser,
  insurancesSummaryByUser,
  createUserInsurance,
  deleteUserInsurance
}