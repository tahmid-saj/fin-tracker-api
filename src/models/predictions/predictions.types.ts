// predictions types

export type PredictionData = {
  dailyPrediction: DailyPrediction;
  twoWeekPredictions: TwoWeekPrediction;
}

export type DailyPrediction = {
  prediction_date: string | Date;
  prediction_price: number;
}

export type TwoWeekPrediction = {
  prediction_dates: string[] | Date[];
  prediction_prices: number[];
}