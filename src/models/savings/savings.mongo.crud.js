const { savingsAccountsDatabase, savingsAccountsSummaryDatabase } = require("./savings.mongo.js");

const { validateGetSavingsAccountsSummary } = require("../../utils/validations/savings/savings.validations");

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
    console.log("created new investment summary");
  } else {
    return;
  }
};

async function createUpdatedInvestmentSummary(userId, email, updatedInvestmentInfo) {
  const investmentSummaryExists = await investmentsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (!investmentSummaryExists) {
    const newInvestmentSummary = new investmentsSummaryDatabase({
      userId: userId,
      email: email,
      currentAllInvestmentsBalance: Number(updatedInvestmentInfo.endBalance),
      totalAllContribution: Number(updatedInvestmentInfo.totalContribution),
      totalAllInterest: Number(updatedInvestmentInfo.totalInterest),
    });

    await newInvestmentSummary.save();
    console.log("created new investment summary");
  } else {
    return;
  }
}

async function createInvestment(userId, email, investmentInfo) {
  const investmentExists = await investmentsDatabase.findOne({
    userId: userId,
    email: email,
    investmentName: investmentInfo.investmentName
  });

  console.log("creating investment", userId, email, investmentInfo);

  if (!investmentExists) {
    const newInvestment = new investmentsDatabase({
      userId: userId,
      email: email,
      investmentName: investmentInfo.investmentName,
      investmentType: investmentInfo.investmentType,
      startingAmount: investmentInfo.startingAmount,
      startDate: investmentInfo.startDate,
      afterYears: investmentInfo.afterYears,
      returnRate: investmentInfo.returnRate,
      compounded: investmentInfo.compounded,
      additionalContribution: investmentInfo.additionalContribution,
      contributionAt: investmentInfo.contributionAt,
      contributionInterval: investmentInfo.contributionInterval,

      // calculated
      endBalance: investmentInfo.endBalance,
      totalContribution: investmentInfo.totalContribution,
      totalInterest: investmentInfo.totalInterest,
    });

    await newInvestment.save();
    console.log("created new investment");

    await createInvestmentSummary(userId, email, investmentInfo);
  } else {
    return;
  }
};

async function updateInvestment(userId, email, originalInvestmentInfo, updatedInvestmentInfo) {
  const investmentExists = await investmentsDatabase.findOne({
    userId: userId,
    email: email,
    investmentName: originalInvestmentInfo.investmentName
  });

  if (investmentExists) {
    await investmentsDatabase.updateOne({
      userId: userId,
      email: email,
      investmentName: originalInvestmentInfo.investmentName
    }, {
      investmentName: updatedInvestmentInfo.investmentName,
      investmentType: updatedInvestmentInfo.investmentType,
      startingAmount: updatedInvestmentInfo.startingAmount,
      startDate: updatedInvestmentInfo.startDate,
      afterYears: updatedInvestmentInfo.afterYears,
      returnRate: updatedInvestmentInfo.returnRate,
      compounded: updatedInvestmentInfo.compounded,
      additionalContribution: updatedInvestmentInfo.additionalContribution,
      contributionAt: updatedInvestmentInfo.contributionAt,
      contributionInterval: updatedInvestmentInfo.contributionInterval,

      // calculated
      endBalance: updatedInvestmentInfo.endBalance,
      totalContribution: updatedInvestmentInfo.totalContribution,
      totalInterest: updatedInvestmentInfo.totalInterest
    })
  } else {
    return;
  }

  const investmentSummaryExists = await investmentsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (investmentSummaryExists) {
    await investmentsSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      $inc: {
        currentAllInvestmentsBalance: (Number(updatedInvestmentInfo.endBalance) - Number(originalInvestmentInfo.endBalance)),
        totalAllContribution: (Number(updatedInvestmentInfo.totalContribution) - Number(originalInvestmentInfo.totalContribution)),
        totalInterest: (Number(updatedInvestmentInfo.totalInterest) - Number(originalInvestmentInfo.totalInterest)),
      }
    });
  } else {
    await createUpdatedInvestmentSummary(userId, email, updatedInvestmentInfo);
  }
};

async function closeInvestment(userId, email, closingInvestmentName) {
  const investmentExists = await investmentsDatabase.findOne({
    userId: userId,
    email: email,
    investmentName: closingInvestmentName
  });

  if (investmentExists) {
    await investmentsSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      $inc: {
        currentAllInvestmentsBalance: -Number(investmentExists.endBalance),
        totalAllContribution: -Number(investmentExists.totalContribution),
        totalAllInterest: -Number(investmentExists.totalInterest)
      }
    });

    await investmentsDatabase.deleteOne({
      userId: userId,
      email: email,
      investmentName: closingInvestmentName
    })
  } else {
    return;
  }
};

// user sign out
async function updateInvestments(userId, email, investments) {
  const investmentsExist = await investmentsDatabase.findOne({
    userId: userId,
    email: email
  });

  if (investmentsExist && investments !== undefined && investments.length !== 0) {
    investments.map(async (investment) => {
      await investmentsDatabase.updateOne({
        userId: userId,
        email: email,
        investmentName: investment.investmentName
      }, {
        investmentType: investment.investmentType,
        startingAmount: investment.startingAmount,
        startDate: investment.startDate,
        afterYears: investment.afterYears,
        returnRate: investment.returnRate,
        compounded: investment.compounded,
        additionalContribution: investment.additionalContribution,
        contributionAt: investment.contributionAt,

        // calculated
        endBalance: investment.endBalance,
        totalContribution: investment.totalContribution,
        totalInterest: investment.totalInterest
      })
    })
  } else {
    return;
  }
};

async function updateInvestmentsSummary(userId, email, investmentsSummary) {
  const investmentsSummaryExists = await investmentsDatabase.findOne({
    userId: userId,
    email: email
  });

  if (investmentsSummaryExists && investmentsSummary !== undefined && investmentsSummary !== Object({})) {
    await investmentsSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      currentAllInvestmentsBalance: investmentsSummary.currentAllInvestmentsBalance,
      totalAllContribution: investmentsSummary.totalAllContribution,
      totalInterest: investmentsSummary.totalInterest,
    })
  } else {
    return;
  }
};

module.exports = {
  getSavingsAccounts,
  getSavingsAccountsSummary,
  createSavingsAccountSummary
}

