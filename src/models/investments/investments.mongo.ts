import mongoose from 'mongoose'

const investmentsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  investmentName: {
    type: String,
    required: true,
  },
  investmentType: {
    type: String,
    required: true,
  },
  startingAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  startDate: {
    type: Date,
    required: true,
  },
  afterYears: {
    type: Number,
    required: true,
    default: 0,
  },
  returnRate: {
    type: Number,
    required: true,
    default: 0,
  },
  compounded: {
    type: String,
    required: true,
  },
  additionalContribution: {
    type: Number,
    required: true,
    default: 0,
  },
  contributionAt: {
    type: String,
    required: true,
  },
  contributionInterval: {
    type: String,
    required: true,
  },
  // calculated
  endBalance: {
    type: Number,
    required: true,
    default: 0
  },
  totalContribution: {
    type: Number,
    required: true,
    default: 0
  },
  totalInterest: {
    type: Number,
    required: true,
    default: 0
  },
  investments: {
    type: [
      {
        currentDate: {
          type: Date,
          required: true
        },
        contribution: {
          type: Number,
          required: true
        },
        interestAccumulated: {
          type: Number,
          required: true,
        },
        endingBalance: {
          type: Number,
          required: true
        }
      }
    ],
    default: [],
    required: true
  }
});

const investmentsSummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currentAllInvestmentsBalance: {
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

export const investmentsDatabase = mongoose.model("Investments", investmentsSchema);
export const investmentsSummaryDatabase = mongoose.model("InvestmentsSummary", investmentsSummarySchema);