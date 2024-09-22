import { savingsAccountsDatabase, savingsAccountsSummaryDatabase } from "./savings.mongo.js"

import { validateGetSavingsAccountsSummary } from "../../utils/validations/savings/savings.validations.js"
import { ClosingSavingsAccountName, Email, SavingsAccount, SavingsAccountInfo, SavingsAccountsSummary, UserId } from "./savings.types.js";
import { Document } from "mongodb";

// TODO: move validation for crud to validation directory

// savings crud for mongodb

// user sign in
export async function getSavingsAccounts(userId: UserId, email: Email): Promise<{ savingsAccounts: SavingsAccount[] }> {
  const savingsAccounts = await savingsAccountsDatabase.find({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    const savingsAccounts = res.map((savingsAccount: Document) => {
      return {
        savingsAccountName: savingsAccount.savingsAccountName,
        initialDeposit: savingsAccount.initialDeposit,
        startDate: savingsAccount.startDate,
        monthlyContribution: savingsAccount.monthlyContribution,
        contributionPeriod: savingsAccount.contributionPeriod,
        contributionInterval: savingsAccount.contributionInterval,
        apy: savingsAccount.apy,

        // calculated
        totalSavings: savingsAccount.totalSavings,
        totalContribution: savingsAccount.totalContribution,
        totalInterest: savingsAccount.totalInterest,

        savings: savingsAccount.savings,
      }
    })

    return savingsAccounts;
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  });
  
  return {
    savingsAccounts: [ ...savingsAccounts ]
  }
};

export async function getSavingsAccountsSummary(userId: UserId, email: Email): Promise<{ savingsAccountsSummary: SavingsAccountsSummary | void }> {
  const savingsAccountsSummary = await savingsAccountsSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    if (validateGetSavingsAccountsSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then((res: Document) => {
    const summary = {
      currentAllSavingsAccountsBalance: res.currentAllSavingsAccountsBalance,
      totalAllContribution: res.totalAllContribution,
      totalAllInterest: res.totalAllInterest
    }

    return summary;
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  })

  return {
    savingsAccountsSummary: savingsAccountsSummary
  }
};

// savings operations
export async function createSavingsAccountSummary(userId: UserId, email: Email, savingsAccountInfo: SavingsAccount): Promise<void> {
  const savingsAccountSummaryExists = await savingsAccountsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (!savingsAccountSummaryExists) {
    const newSavingsAccountSummary = new savingsAccountsSummaryDatabase({
      userId: userId,
      email: email,
      currentAllSavingsAccountsBalance: savingsAccountInfo.totalSavings,
      totalAllContribution: savingsAccountInfo.totalContribution,
      totalAllInterest: savingsAccountInfo.totalInterest,
    });

    await newSavingsAccountSummary.save();
    console.log("created new savings account summary");
  } else {
    return;
  }
};

export async function createUpdatedSavingsAccountSummary(userId: UserId, email: Email, updatedSavingsAccountInfo: SavingsAccount): Promise<void> {
  const savingsAccountSummaryExists = await savingsAccountsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (!savingsAccountSummaryExists) {
    const newSavingsAccountSummary = new savingsAccountsSummaryDatabase({
      userId: userId,
      email: email,
      currentAllSavingsAccountsBalance: Number(updatedSavingsAccountInfo.totalSavings),
      totalAllContribution: Number(updatedSavingsAccountInfo.totalContribution),
      totalAllInterest: Number(updatedSavingsAccountInfo.totalInterest),
    });

    await newSavingsAccountSummary.save();
    console.log("created new savings account summary");
  } else {
    return;
  }
}

export async function createSavingsAccount(userId: UserId, email: Email, savingsAccountInfo: SavingsAccount): Promise<void> {
  const savingsAccountExists = await savingsAccountsDatabase.findOne({
    userId: userId,
    email: email,
    savingsAccountName: savingsAccountInfo.savingsAccountName
  });

  if (!savingsAccountExists) {
    const newSavingsAccount = new savingsAccountsDatabase({
      userId: userId,
      email: email,
      savingsAccountName: savingsAccountInfo.savingsAccountName,
      initialDeposit: savingsAccountInfo.initialDeposit,
      startDate: savingsAccountInfo.startDate,
      monthlyContribution: savingsAccountInfo.monthlyContribution,
      contributionPeriod: savingsAccountInfo.contributionPeriod,
      contributionInterval: savingsAccountInfo.contributionInterval,
      apy: savingsAccountInfo.apy,

      // calculated
      totalSavings: savingsAccountInfo.totalSavings,
      totalContribution: savingsAccountInfo.totalContribution,
      totalInterest: savingsAccountInfo.totalInterest,

      savings: savingsAccountInfo.savings,
    });

    await newSavingsAccount.save();
    console.log("created new savings account");

    await createSavingsAccountSummary(userId, email, savingsAccountInfo);
  } else {
    return;
  }
};

export async function updateSavingsAccount(userId: UserId, email: Email, originalSavingsAccountInfo: SavingsAccount, updatedSavingsAccountInfo: SavingsAccount): Promise<void> {
  const savingsAccountExists = await savingsAccountsDatabase.findOne({
    userId: userId,
    email: email,
    savingsAccountName: originalSavingsAccountInfo.savingsAccountName
  });

  if (savingsAccountExists) {
    await savingsAccountsDatabase.updateOne({
      userId: userId,
      email: email,
      savingsAccountName: originalSavingsAccountInfo.savingsAccountName
    }, {
      savingsAccountName: updatedSavingsAccountInfo.savingsAccountName,
      initialDeposit: updatedSavingsAccountInfo.initialDeposit,
      startDate: updatedSavingsAccountInfo.startDate,
      monthlyContribution: updatedSavingsAccountInfo.monthlyContribution,
      contributionPeriod: updatedSavingsAccountInfo.contributionPeriod,
      contributionInterval: updatedSavingsAccountInfo.contributionInterval,
      apy: updatedSavingsAccountInfo.apy,

      // calculated
      totalSavings: updatedSavingsAccountInfo.totalSavings,
      totalContribution: updatedSavingsAccountInfo.totalContribution,
      totalInterest: updatedSavingsAccountInfo.totalInterest,

      savings: updatedSavingsAccountInfo.savings,
    })
  } else {
    return;
  }

  const savingsAccountSummaryExists = await savingsAccountsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (savingsAccountSummaryExists) {
    await savingsAccountsSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      $inc: {
        currentAllSavingsAccountsBalance: (Number(updatedSavingsAccountInfo.totalSavings) - Number(originalSavingsAccountInfo.totalSavings)),
        totalAllContribution: (Number(updatedSavingsAccountInfo.totalContribution) - Number(originalSavingsAccountInfo.totalContribution)),
        totalAllInterest: (Number(updatedSavingsAccountInfo.totalInterest) - Number(originalSavingsAccountInfo.totalInterest)),
      }
    });
  } else {
    await createUpdatedSavingsAccountSummary(userId, email, updatedSavingsAccountInfo);
  }
};

