import { ExchangeRateRequest, 
  MortgageRequest } from "../../../models/useful-tools/useful-tools.types.js"

export const mortgageRequestsKey = (mortgageRequest: MortgageRequest) => {
  return `mortgage-calc-req#${mortgageRequest.downpaymentFlag}:${mortgageRequest.loanAmount}:${mortgageRequest.homeValue}:${mortgageRequest.downpayment}:${mortgageRequest.interestRate}:${mortgageRequest.durationYears}:${mortgageRequest.monthlyHoa}:${mortgageRequest.annualPropertyTax}:${mortgageRequest.annualHomeInsurance}`
}

export const exchangeRateRequestsKey = (exchangeRateRequest: ExchangeRateRequest) => {
  return `exchange-rate-req#${exchangeRateRequest.fromCurrency}:${exchangeRateRequest.toCurrency}`
}

export const mortgageResultKey = (mortgageRequest: MortgageRequest) => {
  return `mortgage-calc-req:result#${mortgageRequest.downpaymentFlag}:${mortgageRequest.loanAmount}:${mortgageRequest.homeValue}:${mortgageRequest.downpayment}:${mortgageRequest.interestRate}:${mortgageRequest.durationYears}:${mortgageRequest.monthlyHoa}:${mortgageRequest.annualPropertyTax}:${mortgageRequest.annualHomeInsurance}`
}

export const exchangeRateResultKey = (exchangeRateRequest: ExchangeRateRequest) => {
  return `exchange-rate-req:result#${exchangeRateRequest.fromCurrency}:${exchangeRateRequest.toCurrency}`
}