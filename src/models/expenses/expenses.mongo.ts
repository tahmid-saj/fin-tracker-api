import mongoose from "mongoose"

const expensesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  expenseFor: {
    type: String,
    required: true
  },
  expenseCost: {
    type: Number,
    required: true,
    default: 0
  },
  expenseDate: {
    type: String,
    required: true
  },
  expenseCategory: {
    type: String,
    required: true
  },
  expenseId: {
    type: Number,
    required: true
  }
});

const expensesSummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentAllExpensesCost: {
    type: Number,
    required: true,
    default: 0
  }
});

export const expensesDatabase = mongoose.model("Expenses", expensesSchema)
export const expensesSummaryDatabase = mongoose.model("ExpensesSummary", expensesSummarySchema)