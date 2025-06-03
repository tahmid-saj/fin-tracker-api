import { ExchangeRateRequest, ExchangeRateResult, MortgageRequest, MortgageResult } from "../../../models/useful-tools/useful-tools.types";
import { redisClient } from "../../../services/redis/redis.service";
import { exchangeRateRequestsKey, exchangeRateResultKey, exchangeRateUniqueRequestsKey, 
  mortgageRequestsKey, mortgageResultKey, mortgageUniqueRequestsKey } from "./useful-tools.keys";

// helper functions
export const serializeMortgageResult = (mortgageResult: MortgageResult) => {
  return {
    monthlyPaymentTotal: mortgageResult.mortgageCalculation.monthlyPayment.total,
    monthlyPaymentMortgage: mortgageResult.mortgageCalculation.monthlyPayment.mortgage,
    monthlyPaymentPropertyTax: mortgageResult.mortgageCalculation.monthlyPayment.propertyTax,
    monthlyPaymentHoa: mortgageResult.mortgageCalculation.monthlyPayment.hoa,
    monthlyPaymentAnnualHomeInsurance: mortgageResult.mortgageCalculation.monthlyPayment.annualHomeInsurance,

    annualPaymentTotal: mortgageResult.mortgageCalculation.annualPayment.total,
    annualPaymentMortgage: mortgageResult.mortgageCalculation.annualPayment.mortgage,
    annualPaymentPropertyTax: mortgageResult.mortgageCalculation.annualPayment.propertyTax,
    annualPaymentHoa: mortgageResult.mortgageCalculation.annualPayment.hoa,
    annualPaymentHomeInsurance: mortgageResult.mortgageCalculation.annualPayment.homeInsurance,

    totalInterestPaid: mortgageResult.mortgageCalculation.totalInterestPaid
  }
}

export const deserializeMortgageResult = (mortgageResult: { [key: string]: string }): MortgageResult => {
  return {
    mortgageCalculation: {
      monthlyPayment: {
        total: mortgageResult.monthlyPaymentTotal!,
        mortgage: mortgageResult.monthlyPaymentMortgage!,
        propertyTax: mortgageResult.monthlyPaymentPropertyTax!,
        hoa: mortgageResult.monthlyPaymentHoa!,
        annualHomeInsurance: mortgageResult.monthlyPaymentAnnualHomeInsurance!
      },

      annualPayment: {
        total: mortgageResult.annualPaymentTotal!,
        mortgage: mortgageResult.annualPaymentMortgage!,
        propertyTax: mortgageResult.annualPaymentPropertyTax!,
        hoa: mortgageResult.annualPaymentHoa!,
        homeInsurance: mortgageResult.annualPaymentHomeInsurance!
      },

      totalInterestPaid: mortgageResult.totalInterestPaid!
    }
  }
}

export const serializeExchangeRateResult = (exchangeRateResult: ExchangeRateResult) => {
  return {
    fromCurrency: exchangeRateResult.fromCurrency,
    toCurrency: exchangeRateResult.toCurrency,
    exchangeRate: exchangeRateResult.exchangeRate
  }
}

export const deserializeExchangeRateResult = (exchangeRateResult: { [key: string]: string }): ExchangeRateResult => {
  return {
    fromCurrency: exchangeRateResult.fromCurrency!,
    toCurrency: exchangeRateResult.toCurrency!,
    exchangeRate: Number(exchangeRateResult.exchangeRate)!
  }
}

export const hasMortgageRequestBeenAsked = async (mortgageRequest: MortgageRequest) => {
  const inserted = await redisClient.pfAdd(mortgageUniqueRequestsKey(), mortgageRequestsKey(mortgageRequest))
  if (!inserted) {
    return true
  }

  return false
}

export const hasExchangeRateRequestBeenAsked = async (exchangeRateRequest: ExchangeRateRequest) => {
  const inserted = await redisClient.pfAdd(exchangeRateUniqueRequestsKey(), exchangeRateRequestsKey(exchangeRateRequest))
  if (!inserted) {
    return true
  }

  return false
}

export const getMortgageResult = async (mortgageRequest: MortgageRequest) => {
  const mortgageResult = await redisClient.hGetAll(mortgageRequestsKey(mortgageRequest))
  return deserializeMortgageResult(mortgageResult)
}

export const getExchangeRateResult = async (exchangeRateRequest: ExchangeRateRequest) => {
  const exchangeRateResult = await redisClient.hGetAll(exchangeRateRequestsKey(exchangeRateRequest))
  return deserializeExchangeRateResult(exchangeRateResult)
}

export const saveMortgageRequest = async (mortgageRequest: MortgageRequest, mortgageResult: MortgageResult) => {
  if (!mortgageRequest) return

  const serializedMortgageResult = serializeMortgageResult(mortgageResult)

  await Promise.all([
    // we'll store the request in a hash
    redisClient.hSet(mortgageRequestsKey(mortgageRequest), {
      ...mortgageRequest
    }),

    // we'll also store the request's result in a list
    redisClient.hSet(mortgageResultKey(mortgageRequest), serializedMortgageResult)
  ])
}

export const saveExchangeRateRequest = async (exchangeRateRequest: ExchangeRateRequest, exchangeRateResult: ExchangeRateResult) => {
  if (!exchangeRateRequest) return

  const serializedExchangeRateResult = serializeExchangeRateResult(exchangeRateResult)
  
  await Promise.all([
    // we'll store the request in a hash
    redisClient.hSet(exchangeRateRequestsKey(exchangeRateRequest), {
      ...exchangeRateRequest
    }),

    // we'll also store the request's result in a hash
    redisClient.hSet(exchangeRateResultKey(exchangeRateRequest), {
      ...serializedExchangeRateResult
    })  
  ])
}

