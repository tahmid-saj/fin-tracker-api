const { investmentsDatabase, investmentsSummaryDatabase } = require("./investments.mongo");

// investments crud for mongodb

// user sign in
async function getInvestments(userId, email) {
  const investments = await investmentsDatabase.find({
    userId: userId,
    email: email
  })
  .then(res => {
    const investments = res.map(investment => {
      return {
        investmentName: investment.investmentName,
        investmentType: investment.investmentType,
        startingAmount: investment.startingAmount,
        startDate: investment.startDate,
        afterYears: investment.afterYears,
        returnRate: investment.returnRate,
        compounded: investment.compounded,
        additionalContribution: investment.additionalContribution,
        contributionAt: investment.contributionAt,
        contributionInterval: investment.contributionInterval,

        // calculated
        endBalance: investment.endBalance,
        totalContribution: investment.totalContribution,
        totalInterest: investment.totalInterest
      }
    })

    return investments;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  });
  
  return {
    investments: [ ...investments ]
  }
};

async function getInvestmentsSummary(userId, email) {
  const investmentsSummary = await investmentsSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then(res => {
    return res.toObject()
  })
  .then(res => {
    const summary = {
      currentAllInvestmentsBalance: investmentsSummary.currentAllInvestmentsBalance,
      totalAllContribution: investmentsSummary.totalAllContribution,
      totalAllInterest: investmentsSummary.totalAllInterest
    }

    return summary;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  })

  return {
    investmentsSummary: investmentsSummary
  }
};

// investments operations
async function createInvestmentSummary(userId, email) {
  const investmentSummaryExists = await investmentsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (!investmentSummaryExists) {
    const newInvestmentSummary = new investmentsSummaryDatabase({
      userId: userId,
      email: email,
      currentAllInvestmentsBalance: 0,
      totalAllContribution: 0,
      totalAllInterest: 0,
    });

    await newInvestmentSummary.save();
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
      totalAllContribution: Number(updatedInvestmentInfo.totalAllContribution),
      totalAllInterest: Number(updatedInvestmentInfo.totalAllInterest),
    });

    await newInvestmentSummary.save();
    console.log("created new investment summary");
  } else {
    return;
  }
}

async function createInvestment(userId, email, investment) {
  const investmentExists = await investmentsDatabase.findOne({
    userId: userId,
    email: email,
    investmentName: investment.investmentName
  });

  console.log("creating investment", userId, email, investment);

  if (!investmentExists) {
    const newInvestment = new investmentsDatabase({
      userId: userId,
      email: email,
      investmentName: investment.investmentName,
      investmentType: investment.investmentType,
      startingAmount: investment.startingAmount,
      startDate: investment.startDate,
      afterYears: investment.afterYears,
      returnRate: investment.returnRate,
      compounded: investment.compounded,
      additionalContribution: investment.additionalContribution,
      contributionAt: investment.contributionAt,
      contributionInterval: investment.contributionInterval,

      // calculated
      endBalance: investment.endBalance,
      totalContribution: investment.totalContribution,
      totalInterest: investment.totalInterest,
    });

    await newInvestment.save();
    console.log("created new investment");

    await createInvestmentSummary(userId, email);
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

async function deleteInvestment(userId, email, closingInvestmentName) {
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

// sign out
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
        contributionAt: investment.contributionAt
      })
    })
  } else {
    return;
  }
};

async function updateInvestmentsSummary(userId, email, investmentsSummary) {

};

module.exports = {
  getInvestments,
  getInvestmentsSummary,
  createInvestment,
  deleteInvestment,
  updateInvestment,
  updateInvestmentsData,
  updateInvestmentsSummaryData
}