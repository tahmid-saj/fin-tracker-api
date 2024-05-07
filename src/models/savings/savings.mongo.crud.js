const { savingsAccountsDatabase, savingsAccountsSummaryDatabase } = require("./savings.mongo.js");

const { validateGetSavingsAccountsSummary } = require("../../utils/validations/savings/savings.validations");

// TODO: move validation for crud to validation directory

// savings crud for mongodb

// user sign in
async function getSavingsAccounts(userId, email) {
  const savingsAccounts = await savingsAccountsDatabase.find({
    userId: userId,
    email: email
  })
  .then(res => {
    const savingsAccounts = res.map(savingsAccount => {
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
        totalInterest: savingsAccount.totalInterest
      }
    })

    return savingsAccounts;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  });
  
  return {
    savingsAccounts: [ ...savingsAccounts ]
  }
};

async function getSavingsAccountsSummary(userId, email) {
  const savingsAccountsSummary = await savingsAccountsSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then(res => {
    if (validateGetSavingsAccountsSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then(res => {
    const summary = {
      currentAllSavingsAccountsBalance: res.currentAllSavingsAccountsBalance,
      totalAllContribution: res.totalAllContribution,
      totalAllInterest: res.totalAllInterest
    }

    return summary;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  })

  return {
    savingsAccountsSummary: savingsAccountsSummary
  }
};

// savings operations
async function createSavingsAccountSummary(userId, email, savingsAccountInfo) {
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

async function createUpdatedSavingsAccountSummary(userId, email, updatedSavingsAccountInfo) {
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

async function createSavingsAccount(userId, email, savingsAccountInfo) {
  const savingsAccountExists = await savingsAccountsDatabase.findOne({
    userId: userId,
    email: email,
    savingsAccountName: savingsAccountInfo.savingsAccountName
  });

  console.log("creating savings account", userId, email, savingsAccountInfo);

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
      totalInterest: savingsAccountInfo.totalInterest
    });

    await newSavingsAccount.save();
    console.log("created new savings account");

    await createSavingsAccountSummary(userId, email, savingsAccountInfo);
  } else {
    return;
  }
};

async function updateSavingsAccount(userId, email, originalSavingsAccountInfo, updatedSavingsAccountInfo) {
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
      totalInterest: updatedSavingsAccountInfo.totalInterest
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

async function closeSavingsAccount(userId, email, closingSavingsAccountName) {
  const savingsAccountExists = await savingsAccountsDatabase.findOne({
    userId: userId,
    email: email,
    savingsAccountName: closingSavingsAccountName
  });
  console.log("deleting ", closingSavingsAccountName, userId, email)

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
async function updateSavingsAccounts(userId, email, savingsAccounts) {
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
        totalInterest: savingsAccount.totalInterest
      })
    })
  } else {
    return;
  }
};

async function updateSavingsAccountsSummary(userId, email, savingsAccountsSummary) {
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

module.exports = {
  getSavingsAccounts,
  getSavingsAccountsSummary,
  createSavingsAccountSummary,
  createUpdatedSavingsAccountSummary,
  createSavingsAccount,
  updateSavingsAccount,
  closeSavingsAccount,
  updateSavingsAccounts,
  updateSavingsAccountsSummary,
}

