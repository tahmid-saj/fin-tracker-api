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

async function updateUserInsurances(userId, email, insurances) {
  await updateInsurances(userId, email, insurances)
  console.log("Putting insurances data")
  return true
}

async function updateUserInsurancesSummary(userId, email, insurancesSummary) {
  await updateInsurancesSummary(userId, email, insurancesSummary)
  console.log("Putting insurances summary data")
  return true
}

module.exports = {
  insurancesByUser,
  insurancesSummaryByUser,
  createUserInsurance,
  deleteUserInsurance,
  updateUserInsurances,
  updateUserInsurancesSummary
}