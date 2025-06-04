import { User } from "../../../models/users/users.types.js";

export const expensesKey = (user: User) => `expenses#${user.userId}:${user.email}`

export const expensesSummaryKey = (user: User) => `expenses-summary#${user.userId}:${user.email}`

export const expensesSummaryCategoriesKey = (user: User) => `expenses-summary-categories#${user.userId}:${user.email}`

export const expensesSummaryPastMonthExpensesKey = (user: User) => `expenses-summary-past-month#${user.userId}:${user.email}`
