import { getDailyPrediction, getTwoWeekPrediction } from "./predictions.mongo.crud.js";

export async function getDailyPredictionData(predictionTicker: string): Promise<any> {
  return getDailyPrediction(predictionTicker)
}

export async function getTwoWeekPredictionData(predictionTicker: string): Promise<any> {
  return getTwoWeekPrediction(predictionTicker)
}
