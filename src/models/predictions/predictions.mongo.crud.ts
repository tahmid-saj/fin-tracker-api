import { PREDICTION_TICKERS } from "../../utils/constants/predictions.constants.ts";
import { getCurrentFormattedDate } from "../../utils/helpers/helpers.utils.ts";
import { dailyPredictionDatabase, twoWeekPredictionDatabase
} from "./predictions.btc.mongo.ts";
import { sp500DailyPredictionDatabase, sp500TwoWeekPredictionDatabase } from "./predictions.sp500.mongo.ts";
import { metaDailyPredictionDatabase, metaTwoWeekPredictionDatabase } from "./predictions.meta.mongo.ts";

import { PredictionData, DailyPrediction, TwoWeekPrediction } from "./predictions.types.ts";

// predictions crud for mongodb

export async function getDailyPrediction(predictionTicker: string): Promise<DailyPrediction | void> {
  const currentDate = getCurrentFormattedDate()

  let prediction_date: string = "";
  let prediction_price: number = 0;

  if (predictionTicker === PREDICTION_TICKERS.BTC) {
    const dailyPrediction = await dailyPredictionDatabase.findOne({
      current_date: currentDate
    })
    .then((res: any) => {
      return res.prediction
    })
    .catch((error: Error) => {
      console.log(error)
    })

    prediction_date = dailyPrediction.prediction_date
    prediction_price = dailyPrediction.prediction_price
  } else if (predictionTicker === PREDICTION_TICKERS.SP500) {
    const dailyPrediction = await sp500DailyPredictionDatabase.findOne({
      current_date: currentDate
    })
    .then((res: any) => {
      return res.prediction
    })
    .catch((error: Error) => {
      console.log(error)
    })

    prediction_date = dailyPrediction.prediction_date
    prediction_price = dailyPrediction.prediction_price
  } else if (predictionTicker === PREDICTION_TICKERS.META) {
    const dailyPrediction = await metaDailyPredictionDatabase.findOne({
      current_date: currentDate
    })
    .then((res: any) => {
      return res.prediction
    })
    .catch((error: Error) => {
      console.log(error)
    })

    prediction_date = dailyPrediction.prediction_date
    prediction_price = dailyPrediction.prediction_price
  }

  return {
    prediction_date: prediction_date,
    prediction_price: prediction_price
  }
}

export async function getTwoWeekPrediction(predictionTicker: string): Promise<TwoWeekPrediction | void> {
  const currentDate = getCurrentFormattedDate()

  let predictionDates: string[] | Date[] = []
  let predictionPrices: number[] = []

  if (predictionTicker === PREDICTION_TICKERS.BTC) {
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
  } else if (predictionTicker === PREDICTION_TICKERS.SP500) {
    const twoWeekPrediction = await sp500TwoWeekPredictionDatabase.findOne({
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
  } else if (predictionTicker === PREDICTION_TICKERS.META) {
    const twoWeekPrediction = await metaTwoWeekPredictionDatabase.findOne({
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
  }


  return {
    prediction_dates: predictionDates,
    prediction_prices: predictionPrices
  }
}