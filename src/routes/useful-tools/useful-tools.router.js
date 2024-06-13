const express = require("express")

const { httpGetUsefulToolsMortgageCalculator, httpGetUsefulToolsExchangeRate
} = require("./useful-tools.controller")

const usefulToolsRouter = express.Router()

// TODO: move to env variables
usefulToolsRouter.post("/mortgage-calculator", httpGetUsefulToolsMortgageCalculator)
usefulToolsRouter.post("/exchange-rate", httpGetUsefulToolsExchangeRate)

module.exports = {
  usefulToolsRouter
}