import { getCurrentFormattedDate } from "../../utils/helpers/helpers.utils.ts";
import { dailyPredictionDatabase, twoWeekPredictionDatabase } from "./predictions.mongo.ts";

import { PredictionData, DailyPrediction, TwoWeekPrediction } from "./predictions.types.ts";

// predictions crud for mongodb

export async function getDailyPrediction(): Promise<DailyPrediction | void> {
  const currentDate = getCurrentFormattedDate()

  const dailyPrediction = await dailyPredictionDatabase.findOne({
    current_date: currentDate
  })
  .then((res: any) => {
    return res.prediction
  })
  .catch((error: Error) => {
    console.log(error)
  })

  return {
    prediction_date: dailyPrediction.prediction_date,
    prediction_price: dailyPrediction.prediction_price
  }
}

export async function getTwoWeekPrediction(): Promise<TwoWeekPrediction | void> {
  const currentDate = getCurrentFormattedDate()

  let predictionDates: string[] | Date[] = []
  let predictionPrices: number[] = []
  const twoWeekPrediction = await twoWeekPredictionDatabase.findOne({
    current_date: currentDate
  })
  .then((res: any) => {
    res.predictions.map((prediction: any) => {
      predictionDates.push(prediction.prediction_date)
      predictionPrices.push(prediction.prediction_price)
    })
  })
  .catch((error: Error) => {
    console.log(error)
  })

  return {
    prediction_dates: predictionDates,
    prediction_prices: predictionPrices
  }
}