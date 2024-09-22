import express, { Router } from "express"

import { httpGetMarketDataStocks, httpGetMarketDataIndices,
  httpGetMarketDataCrypto, httpGetMarketDataForex
} from "./market-data.controller"

const marketDataRouter: Router = express.Router()

// TODO: move to env variables
marketDataRouter.post("/stocks", httpGetMarketDataStocks)
marketDataRouter.post("/indices", httpGetMarketDataIndices)
marketDataRouter.post("/crypto", httpGetMarketDataCrypto)
marketDataRouter.post("/forex", httpGetMarketDataForex)


module.exports = {
  marketDataRouter
}