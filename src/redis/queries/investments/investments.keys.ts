import { User } from "../../../models/users/users.types";

// set containing all of investment names of user:
export const userInvestmentsKey = (user: User) => `investments#${user.userId}:${user.email}`

// hash containing investment fields
export const investmentKey = (user: User, investmentName: string) => `investments#${user.userId}:${user.email}:${investmentName}`

// list containing investment calculation records
export const investmentCalculationRecordsKey = (user: User, investmentName: string) => `investments:calc-record#${user.userId}:${user.email}:${investmentName}`

export const investmentsSummaryKey = (user: User) => `investments-summary#${user.userId}:${user.email}`
