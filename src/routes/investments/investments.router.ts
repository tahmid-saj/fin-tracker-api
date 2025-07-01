import express, { Router } from 'express';

import { httpGetInvestmentsData, httpGetInvestmentsSummaryData,
  httpPostInvestmentCreate, httpPutInvestmentData, httpDeleteInvestment,
  httpPutInvestmentsData, httpPutInvestmentsSummaryData } from "./investments.controller.js"
import { logMiddleware } from '../middlewares/log.middleware.js';

const investmentsRouter: Router = express.Router();

investmentsRouter.use(logMiddleware)

// TODO: move to env variables
// when user is signed in
investmentsRouter.get("/investments/:userid/:email", httpGetInvestmentsData);
investmentsRouter.get("/summary/:userid/:email", httpGetInvestmentsSummaryData);

// investments operations
investmentsRouter.post("/investments/:userid/:email", httpPostInvestmentCreate);
investmentsRouter.put("/investment/:userid/:email", httpPutInvestmentData);
investmentsRouter.delete("/investments/:userid/:email", httpDeleteInvestment);

// user is signing out
investmentsRouter.put("/investments/:userid/:email", httpPutInvestmentsData);
investmentsRouter.put("/summary/:userid/:email", httpPutInvestmentsSummaryData);

export { investmentsRouter }
