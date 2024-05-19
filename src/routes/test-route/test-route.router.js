const express = require("express")

const testRouter = express.Router()

const httpGetTestRoute = (req, res) => {
  return res.send("test route for fin-tracker-api")
}

testRouter.get("/testroute", httpGetTestRoute)

module.exports = {
  testRouter
}