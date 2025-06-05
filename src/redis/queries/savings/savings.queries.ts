import { SavingsAccount, SavingsAccountsSummary, SavingsCalculationRecord } from "../../../models/savings/savings.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { savingsAccountCalculationRecordsKey, savingsAccountKey, savingsAccountsSummaryKey, 
  userSavingsAccountsKey } from "./savings.keys.js";

// helper functions
export const serializeSavingsAccount = (savingsAccount: SavingsAccount) => {
  return {
    savingsAccountName: savingsAccount.savingsAccountName,
    initialDeposit: savingsAccount.initialDeposit,
    startDate: String(savingsAccount.startDate),
    monthlyContribution: savingsAccount.monthlyContribution,
    contributionPeriod: savingsAccount.contributionPeriod,
    contributionInterval: savingsAccount.contributionInterval,
    apy: savingsAccount.apy,

    totalSavings: savingsAccount.totalSavings,
    totalContribution: savingsAccount.totalContribution,
    totalInterest: savingsAccount.totalInterest
  }
}

export const serializeSavingsAccountCalculationRecords = (savings: SavingsCalculationRecord[]) => {
  return savings.map((savingsRecord) => {
    return `date=${savingsRecord.currentDate}!interestEarned=${savingsRecord.interestEarned}!totalInterestEarned=${savingsRecord.totalInterestEarned}!balance=${savingsRecord.balance}`
  })
}

export const serializeSavingsAccountsSummary = (savingsAccountsSummary: SavingsAccountsSummary) => {
  let summary: SavingsAccountsSummary = {
    currentAllSavingsAccountsBalance: 0,
    totalAllContribution: 0,
    totalAllInterest: 0
  }

  if (savingsAccountsSummary.currentAllSavingsAccountsBalance) summary.currentAllSavingsAccountsBalance = savingsAccountsSummary.currentAllSavingsAccountsBalance
  if (savingsAccountsSummary.totalAllContribution) summary.totalAllContribution = savingsAccountsSummary.totalAllContribution
  if (savingsAccountsSummary.totalAllInterest) summary.totalAllInterest = savingsAccountsSummary.totalAllInterest

  return summary
}

export const deserializeSavingsAccount = (savingsAccount: { [key: string]: string }): SavingsAccount => {
  return {
    savingsAccountName: savingsAccount.savingsAccountName!,
    initialDeposit: Number(savingsAccount.initialDeposit!),
    startDate: savingsAccount.startDate!,
    monthlyContribution: Number(savingsAccount.monthlyContribution!),
    contributionPeriod: Number(savingsAccount.contributionPeriod!),
    contributionInterval: savingsAccount.contributionInterval!,
    apy: Number(savingsAccount.apy!),

    totalSavings: Number(savingsAccount.totalSavings!),
    totalContribution: Number(savingsAccount.totalContribution!),
    totalInterest: Number(savingsAccount.totalInterest!),

    savings: []
  }
}

export const deserializeSavingsAccountCalculationRecords = (savingsCalculationRecords: string[]): SavingsCalculationRecord[] => {
  return savingsCalculationRecords.map((record) => {
    const data = record.split("!")
    const currentDate = data[0]?.split("=")[1]!
    const interestEarned = Number(data[1]?.split("=")[1])
    const totalInterestEarned = Number(data[2]?.split("=")[1])
    const balance = Number(data[3]?.split("=")[1])

    return { currentDate, interestEarned, totalInterestEarned, balance }
  })
}

export const deserializeSavingsAccountsSummary = (savingsAccountsSummary: { [key: string]: string }) => {
  let summary: SavingsAccountsSummary = {}

  if (savingsAccountsSummary.currentAllSavingsAccountsBalance) summary.currentAllSavingsAccountsBalance = Number(savingsAccountsSummary.currentAllSavingsAccountsBalance)
  if (savingsAccountsSummary.totalAllContribution) summary.totalAllContribution = Number(savingsAccountsSummary.totalAllContribution)
  if (savingsAccountsSummary.totalAllInterest) summary.totalAllInterest = Number(savingsAccountsSummary.totalAllInterest)
  return {
    savingsAccountsSummary: summary
  }
}

export const areSavingsAccountsCached = async (user: User) => {
  return await redisClient.exists(userSavingsAccountsKey(user))
}

export const isSavingsAccountsSummaryCached = async (user: User) => {
  return await redisClient.exists(savingsAccountsSummaryKey(user))
}

export const getSavingsAccounts = async (user: User) => {
  const savingsAccounts = await redisClient.sMembers(userSavingsAccountsKey(user))

  const resSavingsAccounts = await Promise.all(
    savingsAccounts.map(async (savingsAccount) => {
      const resSavingsAccount = await redisClient.hGetAll(savingsAccountKey(user, savingsAccount))
      const resSavingsAccountCalculationRecords = await redisClient.lRange(savingsAccountCalculationRecordsKey(user, savingsAccount), 0, -1)

      const deserializedSavingsAccount = deserializeSavingsAccount(resSavingsAccount)
      deserializedSavingsAccount.savings = deserializeSavingsAccountCalculationRecords(resSavingsAccountCalculationRecords)

      return deserializedSavingsAccount
    })
  )

  return {
    savingsAccounts: resSavingsAccounts
  }
}

export const getSavingsAccountsSummary = async (user: User) => {
  const savingsAccountsSummary = await redisClient.hGetAll(savingsAccountsSummaryKey(user))
  return deserializeSavingsAccountsSummary(savingsAccountsSummary)
}

export const saveSavingsAccounts = async (user: User, savingsAccounts: SavingsAccount[]) => {
  await Promise.all(
    savingsAccounts.map(async (savingsAccount) => {
      const serializedSavingsAccount = serializeSavingsAccount(savingsAccount)
      const serializedSavingsAccountCalculationRecords = serializeSavingsAccountCalculationRecords(savingsAccount.savings)

      await Promise.all([
        // add the savingsAccount to the set
        redisClient.sAdd(userSavingsAccountsKey(user), savingsAccount.savingsAccountName),

        // add the savingsAccount fields to the hash
        redisClient.hSet(savingsAccountKey(user, savingsAccount.savingsAccountName), 
          serializedSavingsAccount),

        // add the savings calculation records to the list
        redisClient.rPush(savingsAccountCalculationRecordsKey(user, savingsAccount.savingsAccountName),
          serializedSavingsAccountCalculationRecords)
      ])
    })
  )
}

export const saveSavingsAccountsSummary = async (user: User, 
  savingsAccountsSummary: SavingsAccountsSummary) => {
  await redisClient.hSet(savingsAccountsSummaryKey(user),
    serializeSavingsAccountsSummary(savingsAccountsSummary))
}