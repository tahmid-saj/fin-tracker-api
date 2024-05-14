const mongoose = require('mongoose');

const savingsAccountsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  savingsAccountName: {
    type: String,
    required: true,
  },
  initialDeposit: {
    type: Number,
    required: true,
    default: 0,
  },
  startDate: {
    type: Date,
    required: true,
  },
  monthlyContribution: {
    type: Number,
    required: true,
    default: 0,
  },
  contributionPeriod: {
    type: Number,
    required: true,
    default: 0,
  },
  contributionInterval: {
    type: String,
    required: true,
  },
  apy: {
    type: Number,
    required: true,
    default: 0,
  },
  // calculated
  totalSavings: {
    type: Number,
    required: true,
    default: 0,
  },
  totalContribution: {
    type: Number,
    required: true,
    default: 0,
  },
  totalInterest: {
    type: Number,
    required: true,
    default: 0,
  },
  savings: {
    type: [
      {
        currentDate: {
          type: Date,
          required: true,
        },
        interestEarned: {
          type: Number,
          required: true,
        },
        totalInterestEarned: {
          type: Number,
          required: true,
        },
        balance: {
          type: Number,
          required: true,
        }
      }
    ],
    default: [],
    required: true,
  },
});

const savingsAccountsSummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currentAllSavingsAccountsBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAllContribution: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAllInterest: {
    type: Number,
    required: true,
    default: 0,
  }
});

const savingsAccountsDatabase = mongoose.model("SavingsAccounts", savingsAccountsSchema);
const savingsAccountsSummaryDatabase = mongoose.model("SavingsAccountsSummary", savingsAccountsSummarySchema);

module.exports = {
  savingsAccountsDatabase,
  savingsAccountsSummaryDatabase
};
