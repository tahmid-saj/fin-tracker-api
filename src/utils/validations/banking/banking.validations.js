// validations for banking

const validategetBankingSummary = (bankingSummary) => {
  if (!bankingSummary) {
    return true;
  }

  return false;
};

module.exports = {
  validategetBankingSummary,
}