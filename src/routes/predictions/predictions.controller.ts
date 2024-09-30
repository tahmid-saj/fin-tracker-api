import { Request, Response } from "express";
import { getDailyPredictionData, getTwoWeekPredictionData } from "../../models/predictions/predictions.model.ts";

// market predictions

export async function httpGetDailyPrediction(req: Request, res: Response): Promise<void> {
  try {
    const resGetDailyPrediction = await getDailyPredictionData()

    if (resGetDailyPrediction) res.status(200).json(resGetDailyPrediction)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpGetTwoWeekPrediction(req: Request, res: Response): Promise<void> {
  try {
    const resGetTwoWeekPrediction = await getTwoWeekPredictionData()

    if (resGetTwoWeekPrediction) res.status(200).json(resGetTwoWeekPrediction)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}