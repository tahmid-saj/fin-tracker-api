const mongoose = require("mongoose")

const defaultInsuranceEndDate = new Date();
defaultInsuranceEndDate.setFullYear(defaultInsuranceEndDate.getFullYear() + 50);

const insurancesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  insuranceFor: {
    type: String,
    required: true
  },
  insurancePayment: {
    type: Number,
    required: true,
    default: 0
  },
  insuranceInterval: {
    type: String,
    required: true
  },
  insuranceFirstPaymentDate: {
    type: String,
    required: true
  },
  insuranceEndDate: {
    type: String,
    required: true,
    default: defaultInsuranceEndDate.toISOString().split('T')[0]
  }
})

const insurancesSummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentTotalInsurancePlanned: {
    type: Number,
    required: true
  }
})

export const insurancesDatabase = mongoose.model("Insurances", insurancesSchema)
export const insurancesSummaryDatabase = mongoose.model("InsurancesSummary", insurancesSummarySchema)
