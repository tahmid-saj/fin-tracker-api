// validations for insurances

import { insurancesSummary } from "../../../models/insurances/insurances.types.js"

export const validateGetInsurancesSummary = (insurancesSummary: insurancesSummary): boolean => {
  if (!insurancesSummary) {
    return true
  }

  return false
}
