// validations for investments

const validateGetInvestmentsSummary = (investmentsSummary) => {
  if (!investmentsSummary) {
    return true;
  }

  return false;
};

module.exports = {
  validateGetInvestmentsSummary,
}