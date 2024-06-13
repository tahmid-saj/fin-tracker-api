const { errorOnMortgageResult, errorOnCurrencyResult } = require("../../errors/useful-tools.errors")
const { DOWNPAYMENT_FLAG_OPTIONS } = require("../../constants/useful-tools.constants")
const { MARKET_DATA_FOREX_PREFIX } = require("../../constants/market-data.constants")
const { polygonRestClient } = require("../../../services/polygon/polygon.service")

// helper functions
async function processMortgageResult(resJSON) {
  return {
    monthlyPayment: {
      total: resJSON.monthly_payment.total,
      mortgage: resJSON.monthly_payment.mortgage,
      propertyTax: resJSON.monthly_payment.property_tax,
      hoa: resJSON.monthly_payment.hoa,
      annualHomeInsurance: resJSON.monthly_payment.annual_home_ins,
    },
    annualPayment: {
      total: resJSON.annual_payment.total,
      mortgage: resJSON.annual_payment.mortgage,
      propertyTax: resJSON.annual_payment.property_tax,
      hoa: resJSON.annual_payment.hoa,
      homeInsurance: resJSON.annual_payment.home_insurance,
    },
    totalInterestPaid: resJSON.total_interest_paid
  }
}

// mortgage calculator
async function getUsefulToolsMortgageCalculator(downpaymentFlag, loanAmount, homeValue, downpayment, interestRate, durationYears, 
  monthlyHoa, annualPropertyTax, annualHomeInsurance) {
  try {
    let url;
    if (downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.no) {
      url = `${process.env.REACT_APP_API_NINJAS_MORTGAGE_CALCULATOR_URL}?loan_amount=${loanAmount}`
    } else if (downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.yes) {
      url = `${process.env.REACT_APP_API_NINJAS_MORTGAGE_CALCULATOR_URL}?home_value=${homeValue}&downpayment=${downpayment}`
    }

    url = url + `&interest_rate=${interestRate}&duration_years=${durationYears}`

    if (monthlyHoa !== "") {
      url = url + `&monthly_hoa=${monthlyHoa}`
    } else if (annualPropertyTax !== "") {
      url = url + `&annual_property_tax=${annualPropertyTax}`
    } else if (annualHomeInsurance !== "") {
      url = url + `&annual_home_insurance=${annualHomeInsurance}`
    }

    const resMortgageResult = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}`
      }
    })

    const resJSON = await resMortgageResult.json()
    const res = await processMortgageResult(resJSON)
    return {
      mortgageCalculation: res
    }
  } catch (error) {
    errorOnMortgageResult()
    console.log(error)
  }
}

// currency converter
// exchange rate
async function getUsefulToolsExchangeRate(fromCurrency, toCurrency) {
  const resExchangeRate = await polygonRestClient.forex.previousClose(MARKET_DATA_FOREX_PREFIX + fromCurrency + toCurrency)
    .catch((error) => {
      errorOnCurrencyResult()
      console.log(error)
      return undefined
    })
  
  return {
    fromCurrency: String(fromCurrency),
    toCurrency: String(toCurrency),
    exchangeRate: Number(resExchangeRate.results[0].c)
  }
}

module.exports = {
  getUsefulToolsMortgageCalculator,
  getUsefulToolsExchangeRate
}