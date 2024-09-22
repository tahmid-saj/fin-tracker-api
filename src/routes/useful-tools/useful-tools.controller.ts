import { Request, Response } from "express"
import { getUsefulToolsMortgageCalculator, getUsefulToolsExchangeRate
} from "../../utils/requests/useful-tools/useful-tools.requests"

// useful tools

// mortgage calculator
export async function httpGetUsefulToolsMortgageCalculator(req: Request, res: Response): Promise<void> {
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
    
    if (resGetUsefulToolsMortgageCalculator) res.status(200).json(resGetUsefulToolsMortgageCalculator)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// currency converter
// exchange rate
export async function httpGetUsefulToolsExchangeRate(req: Request, res: Response): Promise<void> {
  try {
    const fromCurrency = String(req.body.fromCurrency)
    const toCurrency = String(req.body.toCurrency)
  
    const resGetUsefulToolsExchangeRate = await getUsefulToolsExchangeRate(fromCurrency, toCurrency)
  
    if (resGetUsefulToolsExchangeRate) res.status(200).json(resGetUsefulToolsExchangeRate)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
