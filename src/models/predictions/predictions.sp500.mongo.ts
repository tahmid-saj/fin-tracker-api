import mongoose from "mongoose";

const btcDailyPredictionSchema = new mongoose.Schema({
  current_date: {
    type: String,
    required: true
  },
  prediction: {
    type: {
      prediction_date: {
        type: String,
        required: true
      },
      prediction_price: {
        type: Number,
        required: true
      }
    },
    required: true
  },
})

const btcTwoWeekPredictionSchema = new mongoose.Schema({
  current_date: {
    type: String,
    required: true
  },
  predictions: {
    type: [
      {
        prediction_date: {
          type: String,
          required: true
        },
        prediction_price: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  }
})

export const sp500DailyPredictionDatabase = mongoose.model("sp500_daily_prediction", btcDailyPredictionSchema)
export const sp500TwoWeekPredictionDatabase = mongoose.model("sp500_two_week_prediction", btcTwoWeekPredictionSchema)
