import express, { Router } from "express"

import { httpGetInsurancesData, httpGetInsurancesSummaryData,
  httpPostInsurancesCreate, httpDeleteInsurance,
  httpPutInsurancesData, httpPutInsurancesSummaryData
} from "./insurances.controller"

const insurancesRouter: Router = express.Router()

// TODO: move to env variables
// when user is signed in
insurancesRouter.get("/insurances/:userid/:email", httpGetInsurancesData)
insurancesRouter.get("/summary/:userid/:email", httpGetInsurancesSummaryData)

// insurances operations
insurancesRouter.post("/insurances/:userid/:email", httpPostInsurancesCreate)
insurancesRouter.delete("/insurances/:userid/:email", httpDeleteInsurance)

// user is signing out
insurancesRouter.put("/insurances/:userid/:email", httpPutInsurancesData)
insurancesRouter.put("/summary/:userid/:email", httpPutInsurancesSummaryData)

export { insurancesRouter }