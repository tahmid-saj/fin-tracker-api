import { User } from "../../../models/users/users.types";

export const insurancesKey = (user: User) => `insurances#${user.userId}:${user.email}`

export const insurancesSummaryKey = (user: User) => `insurances-summary#${user.userId}:${user.email}`
