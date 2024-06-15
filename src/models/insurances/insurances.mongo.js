const mongoose = require("mongoose")

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
    required: true
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
    required: true
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

const insurancesDatabase = mongoose.model("Insurances", insurancesSchema)
const insurancesSummaryDatabase = mongoose.model("InsurancesSummary", insurancesSummarySchema)

module.exports = {
  insurancesDatabase,
  insurancesSummaryDatabase
}