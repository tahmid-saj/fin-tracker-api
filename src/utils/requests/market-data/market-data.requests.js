const { errorOnGetMarketData } = require("../../errors/market-data.errors")
const { polygonRestClient } = require("../../../services/polygon/polygon.service")
const { convertUnixMsecToDatetime } = require("../../helpers/helpers.utils")
const { MARKET_DATA_CRYPTO_PREFIX, MARKET_DATA_FOREX_PREFIX, 
  MARKET_DATA_SEARCH_QUERY_MULTIPLIER, DEFAULT_MARKET_DATA 
} = require("../../constants/market-data.constants")

// helper functions
function processMarketDataResponse(marketDataRes) {
  return marketDataRes.results.map((marketDataRecord) => {
    return {
      closing: marketDataRecord.c,
      time: convertUnixMsecToDatetime(marketDataRecord.t)
    }
  })
}

// stocks
async function getMarketDataStocks(marketDataType, marketDataTicker, marketDataInterval,
  marketDataStartDate, marketDataEndDate) {
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
    queryResults: resMarketData
  }
}

// indices
async function getMarketDataIndices(marketDataType, marketDataTicker, marketDataInterval,
  marketDataStartDate, marketDataEndDate) {
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
    queryResults: resMarketData
  }
}

// crypto
async function getMarketDataCrypto(marketDataType, marketDataTicker, marketDataInterval,
  marketDataStartDate, marketDataEndDate) {
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
    queryResults: resMarketData
  }
}

// forex
async function getMarketDataForex(marketDataType, marketDataTicker, marketDataInterval,
  marketDataStartDate, marketDataEndDate) {
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
    queryResults: resMarketData
  }
}

module.exports = {
  getMarketDataStocks,
  getMarketDataIndices,
  getMarketDataCrypto,
  getMarketDataForex
}