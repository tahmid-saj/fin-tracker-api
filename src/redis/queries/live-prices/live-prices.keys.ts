import { MarketDataRequest } from "../../../models/market-data/market-data.types.js";

export const livePricesRequestsKey = (initialLivePricesRequest: MarketDataRequest) => {
  return `live-prices-req#${initialLivePricesRequest.marketDataType}:${initialLivePricesRequest.marketDataTicker}:${initialLivePricesRequest.marketDataInterval}:${initialLivePricesRequest.marketDataStartDate}:${initialLivePricesRequest.marketDataEndDate}`
}

export const livePricesRequestsResultKey = (initialLivePricesRequest: MarketDataRequest) => {
  return `live-prices-req:result#${initialLivePricesRequest.marketDataType}:${initialLivePricesRequest.marketDataTicker}:${initialLivePricesRequest.marketDataInterval}:${initialLivePricesRequest.marketDataStartDate}:${initialLivePricesRequest.marketDataEndDate}`
}

export const livePricesRecentRequestsKey = () => `live-prices-req:recent`

export const livePricesUniqueRequestsKey = () => `live-prices-req:unique`