export async function closeSavingsAccount(userId: UserId, email: Email, closingSavingsAccountName: ClosingSavingsAccountName): Promise<void> {
  const savingsAccountExists = await savingsAccountsDatabase.findOne({
    userId: userId,
    email: email,
    savingsAccountName: closingSavingsAccountName
  });

  if (savingsAccountExists) {
    await savingsAccountsSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      $inc: {
        currentAllSavingsAccountsBalance: -Number(savingsAccountExists.totalSavings),
        totalAllContribution: -Number(savingsAccountExists.totalContribution),
        totalAllInterest: -Number(savingsAccountExists.totalInterest)
      }
    });

    await savingsAccountsDatabase.deleteOne({
      userId: userId,
      email: email,
      savingsAccountName: closingSavingsAccountName
    })
  } else {
    return;
  }
};

// user sign out
export async function updateSavingsAccounts(userId: UserId, email: Email, savingsAccounts: SavingsAccount[]): Promise<void> {
  const savingsAccountExists = await savingsAccountsDatabase.findOne({
    userId: userId,
    email: email
  });

  if (savingsAccountExists && savingsAccounts !== undefined && savingsAccounts.length !== 0) {
    savingsAccounts.map(async (savingsAccount) => {
      await savingsAccountsDatabase.updateOne({
        userId: userId,
        email: email,
        savingsAccountName: savingsAccount.savingsAccountName
      }, {
        initialDeposit: savingsAccount.initialDeposit,
        startDate: savingsAccount.startDate,
        monthlyContribution: savingsAccount.monthlyContribution,
        contributionPeriod: savingsAccount.contributionPeriod,
        contributionInterval: savingsAccount.contributionInterval,
        apy: savingsAccount.apy,
  
        // calculated
        totalSavings: savingsAccount.totalSavings,
        totalContribution: savingsAccount.totalContribution,
        totalInterest: savingsAccount.totalInterest,

        savings: savingsAccount.savings,
      })
    })
  } else {
    return;
  }
};

export async function updateSavingsAccountsSummary(userId: UserId, email: Email, savingsAccountsSummary: SavingsAccountsSummary): Promise<void> {
  const savingsAccountsSummaryExists = await savingsAccountsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (savingsAccountsSummaryExists && savingsAccountsSummary !== undefined && savingsAccountsSummary !== Object({})) {
    await savingsAccountsSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      currentAllSavingsAccountsBalance: savingsAccountsSummary.currentAllSavingsAccountsBalance,
      totalAllContribution: savingsAccountsSummary.totalAllContribution,
      totalAllInterest: savingsAccountsSummary.totalAllInterest,
    })
  } else {
    return;
  }
};

