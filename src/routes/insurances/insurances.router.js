const express = require("express")

const { httpGetInsurancesData, httpGetInsurancesSummaryData,
  httpPostInsurancesCreate, httpDeleteInsurance,
  httpPutInsurancesData, httpPutInsurancesSummaryData
} = require("./insurances.controller")

const insurancesRouter = express.Router()

// TODO: move to env variables
// when user is signed in
insurancesRouter.get("/insurances/:userid/:email", httpGetInsurancesData)
insurancesRouter.get("/insurances/:userid/:email", httpGetInsurancesSummaryData)

// insurances operations
insurancesRouter.post("/insurances/:userid/:email", httpPostInsurancesCreate)
insurancesRouter.delete("/insurances/:userid/:email/remove", httpDeleteInsurance)

// user is signing out
insurancesRouter.put("/insurances/:userid/:email", httpPutInsurancesData)
insurancesRouter.put("/summary/:userid/:email", httpPutInsurancesSummaryData)

module.exports = {
  insurancesRouter
}