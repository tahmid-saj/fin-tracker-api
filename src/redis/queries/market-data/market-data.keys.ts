import { MarketDataRequest } from "../../../models/market-data/market-data.types";

export const marketDataRequestsKey = (marketDataRequest: MarketDataRequest) => {
  return `market-data-req#${marketDataRequest.marketDataType}:${marketDataRequest.marketDataTicker}:${marketDataRequest.marketDataInterval}:${marketDataRequest.marketDataStartDate}:${marketDataRequest.marketDataEndDate}`
}

export const marketDataRequestsResultKey = (marketDataRequest: MarketDataRequest) => {
  return `market-data-req:result#${marketDataRequest.marketDataType}:${marketDataRequest.marketDataTicker}:${marketDataRequest.marketDataInterval}:${marketDataRequest.marketDataStartDate}:${marketDataRequest.marketDataEndDate}`
}

export const marketDataRequestsByPopularityKey = () => `market-data-req:popularity`

export const marketDataUniqueRequestsKey = () => `market-data-req:unique`