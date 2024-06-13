const express = require("express")

const { httpGetMarketDataStocks, httpGetMarketDataIndices,
  httpGetMarketDataCrypto, httpGetMarketDataForex
} = require("./market-data.controller")

const marketDataRouter = express.Router()

// TODO: move to env variables
marketDataRouter.post("/stocks", httpGetMarketDataStocks)
marketDataRouter.post("/indices", httpGetMarketDataIndices)
marketDataRouter.post("/crypto", httpGetMarketDataCrypto)
marketDataRouter.post("/forex", httpGetMarketDataForex)


module.exports = {
  marketDataRouter
}