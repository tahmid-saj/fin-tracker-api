
export const incrementMarketDataRequest = `
  local marketDataUniqueRequestsKey = KEYS[1]
  local usersKey = KEYS[2]
  local marketDataRequestsKey = KEYS[3]
  local marketDataRequestsByPopularityKey = KEYS[4]

  local marketDataType = ARGV[1]
  local marketDataTicker = ARGV[2]
  local marketDataInterval = ARGV[3]
  local marketDataStartDate = ARGV[4]
  local marketDataEndDate = ARGV[5]
  local userAuthenticated = ARGV[6]

  if userAuthenticated == 1 then
    local inserted = redis.call('PFADD', marketDataUniqueRequestsKey, usersKey)
    if inserted == 1 then
      redis.call('HINCRBY', marketDataRequestsKey, 'requests', 1)
      redis.call('ZINCRBY', 'marketDataRequestsByPopularityKey', 1, marketDataRequestsKey)
    end
  end
`

export const updateLivePricesRequestTime = `
  local livePricesUniqueRequestsKey = KEYS[1]
  local usersKey = KEYS[2]
  local livePricesRequestsKey = KEYS[3]
  local livePricesRecentRequestsKey = KEYS[4]

  local marketDataType = ARGV[1]
  local marketDataTicker = ARGV[2]
  local marketDataInterval = ARGV[3]
  local marketDataStartDate = ARGV[4]
  local marketDataEndDate = ARGV[5]
  local userAuthenticated = ARGV[6]
  local timeNow = ARGV[7]

  if userAuthenticated then
    local inserted = redis.call('PFADD', livePricesUniqueRequestsKey, usersKey)
    if inserted then
      redis.call('HINCRBY', livePricesRequestsKey, 'requestTime', timeNow)
      redis.call('RPUSH', livePricesRecentRequestsKey, livePricesRequestsKey)
    end
  end

  local recentPricesCount = redis.call('LLEN', livePricesRecentRequestsKey)
  if recentPricesCount > 20 then
    redis.call('LPOP', livePricesRecentRequestsKey)
  end
`

export const updateLivePricesPopularTickers = `
  local livePricesPopularTickersKey = KEYS[1]
  local livePricesUniquePopularTickersKey = KEYS[2]
  local usersKey = KEYS[3]

  local marketDataType = ARGV[1]
  local marketDataTicker = ARGV[2]
  local marketDataInterval = ARGV[3]
  local marketDataStartDate = ARGV[4]
  local marketDataEndDate = ARGV[5]
  local userAuthenticated = ARGV[6]

  local tickerIsMember = redis.call('ZSCORE', livePricesPopularTickersKey, marketDataTicker)

  if tickerIsMember == 0 then
    redis.call('ZADD', livePricesPopularTickersKey, marketDataTicker, 1)
  else
    if userAuthenticated then
      local inserted = redis.call('PFADD', livePricesUniquePopularTickersKey, usersKey)

      if inserted then
        redis.call('ZINCRBY', livePricesPopularTickersKey, 1, marketDataTicker)
      end
    else
      redis.call('ZINCRBY', livePricesPopularTickersKey, 1, marketDataTicker)
    end
  end

  local livePricesPopularTickersCount = redis.call('ZCARD', livePricesPopularTickersKey)
  if livePricesPopularTickersCount > 10 then
    redis.call('ZPOPMIN', livePricesPopularTickersKey)
  end
`

export const unlockScript = `
  if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
  end
`