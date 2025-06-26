import { createClient } from "redis"
import { incrementMarketDataRequest } from "../../redis/scripts/scripts.js"
import { User } from "../../models/users/users.types.js"
import { MarketDataRequest } from "../../models/market-data/market-data.types.js"
import { marketDataRequestsKey, marketDataUniqueRequestsKey, 
  marketDataRequestsByPopularityKey } from "../../redis/queries/market-data/market-data.keys.js"
import { usersKey } from "../../redis/queries/users/users.keys.js"

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!)
  },
  password: process.env.REDIS_PW
})

// export const incrementMarketDataRequestScript = redisClient.extendWithScripts({
//   NUMBER_OF_KEYS: 4,
//   SCRIPT: incrementMarketDataRequest,
//   transformArguments(marketDataRequest: MarketDataRequest, user?: User) {
//     if (user) {
//       return [
//         marketDataUniqueRequestsKey(), usersKey(user), marketDataRequestsKey(marketDataRequest), marketDataRequestsByPopularityKey(),
//         marketDataRequest.marketDataType, marketDataRequest, marketDataRequest, marketDataRequest, marketDataRequest,
//         1
//       ]
//     }

//     return [
//       marketDataUniqueRequestsKey(), "undefined", marketDataRequestsKey(marketDataRequest), marketDataRequestsByPopularityKey(),
//       marketDataRequest.marketDataType, marketDataRequest, marketDataRequest, marketDataRequest, marketDataRequest,
//       0
//     ]
//   },
//   transformReply() {}
// })

// runs when the client has connected to the redis instance:
redisClient.on("connect", async () => {
  console.log("Connected to redis instance")
})

redisClient.on("error", (err: any) => {
  console.log(err)
})

export async function redisConnect() {
  await redisClient.connect()
}

