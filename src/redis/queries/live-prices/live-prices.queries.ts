import { MarketDataRequest, MarketDataRequestResult } from "../../../models/market-data/market-data.types";
import { User } from "../../../models/users/users.types";
import { redisClient } from "../../../services/redis/redis.service";
import { MARKET_DATA_TYPES } from "../../../utils/constants/market-data.constants";
import { getMarketDataCrypto, getMarketDataForex, getMarketDataIndices, getMarketDataStocks } from "../../../utils/requests/market-data/market-data.requests";
import { usersKey } from "../users/users.keys";
import { livePricesRecentRequestsKey, livePricesRequestsKey, livePricesRequestsResultKey, livePricesUniqueRequestsKey } from "./live-prices.keys";

// stores most recent initial live prices requests using lists

// helper functions
export const serializeLivePricesRequestResult = (initialLivePricesResult: MarketDataRequestResult) => {
  return initialLivePricesResult.queryResults.map((result) => {
    return `closing=${result.closing}!time=${result.time}`
  })
}

export const deserializeLivePricesRequestResult = async (initialLivePricesResult: string[],
  user?: User) => {
  const queryResults = initialLivePricesResult.map((result) => {
    const record = result.split("!")
    const closing = record[0]?.split("=")[1]
    const time = record[1]?.split("=")[1]

    return { closing, time }
  })

  return {
    queryResults
  }
}

// returns the recent live prices requests:
export const getRecentLivePricesRequests = async () => {
  return redisClient.lRange(livePricesRecentRequestsKey(), 0, -1)
}

// returns the initial live prices of a request:
export const getInitialLivePrices = async (initialLivePricesRequest: MarketDataRequest) => {
  // we'll first update the live prices list
  const initialLivePricesResult = await updateLivePricesResult(initialLivePricesRequest)

  // then we'll update the live prices requestTime
  await updateLivePricesRequestTime(initialLivePricesRequest)

  return initialLivePricesResult
}

// saves the initial live prices when a live prices request is first sent:
export const saveInitialLivePrices = async (initialLivePricesRequest: MarketDataRequest,
  initialLivePricesResult: MarketDataRequestResult, user?: User) => {
  
  if (!initialLivePricesRequest) return

  await Promise.all([
    // we'll store the initialLivePricesRequest in a hash - the key will be the request itself
    redisClient.hSet(livePricesRequestsKey(initialLivePricesRequest), {
      ...initialLivePricesRequest,

      // we'll store the request time (in milliseconds) as well
      requestTime: Date.now()
    }),

    // we'll also store the actual result in memory in a list
    redisClient.rPush(livePricesRequestsResultKey(initialLivePricesRequest),
      serializeLivePricesRequestResult(initialLivePricesResult)),

    // we'll also store the request in a list so that we can display recent requests
    redisClient.rPush(livePricesRecentRequestsKey(), livePricesRequestsKey(initialLivePricesRequest))
  ])

  if (user) {
    // lastly, if the user is authenticated, we'll add their request to the hyperloglog:
    redisClient.pfAdd(livePricesUniqueRequestsKey(), usersKey(user))
  }
}

export const updateLivePricesResult = async (initialLivePricesRequest: MarketDataRequest) => {
  const today = new Date();
  const currentDate = today.toISOString().split('T')[0];
  let resMarketData

  switch (initialLivePricesRequest.marketDataType) {
    case MARKET_DATA_TYPES.stocks:
      resMarketData = await getMarketDataStocks(initialLivePricesRequest.marketDataType, 
        initialLivePricesRequest.marketDataTicker,
      initialLivePricesRequest.marketDataInterval, initialLivePricesRequest.marketDataStartDate, currentDate!)
      break
    
    case MARKET_DATA_TYPES.indices:
      resMarketData = await getMarketDataIndices(initialLivePricesRequest.marketDataType, 
        initialLivePricesRequest.marketDataTicker,
      initialLivePricesRequest.marketDataInterval, initialLivePricesRequest.marketDataStartDate, currentDate!)
      break
    
    case MARKET_DATA_TYPES.crypto:
      resMarketData = await getMarketDataCrypto(initialLivePricesRequest.marketDataType, 
        initialLivePricesRequest.marketDataTicker,
      initialLivePricesRequest.marketDataInterval, initialLivePricesRequest.marketDataStartDate, currentDate!)
      break
    
    case MARKET_DATA_TYPES.currencies:
      resMarketData = await getMarketDataForex(initialLivePricesRequest.marketDataType, 
        initialLivePricesRequest.marketDataTicker,
      initialLivePricesRequest.marketDataInterval, initialLivePricesRequest.marketDataStartDate, currentDate!)
      break
  }

  // empty the results list
  redisClient.lTrim(livePricesRequestsResultKey(initialLivePricesRequest), 1, 0)

  // save the updated results
  redisClient.rPush(livePricesRequestsResultKey(initialLivePricesRequest), 
    serializeLivePricesRequestResult(resMarketData!))

  return resMarketData
}

export const updateLivePricesRequestTime = async (initialLivePricesRequest: MarketDataRequest,
  user?: User) => {
  
  if (user) {
    const inserted = await redisClient.pfAdd(livePricesUniqueRequestsKey(), usersKey(user))
    if (inserted) {
      redisClient.hSet(livePricesRequestsKey(initialLivePricesRequest), "requestTime", Date.now())
      redisClient.rPush(livePricesRecentRequestsKey(), livePricesRequestsKey(initialLivePricesRequest))
    }
  }

  // if the recent live prices list exceeds a length of 20, then we'll remove the leftmost element
  const recentPricesCount = await redisClient.lLen(livePricesRecentRequestsKey())
  if (recentPricesCount > 20) {
    await redisClient.lPop(livePricesRecentRequestsKey())
  }
}