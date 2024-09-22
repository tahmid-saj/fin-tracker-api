import { investmentsDatabase, investmentsSummaryDatabase } from "./investments.mongo.ts"

import { validateGetInvestmentsSummary } from "../../utils/validations/investments/investments.validations.ts"
import { ClosingInvestmentName, Email, Investment, InvestmentInfo, InvestmentsSummary, UserId } from "./investments.types.ts";
import { Document } from "mongodb";

// TODO: move validation for crud to validation directory

// investments crud for mongodb

// user sign in
export async function getInvestments(userId: UserId, email: Email): Promise<{ investments: Investment[] }> {
  const investments = await investmentsDatabase.find({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    const investments = res.map((investment: Document) => {
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
        totalInterest: investment.totalInterest,

        investments: investment.investments
      }
    })

    return investments;
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  });
  
  return {
    investments: [ ...investments ]
  }
};

export async function getInvestmentsSummary(userId: UserId, email: Email): Promise<{ investmentsSummary: InvestmentsSummary | void }> {
  const investmentsSummary = await investmentsSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    if (validateGetInvestmentsSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then((res: Document) => {
    const summary = {
      currentAllInvestmentsBalance: res.currentAllInvestmentsBalance,
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
    investmentsSummary: investmentsSummary
  }
};

// investments operations
export async function createInvestmentSummary(userId: UserId, email: Email, investmentInfo: Investment): Promise<void> {
  const investmentSummaryExists = await investmentsSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (!investmentSummaryExists) {
    const newInvestmentSummary = new investmentsSummaryDatabase({
      userId: userId,
      email: email,
      currentAllInvestmentsBalance: Number(investmentInfo.endBalance),
      totalAllContribution: Number(investmentInfo.totalContribution),
      totalAllInterest: Number(investmentInfo.totalInterest),
    });

    await newInvestmentSummary.save();
    console.log("created new investment summary");
  } else {
    return;
  }
};

export async function createUpdatedInvestmentSummary(userId: UserId, email: Email, updatedInvestmentInfo: Investment): Promise<void> {
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

export async function createInvestment(userId: UserId, email: Email, investmentInfo: Investment): Promise<void> {
  const investmentExists = await investmentsDatabase.findOne({
    userId: userId,
    email: email,
    investmentName: investmentInfo.investmentName
  });

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

      investments: investmentInfo.investments,
    });

    await newInvestment.save();
    console.log("created new investment");

    await createInvestmentSummary(userId, email, investmentInfo);
  } else {
    return;
  }
};

export async function updateInvestment(userId: UserId, email: Email, originalInvestmentInfo: Investment, updatedInvestmentInfo: Investment): Promise<void> {
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
      totalInterest: updatedInvestmentInfo.totalInterest,

      investments: updatedInvestmentInfo.investments
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
        totalAllInterest: (Number(updatedInvestmentInfo.totalInterest) - Number(originalInvestmentInfo.totalInterest)),
      }
    });
  } else {
    await createUpdatedInvestmentSummary(userId, email, updatedInvestmentInfo);
  }
};

export async function closeInvestment(userId: UserId, email: Email, closingInvestmentName: ClosingInvestmentName): Promise<void> {
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
export async function updateInvestments(userId: UserId, email: Email, investments: Investment[]): Promise<void> {
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
        totalInterest: investment.totalInterest,

        investments: investment.investments
      })
    })
  } else {
    return;
  }
};

export async function updateInvestmentsSummary(userId: UserId, email: Email, investmentsSummary: InvestmentsSummary): Promise<void> {
  const investmentsSummaryExists = await investmentsSummaryDatabase.findOne({
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
      totalAllInterest: investmentsSummary.totalAllInterest,
    })
  } else {
    return;
  }
};
