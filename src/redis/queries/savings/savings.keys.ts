import { User } from "../../../models/users/users.types";

export const userSavingsAccountsKey = (user: User) => `user-sav-accounts#${user.userId}:${user.email}`

export const savingsAccountKey = (user: User, savingsAccountName: string) => `user-sav-account#${user.userId}:${user.email}:${savingsAccountName}`

export const savingsAccountCalculationRecordsKey = (user: User, savingsAccountName: string) => `sav-account:calc-records#${user.userId}:${user.email}:${savingsAccountName}`

export const savingsAccountsSummaryKey = (user: User) => `savings-summary#${user.userId}:${user.email}`
