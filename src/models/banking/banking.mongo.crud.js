const { bankingAccountsDatabase, bankingSummaryDatabase } = require("./banking.mongo");

// banking crud for mongodb

async function createBankingSummary(userId, email) {
  const bankingSummaryExists = await bankingSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (!bankingSummaryExists) {
    const newBankingSummary = new bankingSummaryDatabase({
      userId: userId,
      email: email,
      currentAllBankingBalance: 0,
      totalAllBankingIn: 0,
      totalAllBankingOut: 0,
    });
  
    await newBankingSummary.save();
  } else {
    return;
  }
};

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

  // if this is the first bank account, a new banking summary will be created
  await createBankingSummary(userId, email);
};

module.exports = {
  createBankingAccount,
  createBankingSummary
}