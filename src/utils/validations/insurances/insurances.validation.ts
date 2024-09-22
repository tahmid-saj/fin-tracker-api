// validations for insurances

import { insurancesSummary } from "../../../models/insurances/insurances.types.ts"

export const validateGetInsurancesSummary = (insurancesSummary: insurancesSummary): boolean => {
  if (!insurancesSummary) {
    return true
  }

  return false
}
