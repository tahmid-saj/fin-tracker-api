import { getDailyPrediction, getTwoWeekPrediction } from "./predictions.mongo.crud.ts";

export async function getDailyPredictionData(): Promise<any> {
  return getDailyPrediction()
}

export async function getTwoWeekPredictionData(): Promise<any> {
  return getTwoWeekPrediction()
}
