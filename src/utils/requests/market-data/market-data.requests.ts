import { errorOnGetMarketData } from "../../errors/market-data.errors.js"
import { polygonRestClient } from "../../../services/polygon/polygon.service.js"
import { convertUnixMsecToDatetime } from "../../helpers/helpers.utils.js"
import { MARKET_DATA_CRYPTO_PREFIX, MARKET_DATA_FOREX_PREFIX, 
  MARKET_DATA_SEARCH_QUERY_MULTIPLIER, DEFAULT_MARKET_DATA 
} from "../../constants/market-data.constants.js"
import { IAggs } from "@polygon.io/client-js"

type MarketDataRecord = {
  closing: number;
  time: Date | string;
}

// helper functions
export function processMarketDataResponse(marketDataRes: IAggs) {
  if (marketDataRes && marketDataRes.results) {
    return marketDataRes.results.map((marketDataRecord) => {
      if (marketDataRecord.t) {
        return {
          closing: marketDataRecord.c,
          time: convertUnixMsecToDatetime(marketDataRecord.t)
        }
      }
    })
  }
}

// stocks
export async function getMarketDataStocks(marketDataType: string, marketDataTicker: string, marketDataInterval: string,
  marketDataStartDate: string, marketDataEndDate: string): Promise<{ queryResults: MarketDataRecord[] } | undefined> {
  const resMarketData = await polygonRestClient.stocks.aggregates(
    marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER, 
    marketDataInterval.toLowerCase(),
    String(marketDataStartDate),
    String(marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return {
    queryResults: resMarketData as MarketDataRecord[]
  }
}

// indices
export async function getMarketDataIndices(marketDataType: string, marketDataTicker: string, marketDataInterval: string,
  marketDataStartDate: string, marketDataEndDate: string): Promise<{ queryResults: MarketDataRecord[] } | undefined> {
  const resMarketData = await polygonRestClient.indices.aggregates(
    marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER, 
    marketDataInterval.toLowerCase(),
    String(marketDataStartDate),
    String(marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return {
    queryResults: resMarketData as MarketDataRecord[]
  }
}

// crypto
export async function getMarketDataCrypto(marketDataType: string, marketDataTicker: string, marketDataInterval: string,
  marketDataStartDate: string, marketDataEndDate: string): Promise<{ queryResults: MarketDataRecord[] } | undefined> {
  const resMarketData = await polygonRestClient.crypto.aggregates(
    MARKET_DATA_CRYPTO_PREFIX + marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER,
    marketDataInterval.toLowerCase(),
    String(marketDataStartDate),
    String(marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return {
    queryResults: resMarketData as MarketDataRecord[]
  }
}

// forex
export async function getMarketDataForex(marketDataType: string, marketDataTicker: string, marketDataInterval: string,
  marketDataStartDate: string, marketDataEndDate: string): Promise<{ queryResults: MarketDataRecord[] } | undefined> {
  const resMarketData = await polygonRestClient.forex.aggregates(
    MARKET_DATA_FOREX_PREFIX + marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER,
    marketDataInterval.toLowerCase(),
    String(marketDataStartDate),
    String(marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return {
    queryResults: resMarketData as MarketDataRecord[]
  }
}