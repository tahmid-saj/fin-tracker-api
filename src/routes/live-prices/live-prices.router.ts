import express, { Router } from "express";

import { httpGetPopularTickers, httpGetRecentRequests, httpGetLivePricesStocks, httpGetLivePricesIndices, 
  httpGetLivePricesCrypto, httpGetLivePricesForex } from "./live-prices.controller.js";

const livePricesRouter: Router = express.Router()

livePricesRouter.get("/popular-tickers", httpGetPopularTickers)
livePricesRouter.get("/recent-requests", httpGetRecentRequests)
livePricesRouter.post("/stocks", httpGetLivePricesStocks)
livePricesRouter.post("/indices", httpGetLivePricesIndices)
livePricesRouter.post("/crypto", httpGetLivePricesCrypto)
livePricesRouter.post("/forex", httpGetLivePricesForex)

export { livePricesRouter }