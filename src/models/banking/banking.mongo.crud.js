const { bankingAccountsDatabase, bankingSummaryDatabase } = require("./banking.mongo");

const { validategetBankingSummary } = require("../../utils/validations/banking/banking.validations");

// TODO: move validation for crud to validation directory

// banking crud for mongodb

// user sign in
async function getBankingAccounts(userId, email) {
  const bankingAccounts = await bankingAccountsDatabase.find({
    userId: userId,
    email: email
  })
  .then(res => {
    const accounts = res.map(account => {
      return {
        name: account.name,
        currentBalance: account.currentBalance,
        totalIn: account.totalIn,
        totalOut: account.totalOut,
        transactions: account.transactions
      };
    })

    return accounts;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error);
  });

  return {
    bankingAccounts: [ ...bankingAccounts ]
  }
};

async function getBankingSummary(userId, email) {
  const bankingSummary = await bankingSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then(res => {
    if (validategetBankingSummary(res) === true) return Object({})

    return res.toObject();
  })
  .then(res => {
    const summary = {
      currentAllBankingBalance: res.currentAllBankingBalance,
      totalAllBankingIn: res.totalAllBankingIn,
      totalAllBankingOut: res.totalAllBankingOut
    }

    return summary;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error);
  });

  return {
    bankingSummary: bankingSummary
  }
};

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
    await bankingSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      $inc: { 
        currentAllBankingBalance: -Number(bankingAccountExists.currentBalance),
        totalAllBankingIn: -Number(bankingAccountExists.totalIn),
        totalAllBankingOut: -Number(bankingAccountExists.totalOut)
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
async function updateBankingAccounts(userId, email, bankingAccounts) {
  const bankingAccountsExist = await bankingAccountsDatabase.findOne({
    userId: userId,
    email: email
  });

  if (bankingAccountsExist && bankingAccounts !== undefined && bankingAccounts.length !== 0) {

    bankingAccounts.map(async (account) => {
      await bankingAccountsDatabase.updateOne({
        userId: userId,
        email: email,
        name: account.name
      }, {
        currentBalance: account.currentBalance,
        totalIn: account.totalIn,
        totalOut: account.totalOut,
        transactions: account.transactions
      });
    });
  } else {
    return;
  }
};

async function updateBankingSummary(userId, email, bankingSummary) {
  const bankingSummaryExists = await bankingSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (bankingSummaryExists && bankingSummary !== undefined && bankingSummary !== Object({})) {

    await bankingSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      currentAllBankingBalance: bankingSummary.currentAllBankingBalance,
      totalAllBankingIn: bankingSummary.totalAllBankingIn,
      totalAllBankingOut: bankingSummary.totalAllBankingOut,
    });
  } else {
    return;
  }
}

module.exports = {
  getBankingAccounts,
  getBankingSummary,
  createBankingAccount,
  createBankingSummary,
  addBankingAccountTransaction,
  closeBankingAccount,
  updateBankingAccounts,
  updateBankingSummary,
}
