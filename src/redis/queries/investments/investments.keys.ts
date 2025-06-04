import { User } from "../../../models/users/users.types.js";

// set containing all of investment names of user:
export const userInvestmentsKey = (user: User) => `user-investments#${user.userId}:${user.email}`

// hash containing investment fields
export const investmentKey = (user: User, investmentName: string) => `user-investment#${user.userId}:${user.email}:${investmentName}`

// list containing investment calculation records
export const investmentCalculationRecordsKey = (user: User, investmentName: string) => `investment:calc-records#${user.userId}:${user.email}:${investmentName}`

export const investmentsSummaryKey = (user: User) => `investments-summary#${user.userId}:${user.email}`
