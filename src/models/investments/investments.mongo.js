const mongoose = require('mongoose');

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

const investmentsDatabase = mongoose.model("Investments", investmentsSchema);
const investmentsSummaryDatabase = mongoose.model("InvestmentsSummary", investmentsSummarySchema);

module.exports = {
  investmentsDatabase,
  investmentsSummaryDatabase
};
