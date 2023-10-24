const express = require('express');

const { httpGetInvestmentsData, httpGetInvestmentsSummaryData,
  httpPostInvestmentCreate, httpPutInvestmentData, httpDeleteInvestment,
  httpPutInvestmentsData, httpPutInvestmentsSummaryData } = require("./investments.controller");

const investmentsRouter = express.Router();

// TODO: move to env variables
// when user is signed in
investmentsRouter.get("/investments/:userid/:email", httpGetInvestmentsData);
investmentsRouter.get("/summary/:userid/:email", httpGetInvestmentsSummaryData);

// investments operations
investmentsRouter.post("/investments/:userid/:email/create", httpPostInvestmentCreate);
investmentsRouter.put("/investments/:userid/:email/update", httpPutInvestmentData);
investmentsRouter.delete("/investments/:userid/:email/close", httpDeleteInvestment);

// user is signing out
investmentsRouter.put("/investments/:userid/:email", httpPutInvestmentsData);
investmentsRouter.put("/summary/:userid/:email", httpPutInvestmentsSummaryData);

module.exports = {
  investmentsRouter,
}
