const { getInsurancesData, getInsurancesSummaryData,
  postInsuranceCreate, deleteInsurance,
  putInsurancesData, putInsurancesSummaryData
} = require("../../models/insurances/insurances.model")


// signed in
async function httpGetInsurancesData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const resGetInsurancesData = await getInsurancesData(userId, email)

    if (resGetInsurancesData) return res.status(200).json(resGetInsurancesData)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpGetInsurancesSummaryData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const resGetInsurancesSummaryData = await getInsurancesSummaryData(userId, email)

    if (resGetInsurancesSummaryData) return res.status(200).json(resGetInsurancesSummaryData)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// insurances operations
async function httpPostInsurancesCreate(req, res) {
  try {
    const insuranceInfo = req.body
    const userId = req.params.userid
    const email = req.params.email
    const resPostInsuranceCreate = await postInsuranceCreate(userId, email, insuranceInfo)

    if (resPostInsuranceCreate) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpDeleteInsurance(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const removingInsuranceFor = String(req.body)
    const resDeleteInsurance = await deleteInsurance(userId, email, removingInsuranceFor)

    if (resDeleteInsurance) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// signed out
async function httpPutInsurancesData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { insurances } = req.body
    const resPutInsurancesData = await putInsurancesData(userId, email, insurances)

    if (resPutInsurancesData) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpPutInsurancesSummaryData(req, res) {
  try {
    const userId = req.params.userid
    const email = req.params.email
    const { insurancesSummary } = req.body
    const resPutInsurancesSummaryData = await putInsurancesSummaryData(userId, email, insurancesSummary)
    
    if (resPutInsurancesSummaryData) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetInsurancesData,
  httpGetInsurancesSummaryData,
  httpPostInsurancesCreate,
  httpDeleteInsurance,
  httpPutInsurancesData,
  httpPutInsurancesSummaryData
}