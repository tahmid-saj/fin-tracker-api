import { Investment, InvestmentCalculationRecord, 
  InvestmentsSummary } from "../../../models/investments/investments.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { investmentCalculationRecordsKey, investmentKey, 
  investmentsSummaryKey, userInvestmentsKey } from "./investments.keys.js";

// helper functions
export const serializeInvestment = (investment: Investment) => {
  return {
    investmentName: investment.investmentName,
    investmentType: investment.investmentType,
    startingAmount: investment.startingAmount,
    startDate: String(investment.startDate),
    afterYears: investment.afterYears,
    returnRate: investment.returnRate,
    compounded: investment.compounded,
    additionalContribution: investment.additionalContribution,
    contributionAt: investment.contributionAt,
    contributionInterval: investment.contributionInterval,

    endBalance: investment.endBalance,
    totalContribution: investment.totalContribution,
    totalInterest: investment.totalInterest
  }
}

export const serializeInvestmentCalculationRecords = (investments: InvestmentCalculationRecord[]) => {
  return investments.map((investmentRecord) => {
    return `date=${investmentRecord.currentDate}!contrib=${investmentRecord.contribution}!interestAcc=${investmentRecord.interestAccumulated}!endBalance=${investmentRecord.endingBalance}`
  })
}

export const serializeInvestmentsSummary = (investmentsSummary: InvestmentsSummary) => {
  let summary: InvestmentsSummary = {
    currentAllInvestmentsBalance: 0,
    totalAllContribution: 0,
    totalAllInterest: 0
  }

  if (investmentsSummary.currentAllInvestmentsBalance) summary.currentAllInvestmentsBalance = investmentsSummary.currentAllInvestmentsBalance
  if (investmentsSummary.totalAllContribution) summary.totalAllContribution = investmentsSummary.totalAllContribution
  if (investmentsSummary.totalAllInterest) summary.totalAllInterest = investmentsSummary.totalAllInterest

  return summary
}

export const deserializeInvestment = (investment: { [key: string]: string }): Investment => {  
  return {
    investmentName: investment.investmentName!,
    investmentType: investment.investmentType!,
    startingAmount: Number(investment.startingAmount)!,
    startDate: investment.startDate!,
    afterYears: Number(investment.afterYears!),
    returnRate: Number(investment.returnRate!),
    compounded: investment.compounded!,
    additionalContribution: Number(investment.additionalContribution!),
    contributionAt: investment.contributionAt!,
    contributionInterval: investment.contributionInterval!,

    endBalance: Number(investment.endBalance!),
    totalContribution: Number(investment.totalContribution!),
    totalInterest: Number(investment.totalInterest!),

    investments: []
  }
}

export const deserializeInvestmentCalculationRecords = (investmentCalculationRecords: string[]): InvestmentCalculationRecord[] => {
  return investmentCalculationRecords.map((record) => {
    const data = record.split("!")
    const currentDate = data[0]?.split("=")[1]!
    const contribution = Number(data[1]?.split("=")[1])
    const interestAccumulated = Number(data[2]?.split("=")[1])
    const endingBalance = Number(data[3]?.split("=")[1])

    return {
      currentDate, contribution, interestAccumulated, endingBalance
    }
  })
}

export const deserializeInvestmentsSummary = (investmentsSummary: { [key: string]: string }) => {
  let summary: InvestmentsSummary = {}
  
  if (investmentsSummary.currentAllInvestmentsBalance) summary.currentAllInvestmentsBalance = Number(investmentsSummary.currentAllInvestmentsBalance)
  if (investmentsSummary.totalAllContribution) summary.totalAllContribution = Number(investmentsSummary.totalAllContribution)
  if (investmentsSummary.totalAllInterest) summary.totalAllInterest = Number(investmentsSummary.totalAllInterest)
  return {
    investmentsSummary: summary
  }
}

export const areInvestmentsCached = async (user: User) => {
  return await redisClient.exists(userInvestmentsKey(user))
}

export const isInvestmentsSummaryCached = async (user: User) => {
  return await redisClient.exists(investmentsSummaryKey(user))
}

export const getInvestments = async (user: User) => {
  const investments = await redisClient.sMembers(userInvestmentsKey(user))

  const resInvestments = await Promise.all(
    investments.map(async (investment) => {
      const resInvestment = await redisClient.hGetAll(investmentKey(user, investment))
      const resInvestmentCalculationRecords = await redisClient.lRange(investmentCalculationRecordsKey(user, investment), 0, -1)

      const deserializedInvestment = deserializeInvestment(resInvestment)
      deserializedInvestment.investments = deserializeInvestmentCalculationRecords(resInvestmentCalculationRecords)

      return deserializedInvestment
    })
  )

  return {
    investments: resInvestments
  }
}

export const getInvestmentsSummary = async (user: User) => {
  const investmentsSummary = await redisClient.hGetAll(investmentsSummaryKey(user))
  return deserializeInvestmentsSummary(investmentsSummary)
}

export const saveInvestments = async (user: User, investments: Investment[]) => {
  await Promise.all(
    investments.map(async (investment) => {
      const serializedInvestment = serializeInvestment(investment)
      const serializedInvestmentCalculationRecords = serializeInvestmentCalculationRecords(investment.investments)
  
      await Promise.all([
        // add the investment to the investments set
        redisClient.sAdd(userInvestmentsKey(user), investment.investmentName),
  
        // add the investment fields to the hash
        redisClient.hSet(investmentKey(user, investment.investmentName), 
          serializedInvestment),
  
        // add the investment calculation records to the list
        redisClient.rPush(investmentCalculationRecordsKey(user, investment.investmentName),
          serializedInvestmentCalculationRecords)
      ])
    })
  )
}

export const saveInvestmentsSummary = async (user: User, 
  investmentsSummary: InvestmentsSummary) => {
  await redisClient.hSet(investmentsSummaryKey(user),
    serializeInvestmentsSummary(investmentsSummary))
}