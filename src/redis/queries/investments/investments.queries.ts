import { Investment, InvestmentCalculationRecord, InvestmentsSummary } from "../../../models/investments/investments.types";
import { User } from "../../../models/users/users.types";
import { redisClient } from "../../../services/redis/redis.service";
import { investmentCalculationRecordsKey, investmentKey, investmentsSummaryKey, userInvestmentsKey } from "./investments.keys";

// helper functions
export const serializeInvestment = (investment: Investment) => {
  return {}
}

export const serializeInvestmentCalculationRecords = (investment: Investment) => {
  return []
}

export const serializeInvestmentsSummary = (investmentsSummary: InvestmentsSummary) => {
  return {}
}

export const deserializeInvestment = (investment: { [key: string]: string }) => {
  return {}
}

export const deserializeInvestmentCalculationRecords = (investmentCalculationRecords: string[]) => {
  return []
}

export const deserializeInvestmentsSummary = (investmentsSummary: { [key: string]: string }) => {
  return {}
}

export const areInvestmentsCached = async (user: User) => {
  return await redisClient.exists(userInvestmentsKey(user))
}

export const isInvestmentsSummaryCached = async (user: User) => {
  return await redisClient.exists(investmentsSummaryKey(user))
}

export const getInvestments = async (user: User) => {
  const investments = await redisClient.sMembers(userInvestmentsKey(user))
  
  return {
    investments: investments.map(async (investment) => {
      const resInvestment = await redisClient.hGetAll(investmentKey(user, investment))
      const resInvestmentCalculationRecords = await redisClient.lRange(investmentCalculationRecordsKey(user, investment), 0, -1)

      const deserializedInvestment = deserializeInvestment(resInvestment)
      const deserializedInvestmentCalculationRecords = deserializeInvestmentCalculationRecords(resInvestmentCalculationRecords)

      return {
        ...deserializedInvestment,
        investments: deserializedInvestmentCalculationRecords
      }
    })
  }
}

export const getInvestmentsSummary = async (user: User) => {
  const investmentsSummary = await redisClient.hGetAll(investmentsSummaryKey(user))
  return deserializeInvestment(investmentsSummary)
}

export const saveInvestments = async (user: User, investments: Investment[]) => {
  investments.map(async (investment) => {
    await Promise.all([
      // add the investment to the investments set
      redisClient.sAdd(userInvestmentsKey(user), investment.investmentName),

      // add the investment fields to the hash
      redisClient.hSet(investmentKey(user, investment.investmentName), 
        serializeInvestment(investment)),

      // add the investment calculation records to the list
      redisClient.rPush(investmentCalculationRecordsKey(user, investment.investmentName),
        serializeInvestmentCalculationRecords(investment))
    ])
  })
}

export const saveInvestmentsSummary = async (user: User, 
  investmentsSummary: InvestmentsSummary) => {
  await redisClient.hSet(investmentsSummaryKey(user),
    serializeInvestmentsSummary(investmentsSummary))
}