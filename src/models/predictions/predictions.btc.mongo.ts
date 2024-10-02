import mongoose from "mongoose";

const dailyPredictionSchema = new mongoose.Schema({
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

const twoWeekPredictionSchema = new mongoose.Schema({
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

export const dailyPredictionDatabase = mongoose.model("daily_prediction", dailyPredictionSchema)
export const twoWeekPredictionDatabase = mongoose.model("two_week_prediction", twoWeekPredictionSchema)
