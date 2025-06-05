import { DailyPrediction, TwoWeekPrediction } from "../../../models/predictions/predictions.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js";
import { dailyPredictionsKey, twoWeekPredictionsKey } from "./predictions.keys.js";

// helper functions
export const serializeDailyPrediction = (predictionData: DailyPrediction) => {
  return {
    prediction_date: String(predictionData.prediction_date),
    prediction_price: String(predictionData.prediction_price)
  }
}

export const deserializeDailyPrediction = (predictionData: { [key: string]: string }): DailyPrediction => {
  return {
    prediction_date: String(predictionData.prediction_date),
    prediction_price: Number(predictionData.prediction_price)
  }
}

export const serializeTwoWeekPrediction = (predictionData: TwoWeekPrediction) => {
  let serializedTwoWeekPredictions = []
  for (let i = 0; i < predictionData.prediction_dates.length; i++) {
    serializedTwoWeekPredictions.push(`date=${predictionData.prediction_dates[i]}!price=${predictionData.prediction_prices[i]}`)
  }

  return serializedTwoWeekPredictions
}

export const deserializeTwoWeekPrediction = (predictionData: string[]) => {
  let deserializedPredictionDates: string[] = []
  let deserializedPrices: number[] = []
   
  predictionData.map((prediction) => {
    const predictionSplit = prediction.split("!")
    
    deserializedPredictionDates.push(String(predictionSplit[0]?.split("=")[1]))
    deserializedPrices.push(Number(predictionSplit[1]?.split("=")[1]))
  })

  return {
    prediction_dates: deserializedPredictionDates,
    prediction_prices: deserializedPrices
  }
}

export const isDailyPredictionCached = async (predictionTicker: string) => {
  return await redisClient.exists(dailyPredictionsKey(predictionTicker))
}

export const isTwoWeekPredictionCached = async (predictionTicker: string) => {
  return await redisClient.exists(twoWeekPredictionsKey(predictionTicker))
}

export const getDailyPrediction = async (predictionTicker: string) => {
  const dailyPrediction = await redisClient.hGetAll(dailyPredictionsKey(predictionTicker))
  return deserializeDailyPrediction(dailyPrediction)
}

export const getTwoWeekPrediction = async (predictionTicker: string) => {
  const twoWeekPrediction = await redisClient.lRange(twoWeekPredictionsKey(predictionTicker), 0, -1)
  return deserializeTwoWeekPrediction(twoWeekPrediction)
}

export const saveDailyPrediction = async (predictionTicker: string, predictionData: DailyPrediction) => {
  await redisClient.multi()
    .hSet(dailyPredictionsKey(predictionTicker), serializeDailyPrediction(predictionData))
    .expire(dailyPredictionsKey(predictionTicker), CACHING_TTL.high)
    .exec()
}

export const saveTwoWeekPrediction = async (predictionTicker: string, predictionData: TwoWeekPrediction) => {
  await redisClient.multi()
    .rPush(twoWeekPredictionsKey(predictionTicker), serializeTwoWeekPrediction(predictionData))
    .expire(twoWeekPredictionsKey(predictionTicker), CACHING_TTL.high)
    .exec()
}
