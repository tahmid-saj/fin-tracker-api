const { bankingAccountsDatabase, bankingSummaryDatabase } = require("./banking.mongo");

// banking crud for mongodb

// user sign in

// banking operations
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
  const bankingAccountNameExists = await bankingAccountsDatabase.findOne({
    userId: userId,
    email: email,
    name: bankingAccountName
  });

  if (!bankingAccountNameExists) {
    const newBankingAccount = new bankingAccountsDatabase({
      userId: userId,
      email: email,
      name: bankingAccountName,
      currentBalance: 0,
      totalIn: 0,
      totalOut: 0,
      transactions: []
    });
  
    await newBankingAccount.save();  
  
    // if this is the first bank account, a new banking summary will be created
    await createBankingSummary(userId, email);
  } else {
    return;
  }
};

async function addBankingAccountTransaction(userId, email, transactionInfo) {
  if (transactionInfo.type === "DEPOSIT") {
    // deposit
    console.log("deposit transaction")

    await bankingAccountsDatabase.updateOne({ 
      userId: userId,
      email: email,
      name: transactionInfo.bankingAccountName
    }, { 
      $inc: { currentBalance: Number(transactionInfo.amount), totalIn: Number(transactionInfo.amount) },
      $push: { 
        transactions: {
          amount: Number(transactionInfo.amount),
          type: transactionInfo.type,
          reason: transactionInfo.reason,
        } } 
    });

    await bankingSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      $inc: { currentAllBankingBalance: Number(transactionInfo.amount), totalAllBankingIn: Number(transactionInfo.amount) }
    });
  } else if (transactionInfo.type === "WITHDRAWAL") {
    // withdrawal
    console.log("withdrawal transaction");

    await bankingAccountsDatabase.updateOne({
      userId: userId,
      email: email,
      name: transactionInfo.bankingAccountName
    }, {
      $inc: { currentBalance: -Number(transactionInfo.amount), totalOut: Number(transactionInfo.amount) },
      $push: {
        transactions: {
          amount: Number(transactionInfo.amount),
          type: transactionInfo.type,
          reason: transactionInfo.reason,
        }
      }
    });

    await bankingSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      $inc: { currentAllBankingBalance: -Number(transactionInfo.amount), totalAllBankingOut: Number(transactionInfo.amount) }
    });
  } else if (transactionInfo.type === "TRANSFER") {
    // transfers
    console.log("transfer transaction");

    await bankingAccountsDatabase.updateOne({
      userId: userId,
      email: email,
      name: transactionInfo.bankingAccountName
    }, {
      $inc: { currentBalance: -Number(transactionInfo.amount), totalOut: Number(transactionInfo.amount) },
      $push: {
        transactions: {
          amount: Number(transactionInfo.amount),
          type: "WITHDRAWAL_TRANSFER",
          reason: transactionInfo.reason,
        }
      }
    });

    await bankingAccountsDatabase.updateOne({
      userId: userId,
      email: email,
      name: transactionInfo.transferTo
    }, {
      $inc: { currentBalance: Number(transactionInfo.amount), totalIn: Number(transactionInfo.amount) },
      $push: {
        transactions: {
          amount: Number(transactionInfo.amount),
          type: "DEPOSIT_TRANSFER",
          reason: transactionInfo.reason,
        }
      }
    });

    await bankingSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      $inc: { totalAllBankingIn: Number(transactionInfo.amount), totalAllBankingOut: Number(transactionInfo.amount) }
    });
  }
};

async function closeBankingAccount(userId, email, bankingAccountName) {
  const bankingAccountExists = await bankingAccountsDatabase.findOne({
    userId: userId,
    email: email,
    name: bankingAccountName
  });

  if (bankingAccountExists) {
    const bankingAccount = await bankingAccountsDatabase.findOne({
      userId: userId,
      email: email,
      name: bankingAccountName
    });

    await bankingSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      $inc: { 
        currentAllBankingBalance: -Number(bankingAccount.currentBalance),
        totalAllBankingIn: -Number(bankingAccount.totalIn),
        totalAllBankingOut: -Number(bankingAccount.totalOut)
      }
    });

    await bankingAccountsDatabase.deleteOne({
      userId: userId,
      email: email,
      name: bankingAccountName
    });
  } else {
    return;
  }
};

// user sign out

module.exports = {
  createBankingAccount,
  createBankingSummary,
  addBankingAccountTransaction,
  closeBankingAccount
}