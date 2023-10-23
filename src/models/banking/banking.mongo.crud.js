import { bankingAccountsDatabase, bankingSummaryDatabase } from "./banking.mongo";

// banking crud for mongodb

async function createBankingAccount(userId, email, bankingAccountName) {
  const newBankingAccount = new bankingAccountsDatabase({
    userId: userId,
    email: email,
    name: bankingAccountName,
    currentBalance: 0,
    totalIn: 0,
    totalOut: 0,
    transactions: {}
  });

  await newBankingAccount.save();  
};

module.exports = {
  createBankingAccount,
}