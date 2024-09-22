// expenses types

export type UserId = string;
export type Email = string;
export type RemovingExpenseId = number;

export type Expense = {
  expenseFor: string;
  expenseCost: number;
  expenseDate: string;
  expenseCategory: string;
  expenseId: number;
}

export type ExpensesSummary = {
  currentAllExpensesCost?: number;
  currentAllExpensesCategories?: string[];
  pastMonthAllExpensesCost?: number;
  pastMonthExpenses?: Expense[];
}

export type ExpenseInfo = {
  expenseFor: string;
  expenseCost: number;
  expenseDate: string;
  expenseCategory: string;
  expenseId: number;
}