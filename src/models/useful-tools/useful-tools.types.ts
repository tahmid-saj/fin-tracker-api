
// useful tools types

export type MortgageRequest = {
  downpaymentFlag: string,
  loanAmount: string,
  homeValue: string,
  downpayment: string,
  interestRate: string,
  durationYears: string,

  monthlyHoa: string,
  annualPropertyTax: string,
  annualHomeInsurance: string
}

export type ExchangeRateRequest = {
  fromCurrency: string,
  toCurrency: string
}

export type MortgageResult = {
  mortgageCalculation: ProcessedMortgageResult
}

export type ProcessedMortgageResult = {
  monthlyPayment: MonthlyPayment;
  annualPayment: AnnualPayment;
  totalInterestPaid: number | string;
}

export type MonthlyPayment = {
  total: number | string;
  mortgage: number | string;
  propertyTax: number | string;
  hoa: number | string;
  annualHomeInsurance: number | string;
}

export type AnnualPayment = {
  total: number | string;
  mortgage: number | string;
  propertyTax: number | string;
  hoa: number | string;
  homeInsurance: number | string;
}

export type ExchangeRateResult = {
  fromCurrency: string, 
  toCurrency: string, 
  exchangeRate: number
}