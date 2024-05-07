// validations for expenses

const validateGetExpensesSummary = (expensesSummary) => {
  if (!expensesSummary) {
    return true
  }

  return false
}

module.exports = {
  validateGetExpensesSummary,
}