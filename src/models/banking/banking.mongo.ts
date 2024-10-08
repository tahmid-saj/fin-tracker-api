import mongoose from 'mongoose'

const bankingAccountsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currentBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  totalIn: {
    type: Number,
    required: true,
    default: 0,
  },
  totalOut: {
    type: Number,
    required: true,
    default: 0,
  },
  transactions: {
    type: [
      {
        amount: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        reason: {
          type: String,
          required: false,
        },
        addToExpenses: {
          type: Boolean,
          required: false
        }
      }
    ],
    default: [],
    required: false,
  }
});

const bankingSummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currentAllBankingBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAllBankingIn: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAllBankingOut: {
    type: Number,
    required: true,
    default: 0,
  }
});

export const bankingAccountsDatabase = mongoose.model("BankingAccounts", bankingAccountsSchema);
export const bankingSummaryDatabase = mongoose.model("BankingSummary", bankingSummarySchema);