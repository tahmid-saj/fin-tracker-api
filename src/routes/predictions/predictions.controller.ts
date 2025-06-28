import { Request, Response } from "express";
import { getDailyPredictionData, getTwoWeekPredictionData } from "../../models/predictions/predictions.model.js";
import { getDailyPrediction, getTwoWeekPrediction, isDailyPredictionCached, 
  isTwoWeekPredictionCached, saveDailyPrediction, 
  saveTwoWeekPrediction} from "../../redis/queries/predictions/predictions.queries.js";

// market predictions

export async function httpGetDailyPrediction(req: Request, res: Response): Promise<any> {
  try {
    const predictionTicker = String(req.params.ticker)

    const isPredictionCached = await isDailyPredictionCached(predictionTicker)
    if (isPredictionCached) {
      const resDailyPrediction = await getDailyPrediction(predictionTicker)
      return res.status(200).json(resDailyPrediction)
    } else {
      const resGetDailyPrediction = await getDailyPredictionData(predictionTicker)
  
      if (resGetDailyPrediction) {
        saveDailyPrediction(predictionTicker, resGetDailyPrediction)
        return res.status(200).json(resGetDailyPrediction)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpGetTwoWeekPrediction(req: Request, res: Response): Promise<any> {
  try {
    const predictionTicker = String(req.params.ticker)

    const isPredictionCached = await isTwoWeekPredictionCached(predictionTicker)
    if (isPredictionCached) {
      const resTwoWeekPrediction = await getTwoWeekPrediction(predictionTicker)
      return res.status(200).json(resTwoWeekPrediction)
    } else {
      const resGetTwoWeekPrediction = await getTwoWeekPredictionData(predictionTicker)

      if (resGetTwoWeekPrediction) {
        saveTwoWeekPrediction(predictionTicker, resGetTwoWeekPrediction)
        return res.status(200).json(resGetTwoWeekPrediction)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}