import { Request, Response } from "express"
import { getUsefulToolsMortgageCalculator, getUsefulToolsExchangeRate
} from "../../utils/requests/useful-tools/useful-tools.requests.js"
import { ExchangeRateRequest, MortgageRequest } from "../../models/useful-tools/useful-tools.types.js"
import { getExchangeRateResult, getMortgageResult, 
  hasExchangeRateRequestBeenAsked, hasMortgageRequestBeenAsked, 
  saveExchangeRateRequest, saveMortgageRequest } from "../../redis/queries/useful-tools/useful-tools.queries.js"

// useful tools

// mortgage calculator
export async function httpGetUsefulToolsMortgageCalculator(req: Request, res: Response): Promise<any> {
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

    const mortgageRequest: MortgageRequest = {
      downpaymentFlag,
      loanAmount,
      homeValue,
      downpayment,
      interestRate,
      durationYears,

      monthlyHoa,
      annualPropertyTax,
      annualHomeInsurance
    }

    const hasMortgageRequest = await hasMortgageRequestBeenAsked(mortgageRequest)
    if (hasMortgageRequest) {
      const resMortgageResult = await getMortgageResult(mortgageRequest)
      return res.status(200).json(resMortgageResult)
    } else {
      const resGetUsefulToolsMortgageCalculator = await getUsefulToolsMortgageCalculator(
        downpaymentFlag, loanAmount, homeValue, downpayment, interestRate, durationYears, 
        monthlyHoa, annualPropertyTax, annualHomeInsurance)
      
      if (resGetUsefulToolsMortgageCalculator) {
        saveMortgageRequest(mortgageRequest, resGetUsefulToolsMortgageCalculator)
        return res.status(200).json(resGetUsefulToolsMortgageCalculator)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// currency converter
// exchange rate
export async function httpGetUsefulToolsExchangeRate(req: Request, res: Response): Promise<any> {
  try {
    const fromCurrency = String(req.body.fromCurrency)
    const toCurrency = String(req.body.toCurrency)

    const exchangeRateRequest: ExchangeRateRequest = {
      fromCurrency,
      toCurrency
    }

    const hasExchangeRateRequest = await hasExchangeRateRequestBeenAsked(exchangeRateRequest)
    if (hasExchangeRateRequest) {
      const resExchangeRateResult = await getExchangeRateResult(exchangeRateRequest)
      return res.status(200).json(resExchangeRateResult)
    } else {
      const resGetUsefulToolsExchangeRate = await getUsefulToolsExchangeRate(fromCurrency, toCurrency)
    
      if (resGetUsefulToolsExchangeRate) {
        saveExchangeRateRequest(exchangeRateRequest, resGetUsefulToolsExchangeRate)
        return res.status(200).json(resGetUsefulToolsExchangeRate)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
