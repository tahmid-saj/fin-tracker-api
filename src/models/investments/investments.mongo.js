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
  },
  startDate: {
    type: Date,
    required: true,
  },
  afterYears: {
    type: Number,
    required: true,
  },
  returnRate: {
    type: Number,
    required: true,
  },
  compounded: {
    type: String,
    required: true,
  },
  additionalContribution: {
    type: Number,
    required: true,
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
  currentAllInvestmentsBalance: {
    type: Number,
    required: true,
  },
  totalAllContribution: {
    type: Number,
    required: true,
  },
  totalAllInterest: {
    type: Number,
    required: true,
  }
});

const investmentsDatabase = mongoose.model("Investments", investmentsSchema);
const investmentsSummaryDatabase = mongoose.model("InvestmentsSummary", investmentsSummarySchema);

module.exports = {
  investmentsDatabase,
  investmentsSummaryDatabase
};
