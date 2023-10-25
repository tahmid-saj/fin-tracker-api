const { investmentsDatabase, investmentsSummaryDatabase } = require("./investments.mongo");

// investments crud for mongodb

// user sign in


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
      totalAllContributionBalance: 0,
      totalAllInterestBalance: 0,
    });

    await newInvestmentSummary.save();
    console.log("created new investment summary");
  } else {
    return;
  }
};

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
      contributionInterval: investment.contributionInterval
    });

    await newInvestment.save();
    console.log("created new investment");

    await createInvestmentSummary(userId, email);
  } else {
    return;
  }
};

// sign out


module.exports = {
  createInvestment,
}