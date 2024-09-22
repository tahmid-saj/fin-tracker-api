import { bankingAccountsDatabase, bankingSummaryDatabase } from "./banking.mongo.js"

import { validategetBankingSummary } from "../../utils/validations/banking/banking.validations.js"
import { BankingAccount, BankingAccountName, BankingSummary, Email, TransactionInfo, UserId } from "./banking.types.js";
import { Document } from "mongodb";

// TODO: move validation for crud to validation directory

// banking crud for mongodb

// user sign in
export async function getBankingAccounts(userId: UserId, email: Email): Promise<{ bankingAccounts: BankingAccount[] }> {
  const bankingAccounts = await bankingAccountsDatabase.find({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    const accounts = res.map((account: Document) => {
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
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error);
  });

  return {
    bankingAccounts: [ ...bankingAccounts ]
  }
};

export async function getBankingSummary(userId: UserId, email: Email): Promise<{ bankingSummary: BankingSummary | void }> {
  const bankingSummary = await bankingSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    if (validategetBankingSummary(res) === true) return Object({})

    return res.toObject();
  })
  .then((res: Document) => {
    const summary = {
      currentAllBankingBalance: res.currentAllBankingBalance,
      totalAllBankingIn: res.totalAllBankingIn,
      totalAllBankingOut: res.totalAllBankingOut
    }

    return summary;
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error);
  });

  return {
    bankingSummary: bankingSummary
  }
};

// banking operations
export async function createBankingSummary(userId: UserId, email: Email): Promise<void> {
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

export async function createBankingAccount(userId: UserId, email: Email, bankingAccountName: BankingAccountName): Promise<void> {
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

export async function addBankingAccountTransaction(userId: UserId, email: Email, transactionInfo: TransactionInfo): Promise<void> {
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
          addToExpenses: transactionInfo.addToExpenses
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

export async function closeBankingAccount(userId: UserId, email: Email, bankingAccountName: BankingAccountName): Promise<void> {
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
export async function updateBankingAccounts(userId: UserId, email: Email, bankingAccounts: BankingAccount[]): Promise<void> {
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

export async function updateBankingSummary(userId: UserId, email: Email, bankingSummary: BankingSummary): Promise<void> {
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