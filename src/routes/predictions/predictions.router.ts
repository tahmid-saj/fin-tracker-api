import express, { Router } from "express"

import { httpGetDailyPrediction, httpGetTwoWeekPrediction } from "./predictions.controller.ts"

const predictionsRouter: Router = express.Router()

predictionsRouter.get("/daily-prediction", httpGetDailyPrediction)
predictionsRouter.get("/two-week-prediction", httpGetTwoWeekPrediction)

export { predictionsRouter }