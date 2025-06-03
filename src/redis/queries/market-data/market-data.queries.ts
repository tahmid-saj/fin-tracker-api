import { MarketDataRequest, MarketDataRequestResult } from "../../../models/market-data/market-data.types";
import { User } from "../../../models/users/users.types";
import { redisClient } from "../../../services/redis/redis.service";
import { usersKey } from "../users/users.keys";
import { marketDataRequestsByPopularityKey, marketDataRequestsKey, 
  marketDataRequestsResultKey, marketDataUniqueRequestsKey } from "./market-data.keys";

// helper functions
export const serializeMarketDataRequestResult = (marketDataRequestResult: MarketDataRequestResult) => {
  return marketDataRequestResult.queryResults.map((result) => {
    return `closing=${result.closing}!time=${result.time}`
  })
}

export const deserializeMarketDataRequestResult = (marketDataRequestResult: string[]) => {
  const queryResults = marketDataRequestResult.map((result) => {
    const record = result.split("!")
    const closing = record[0]?.split("=")[1]
    const time = record[1]?.split("=")[1]

    return { closing, time }
  })

  return {
    queryResults
  }
}

export const getMarketDataResult = async (marketDataRequest: MarketDataRequest, user?: User) => {
  // if the user is authenticated, we'll first increment the marketDataRequest's requests field
  if (user) {
    incrementMarketDataRequest(marketDataRequest)
  }

  let marketDataResult = await redisClient.lRange(marketDataRequestsResultKey(marketDataRequest), 0, -1)
  marketDataResult = marketDataResult.reverse()

  return deserializeMarketDataRequestResult(marketDataResult)
}

export const saveMarketDataRequest = async (marketDataRequest: MarketDataRequest, 
  marketDataRequestResult: MarketDataRequestResult | undefined, user?: User) => {

  if (!marketDataRequestResult) return
  
  await Promise.all([
    // we'll store the marketDataRequest in a hash
    // the key will be the marketDataRequest itself
    redisClient.hSet(marketDataRequestsKey(marketDataRequest), {
      ...marketDataRequest,

      // we'll save the number of requests as once (since a user has requested the market data)
      requests: 1
    }),

    // we'll also store the actual market data result in memory:
    redisClient.lPush(marketDataRequestsResultKey(marketDataRequest), serializeMarketDataRequestResult(marketDataRequestResult)),
    
    // we'll also store the marketDataRequest in a sorted set for fast lookups on 
    // marketDataRequest by popularity
    redisClient.zAdd(marketDataRequestsByPopularityKey(), {
      value: marketDataRequestsKey(marketDataRequest),

      // popularity or requests will initially be 1:
      score: 1
    })
  ])

  if (user) {
    // lastly, if the user is authenticated, we'll add their request to the hyperloglog:
    redisClient.pfAdd(marketDataUniqueRequestsKey(), usersKey(user))
  }
}

export const incrementMarketDataRequest = async (marketDataRequest: MarketDataRequest,
  user?: User) => {
  
  if (user) {
    // if the user is authenticated and did not yet request on the marketDataRequest determined 
    // by the hyperloglog below (pfAdd), then increment the market data request popularity 
    // field and sorted set by 1:
    const inserted = await redisClient.pfAdd(marketDataUniqueRequestsKey(), usersKey(user))
    if (inserted) {
      redisClient.hIncrBy(marketDataRequestsKey(marketDataRequest), "requests", 1)
      redisClient.zIncrBy(marketDataRequestsByPopularityKey(), 
        1, marketDataRequestsKey(marketDataRequest))
    }
  }
}