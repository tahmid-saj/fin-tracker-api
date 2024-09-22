// insurances types

export type UserId = string;
export type Email = string;
export type RemovingInsuranceFor = string;

export type InsuranceInfo = {
  insuranceFor: string;
  insurancePayment: number;
  insuranceInterval: string;
  insuranceFirstPaymentDate: string;
  insuranceEndDate: string;
}

export type Insurance = {
  insuranceFor: string;
  insurancePayment: number;
  insuranceInterval: string;
  insuranceFirstPaymentDate: string;
  insuranceEndDate: string;
}

export type insurancesSummary = {
  currentTotalInsurancePlanned: number;
}