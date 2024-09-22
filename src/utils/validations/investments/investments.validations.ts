import { InvestmentsSummary } from "../../../models/investments/investments.types.ts";

// validations for investments

export const validateGetInvestmentsSummary = (investmentsSummary: InvestmentsSummary): boolean => {
  if (!investmentsSummary) {
    return true;
  }

  return false;
};
