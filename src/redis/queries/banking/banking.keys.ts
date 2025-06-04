import { User } from "../../../models/users/users.types.js";

export const bankingAccountsKey = (user: User, bankingAccountName: string) => `banking-account#${user.userId}:${user.email}:${bankingAccountName}`

export const bankingAccountTransactionsKey = (user: User, bankingAccountName: string) => `banking-account:transactions${user.userId}:${user.email}:${bankingAccountName}`

export const bankingSummaryKey = (user: User) => `banking-summary#${user.userId}:${user.email}`
