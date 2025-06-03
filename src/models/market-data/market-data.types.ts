import { MarketDataRecord } from "../../utils/requests/market-data/market-data.requests"

export type MarketDataRequest = {
  marketDataType: string,
  marketDataTicker: string,
  marketDataInterval: string,
  marketDataStartDate: string,
  marketDataEndDate: string
}

export type MarketDataRequestResult = {
  queryResults: MarketDataRecord[]
}