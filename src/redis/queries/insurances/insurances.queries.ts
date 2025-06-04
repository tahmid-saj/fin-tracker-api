import { Insurance, insurancesSummary } from "../../../models/insurances/insurances.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { insurancesKey, insurancesSummaryKey } from "./insurances.keys.js";

// helper functions
export const serializeInsurances = (insurances: Insurance[]) => {
  return insurances.map((insurance) => {
    return `for=${insurance.insuranceFor}!payment=${insurance.insurancePayment}!interval=${insurance.insuranceInterval}!firstPaymentDate=${insurance.insuranceFirstPaymentDate}!endDate=${insurance.insuranceEndDate}`
  })
}

export const deserializeInsurances = (insurances: string[]) => {
  return {
    insurances: insurances.map((insurance) => {
    const data = insurance.split("!")
    const insuranceFor = data[0]?.split("=")[1]
    const insurancePayment = Number(data[1]?.split("=")[1])
    const insuranceInterval = data[2]?.split("=")[1]
    const insuranceFirstPaymentDate = data[3]?.split("=")[1]
    const insuranceEndDate = data[4]?.split("=")[1]

    return { insuranceFor, insurancePayment, insuranceInterval, insuranceFirstPaymentDate, insuranceEndDate }
  })}
}

export const serializeInsurancesSummary = (insurancesSummary: insurancesSummary) => {
  return insurancesSummary
}

export const deserializeInsurancesSummary = (insurancesSummary: { [key: string]: string }) => {
  return {
    insurancesSummary: {
      insuranceFor: insurancesSummary.insuranceFor,
      insurancePayment: insurancesSummary.insurancePayment,
      insuranceInterval: insurancesSummary.insuranceInterval,
      insuranceFirstPaymentDate: insurancesSummary.insuranceFirstPaymentDate,
      insuranceEndDate: insurancesSummary.insuranceEndDate
    }
  }
}

export const areInsurancesCached = async (user: User) => {
  return await redisClient.exists(insurancesKey(user))
}

export const isInsurancesSummaryCached = async (user: User) => {
  return await redisClient.exists(insurancesSummaryKey(user))
}

export const getInsurances = async (user: User) => {
  const insurances = await redisClient.lRange(insurancesKey(user), 0, -1)
  return deserializeInsurances(insurances)
}

export const getInsurancesSummary = async (user: User) => {
  const insurancesSummary = await redisClient.hGetAll(insurancesSummaryKey(user))
  return deserializeInsurancesSummary(insurancesSummary)
}

export const saveInsurances = async (user: User, insurances: Insurance[]) => {
  // save insurances
  await redisClient.rPush(insurancesKey(user), serializeInsurances(insurances))
}

export const saveInsurancesSummary = async (user: User, insurancesSummary: insurancesSummary) => {
  // save insurancesSummary
  await redisClient.hSet(insurancesSummaryKey(user), serializeInsurancesSummary(insurancesSummary))
}
