// validations for savings

import { SavingsAccountsSummary } from "../../../models/savings/savings.types.ts";

export const validateGetSavingsAccountsSummary = (savingsAccountsSummary: SavingsAccountsSummary) => {
  if (!savingsAccountsSummary) {
    return true;
  }

  return false;
};
