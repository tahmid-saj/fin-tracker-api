const { insurancesDatabase, insurancesSummaryDatabase } = require("./insurances.mongo")

const { getInsurances, getInsurancesSummary,
  createInsurance, removeInsurance,
  updateInsurances, updateInsurancesSummary
} = require("./insurances.mongo.crud")

// TODO: handle error

// signed in
async function getInsurancesData(userId, email) {
  console.log("Getting insurances data")
  return getInsurances(userId, email)
}

// TODO: need to better manage summary
async function getInsurancesSummaryData(userId, email) {
  console.log("Getting insurances summary data")
  return getInsurancesSummary(userId, email)
}

// insurances operations
async function postInsuranceCreate(userId, email, insuranceInfo) {
  console.log("Posting insurance creation")
  await createInsurance(userId, email, insuranceInfo)
}

// TODO: need to better manage summary on delete
async function deleteInsurance(userId, email, removingInsuranceFor) {
  await removeInsurance(userId, email, removingInsuranceFor)
  console.log("Deleting insurance")
}

// signed out
async function putInsurancesData(userId, email, insurances) {
  await updateInsurances(userId, email, insurances)
  console.log("Putting insurances data")
}

// TODO: need to better manage summary
async function putInsurancesSummaryData(userId, email, insurancesSummary) {
  await updateInsurancesSummary(userId, email, insurancesSummary)
  console.log("Putting insurances summary data")
}

module.exports = {
  getInsurancesData,
  getInsurancesSummaryData,
  postInsuranceCreate,
  deleteInsurance,
  putInsurancesData,
  putInsurancesSummaryData
}