import { errorOnMortgageResult, errorOnCurrencyResult } from "../../errors/useful-tools.errors.js"
import { DOWNPAYMENT_FLAG_OPTIONS } from "../../constants/useful-tools.constants.js"
import { MARKET_DATA_FOREX_PREFIX } from "../../constants/market-data.constants.js"
import { polygonRestClient } from "../../../services/polygon/polygon.service.js"
import { IAggsPreviousClose } from "@polygon.io/client-js"

type ProcessedMortgageResult = {
  monthlyPayment: MonthlyPayment;
  annualPayment: AnnualPayment;
  totalInterestPaid: number | string;
}

type MonthlyPayment = {
  total: number | string;
  mortgage: number | string;
  propertyTax: number | string;
  hoa: number | string;
  annualHomeInsurance: number | string;
}

type AnnualPayment = {
  total: number | string;
  mortgage: number | string;
  propertyTax: number | string;
  hoa: number | string;
  homeInsurance: number | string;
}

// helper functions
function processMortgageResult(resJSON: any): ProcessedMortgageResult {
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
export async function getUsefulToolsMortgageCalculator(downpaymentFlag: string, loanAmount: string, homeValue: string, 
  downpayment: string, interestRate: string, durationYears: string, 
  monthlyHoa: string, annualPropertyTax: string, annualHomeInsurance: string): Promise<any> {
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
export async function getUsefulToolsExchangeRate(fromCurrency: string, toCurrency: string): Promise<{ fromCurrency: string, toCurrency: string, exchangeRate: number } | undefined> {
  const resExchangeRate = await polygonRestClient.forex.previousClose(MARKET_DATA_FOREX_PREFIX + fromCurrency + toCurrency)
    .catch((error) => {
      errorOnCurrencyResult()
      console.log(error)
      return undefined
    })
  
  if (resExchangeRate?.results) {
    return {
      fromCurrency: String(fromCurrency),
      toCurrency: String(toCurrency),
      exchangeRate: Number(resExchangeRate?.results[0]?.c)
    }
  }

  return undefined
}
