// validations for savings

const validateGetSavingsAccountsSummary = (savingsAccountsSummary) => {
  if (!savingsAccountsSummary) {
    return true;
  }

  return false;
};

module.exports = {
  validateGetSavingsAccountsSummary,
}