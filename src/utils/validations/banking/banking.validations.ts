// validations for banking

import { BankingSummary } from "../../../models/banking/banking.types.ts";

export const validategetBankingSummary = (bankingSummary: BankingSummary): boolean => {
  if (!bankingSummary) {
    return true;
  }

  return false;
};
