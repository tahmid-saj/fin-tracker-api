import { User } from "../../../models/users/users.types.js";

export const userBankingAccountsKey = (user: User) => `user-banking-accounts#${user.userId}:${user.email}`

export const bankingAccountKey = (user: User, bankingAccountName: string) => `user-banking-account#${user.userId}:${user.email}:${bankingAccountName}`

export const bankingAccountTransactionsKey = (user: User, bankingAccountName: string) => `banking-account:transactions${user.userId}:${user.email}:${bankingAccountName}`

export const bankingSummaryKey = (user: User) => `banking-summary#${user.userId}:${user.email}`
