import { Request, Response } from "express";
import { getDailyPredictionData, getTwoWeekPredictionData } from "../../models/predictions/predictions.model.js";

// market predictions

export async function httpGetDailyPrediction(req: Request, res: Response): Promise<void> {
  try {
    const predictionTicker = String(req.params.ticker)
    const resGetDailyPrediction = await getDailyPredictionData(predictionTicker)

    if (resGetDailyPrediction) res.status(200).json(resGetDailyPrediction)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpGetTwoWeekPrediction(req: Request, res: Response): Promise<void> {
  try {
    const predictionTicker = String(req.params.ticker)
    const resGetTwoWeekPrediction = await getTwoWeekPredictionData(predictionTicker)

    if (resGetTwoWeekPrediction) res.status(200).json(resGetTwoWeekPrediction)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}