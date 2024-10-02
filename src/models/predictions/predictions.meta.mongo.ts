import mongoose from "mongoose";

const metaDailyPredictionSchema = new mongoose.Schema({
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

const metaTwoWeekPredictionSchema = new mongoose.Schema({
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

export const metaDailyPredictionDatabase = mongoose.model("meta_daily_prediction", metaDailyPredictionSchema)
export const metaTwoWeekPredictionDatabase = mongoose.model("meta_two_week_prediction", metaTwoWeekPredictionSchema)
