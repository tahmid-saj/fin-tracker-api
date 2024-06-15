const INSURANCE_INTERVALS = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  semiannually: "Semiannually",
  annually: "Annually"
}
 
const INSURANCE_INTERVALS_DAYS_MULTIPLIER = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  quarterly: 92,
  semiannually: 183,
  annually: 365
}

module.exports = {
  INSURANCE_INTERVALS,
  INSURANCE_INTERVALS_DAYS_MULTIPLIER
}