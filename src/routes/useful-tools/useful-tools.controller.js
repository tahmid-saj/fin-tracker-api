const { getUsefulToolsMortgageCalculator, getUsefulToolsExchangeRate
} = require("../../utils/requests/useful-tools/useful-tools.requests")

// useful tools

// mortgage calculator
async function httpGetUsefulToolsMortgageCalculator(req, res) {
  try {
    const downpaymentFlag = String(req.body.downpaymentFlag)
    const loanAmount = String(req.body.loanAmount)
    const homeValue = String(req.body.homeValue)
    const downpayment = String(req.body.downpayment)
    const interestRate = String(req.body.interestRate)
    const durationYears = String(req.body.durationYears)
  
    const monthlyHoa = String(req.body.monthlyHoa)
    const annualPropertyTax = String(req.body.annualPropertyTax)
    const annualHomeInsurance = String(req.body.annualHomeInsurance)
  
    const resGetUsefulToolsMortgageCalculator = await getUsefulToolsMortgageCalculator(
      downpaymentFlag, loanAmount, homeValue, downpayment, interestRate, durationYears, 
      monthlyHoa, annualPropertyTax, annualHomeInsurance)
    
    if (resGetUsefulToolsMortgageCalculator) return res.status(200).json(resGetUsefulToolsMortgageCalculator)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// currency converter
// exchange rate
async function httpGetUsefulToolsExchangeRate(req, res) {
  try {
    const fromCurrency = String(req.body.fromCurrency)
    const toCurrency = String(req.body.toCurrency)
  
    const resGetUsefulToolsExchangeRate = await getUsefulToolsExchangeRate(fromCurrency, toCurrency)
  
    if (resGetUsefulToolsExchangeRate) return res.status(200).json(resGetUsefulToolsExchangeRate)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetUsefulToolsMortgageCalculator,
  httpGetUsefulToolsExchangeRate
}