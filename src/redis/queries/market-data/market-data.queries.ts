import { MarketDataRequest, MarketDataRequestResult } from "../../../models/market-data/market-data.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js";
import { usersKey } from "../users/users.keys.js";
import { marketDataRequestsByPopularityKey, marketDataRequestsKey, 
  marketDataRequestsResultKey, marketDataUniqueRequestsKey } from "./market-data.keys.js";

// stores popular market data / initial live prices requests using sorted sets

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

export const hasRequestBeenAsked = async (marketDataRequest: MarketDataRequest) => {
  // check if the request has been added to the sorted set
  return redisClient.zScore(marketDataRequestsByPopularityKey(), marketDataRequestsKey(marketDataRequest))
}

export const getMarketDataResult = async (marketDataRequest: MarketDataRequest, user?: User) => {
  // if the user is authenticated, we'll first increment the marketDataRequest's requests field
  if (user) {
    incrementMarketDataRequest(marketDataRequest)
  }

  let marketDataResult = await redisClient.lRange(marketDataRequestsResultKey(marketDataRequest), 0, -1)

  return deserializeMarketDataRequestResult(marketDataResult)
}

export const saveMarketDataRequest = async (marketDataRequest: MarketDataRequest, 
  marketDataRequestResult: MarketDataRequestResult | undefined, user?: User) => {

  if (!marketDataRequestResult) return
  
  await Promise.all([
    // we'll store the marketDataRequest in a hash
    // the key will be the marketDataRequest itself
    redisClient.multi()
      .hSet(marketDataRequestsKey(marketDataRequest), {
        ...marketDataRequest,

        // we'll save the number of requests as once (since a user has requested the market data)
        requests: 1
      })
      .expire(marketDataRequestsKey(marketDataRequest), CACHING_TTL.high)
      .exec(),

    // we'll also store the actual market data result in memory in a list
    redisClient.multi()
      .rPush(marketDataRequestsResultKey(marketDataRequest), 
        serializeMarketDataRequestResult(marketDataRequestResult))
      .expire(marketDataRequestsResultKey(marketDataRequest), CACHING_TTL.high)
      .exec(),
    
    // we'll also store the marketDataRequest in a sorted set for fast lookups on 
    // marketDataRequest by popularity
    redisClient.multi()
      .zAdd(marketDataRequestsByPopularityKey(), {
        value: marketDataRequestsKey(marketDataRequest),

        // popularity or requests will initially be 1:
        score: 1
      })
      .expire(marketDataRequestsByPopularityKey(), CACHING_TTL.high)
      .exec()
  ])

  if (user) {
    // lastly, if the user is authenticated, we'll add their request to the hyperloglog:
    await redisClient.pfAdd(marketDataUniqueRequestsKey(), usersKey(user))
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
      await redisClient.multi()
        .hIncrBy(marketDataRequestsKey(marketDataRequest), "requests", 1)
        .expire(marketDataRequestsKey(marketDataRequest), CACHING_TTL.high)
        .exec()

      await redisClient.multi()
        .zIncrBy(marketDataRequestsByPopularityKey(), 1, marketDataRequestsKey(marketDataRequest))
        .expire(marketDataRequestsByPopularityKey(), CACHING_TTL.high)
        .exec()
    }
  }
}