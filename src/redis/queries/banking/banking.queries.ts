import { BankingAccount, BankingSummary, Transaction } from "../../../models/banking/banking.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { bankingAccountsKey, bankingAccountTransactionsKey, bankingSummaryKey } from "./banking.keys.js";

// helper functions
export const serializeBankingAccountWithoutTransaction = (bankingAccount: BankingAccount) => {
  return {
    name: bankingAccount.name,
    currentBalance: bankingAccount.currentBalance,
    totalIn: bankingAccount.totalIn,
    totalOut: bankingAccount.totalOut
  }
}

export const serializeBankingAccountTransaction = (transactions: Transaction[]) => {
  return transactions.map((transaction) => {
    return `amount=${transaction.amount}!type=${transaction.type}!reason=${transaction.reason}!addToExpenses=${transaction.addToExpenses}`
  })
}

export const serializeBankingSummary = (bankingSummary: BankingSummary) => {
  return bankingSummary.bankingSummary
}

export const deserializeBankingAccount = (bankingAccount: { [key: string]: string }, transactions: string[]) => {
  const resTransactions: Transaction[] = transactions.map((transaction) => {
    const fields = transaction.split("!")
    
    const amount = fields[0]?.split("=")[1]
    const type = fields[0]?.split("=")[1]
    const reason = fields[0]?.split("=")[1]
    const addToExpenses = fields[0]?.split("=")[1]

    let tran: Transaction = {
      amount: Number(amount), 
      type: type!
    }
    if (reason !== "null") tran.reason = reason
    if (addToExpenses !== "null") tran.addToExpenses = Boolean(addToExpenses)

    return tran
  })

  return {
    name: bankingAccount.name,
    currentBalance: bankingAccount.currentBalance,
    totalIn: bankingAccount.totalIn,
    totalOut: bankingAccount.totalOut,
    transactions: resTransactions
  }
}

export const deserializeBankingSummary = (bankingSummary: { [key: string]: string }): BankingSummary => {
  return {
    bankingSummary: {
      currentAllBankingBalance: Number(bankingSummary.currentAllBankingBalance),
      totalAllBankingIn: Number(bankingSummary.totalAllBankingIn),
      totalAllBankingOut: Number(bankingSummary.totalAllBankingOut)
    }
  }
}

export const findAllUserBankingAccounts = async (user: User): Promise<string[]> => {
  const matchingBankingAccounts: string[] = []
  let cursor = '0'

  do {
    const { cursor: nextCursor, keys } = await redisClient.scan(cursor, {
      MATCH: bankingAccountsKey(user, "*"),
      COUNT: 100,
    })

    cursor = nextCursor;
    matchingBankingAccounts.push(...keys)
  } while (cursor !== '0')

  return matchingBankingAccounts;
}

export const isBankingAccountCached = async (user: User, bankingAccountName: string) => {
  return await redisClient.exists(bankingAccountsKey(user, bankingAccountName))
}

export const isBankingSummaryCached = async (user: User) => {
  return await redisClient.exists(bankingSummaryKey(user))
}

export const getBankingAccount = async (user: User, bankingAccountName: string) => {
  const bankingAccount = await redisClient.hGetAll(bankingAccountsKey(user, bankingAccountName))
  const bankingAccountTransaction = await redisClient.lRange(bankingAccountTransactionsKey(user, bankingAccountName), 0, -1)
  return deserializeBankingAccount(bankingAccount, bankingAccountTransaction)
}

export const getBankingSummary = async (user: User) => {
  const bankingSummary = await redisClient.hGetAll(bankingSummaryKey(user))
  return deserializeBankingSummary(bankingSummary)
}

export const saveBankingAccount = async (user: User, bankingAccount: BankingAccount) => {
  // save banking account
  await redisClient.hSet(bankingAccountsKey(user, bankingAccount.name), 
    serializeBankingAccountWithoutTransaction(bankingAccount))

  // save banking account's transactions
  if (bankingAccount.transactions && bankingAccount.transactions.length !== 0) {
    await redisClient.rPush(bankingAccountTransactionsKey(user, bankingAccount.name), 
      serializeBankingAccountTransaction(bankingAccount.transactions))
  }
}

export const saveBankingSummary = async (user: User, bankingSummary: BankingSummary) => {
  // save banking summary
  await redisClient.hSet(bankingSummaryKey(user), serializeBankingSummary(bankingSummary))
}