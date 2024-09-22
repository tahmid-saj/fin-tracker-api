import express, { Router } from "express"

import { httpGetUsefulToolsMortgageCalculator, httpGetUsefulToolsExchangeRate
} from "./useful-tools.controller.js"

const usefulToolsRouter: Router = express.Router()

// TODO: move to env variables
usefulToolsRouter.post("/mortgage-calculator", httpGetUsefulToolsMortgageCalculator)
usefulToolsRouter.post("/exchange-rate", httpGetUsefulToolsExchangeRate)

export { usefulToolsRouter }