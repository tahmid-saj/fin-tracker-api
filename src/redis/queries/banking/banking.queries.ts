import { BankingAccount, BankingSummary, Transaction } from "../../../models/banking/banking.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { bankingAccountKey, userBankingAccountsKey, bankingAccountTransactionsKey, bankingSummaryKey } from "./banking.keys.js";

// helper functions
export const serializeBankingAccount = (bankingAccount: BankingAccount) => {
  return {
    name: bankingAccount.name,
    currentBalance: bankingAccount.currentBalance,
    totalIn: bankingAccount.totalIn,
    totalOut: bankingAccount.totalOut
  }
}

export const serializeBankingAccountTransactions = (transactions: Transaction[]) => {
  return transactions.map((transaction) => {
    return `amount=${transaction.amount}!type=${transaction.type}!reason=${transaction.reason}!addToExpenses=${transaction.addToExpenses}`
  })
}

export const serializeBankingSummary = (bankingSummary: BankingSummary) => {
  return bankingSummary.bankingSummary
}

export const deserializeBankingAccount = (bankingAccount: { [key: string]: string }): BankingAccount => {
  
  return {
    name: bankingAccount.name!,
    currentBalance: Number(bankingAccount.currentBalance),
    totalIn: Number(bankingAccount.totalIn),
    totalOut: Number(bankingAccount.totalOut),

    transactions: []
  }
}

export const deserializeBankingAccountTransactions = (transactions: string[]) => {
  const resTransactions: Transaction[] = transactions.map((transaction) => {
    const fields = transaction.split("!")
    
    const amount = fields[0]?.split("=")[1]
    const type = fields[1]?.split("=")[1]
    const reason = fields[2]?.split("=")[1]
    const addToExpenses = fields[3]?.split("=")[1]
  
    let tran: Transaction = {
      amount: Number(amount), 
      type: type!
    }
    if (reason !== "null") tran.reason = reason
    if (addToExpenses !== "null") tran.addToExpenses = Boolean(addToExpenses)
  
    return tran
  })

  return resTransactions
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


export const areBankingAccountsCached = async (user: User) => {
  return await redisClient.exists(userBankingAccountsKey(user))
}

export const isBankingSummaryCached = async (user: User) => {
  return await redisClient.exists(bankingSummaryKey(user))
}

export const getBankingAccounts = async (user: User) => {
  const bankingAccounts = await redisClient.sMembers(userBankingAccountsKey(user))

  const resBankingAccounts = await Promise.all(
    bankingAccounts.map(async (bankingAccount) => {
      const resBankingAccount = await redisClient.hGetAll(bankingAccountKey(user, bankingAccount))
      const resBankingAccountTransactions = await redisClient.lRange(bankingAccountTransactionsKey(user, bankingAccount), 0, -1)

      const deserializedBankingAccount = deserializeBankingAccount(resBankingAccount)
      deserializedBankingAccount.transactions = deserializeBankingAccountTransactions(resBankingAccountTransactions)

      return deserializedBankingAccount
    })
  )

  return {
    bankingAccounts: resBankingAccounts
  }
}

export const getBankingSummary = async (user: User) => {
  const bankingSummary = await redisClient.hGetAll(bankingSummaryKey(user))
  return deserializeBankingSummary(bankingSummary)
}

export const saveBankingAccounts = async (user: User, bankingAccounts: BankingAccount[]) => {
  // save banking accounts
  await Promise.all([
    bankingAccounts.map(async (bankingAccount) => {
      const serializedBankingAccount = serializeBankingAccount(bankingAccount)

      await Promise.all([
        // add the account to the accounts set
        redisClient.sAdd(userBankingAccountsKey(user), bankingAccount.name),

        // add the account fields to the hash
        redisClient.hSet(bankingAccountKey(user, bankingAccount.name), serializedBankingAccount)
      ])

      if (bankingAccount.transactions) {
        // add the account transactions
        const serializedBankingAccountCalculationRecords = serializeBankingAccountTransactions(bankingAccount.transactions)
        redisClient.rPush(bankingAccountTransactionsKey(user, bankingAccount.name),
          serializedBankingAccountCalculationRecords)
      }
    })
  ])
}

export const saveBankingSummary = async (user: User, bankingSummary: BankingSummary) => {
  // save banking summary
  await redisClient.hSet(bankingSummaryKey(user), serializeBankingSummary(bankingSummary))
}