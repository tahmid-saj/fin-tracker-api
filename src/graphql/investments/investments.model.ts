import { ClosingInvestmentName, Email, Investment, InvestmentInfo, InvestmentsSummary, UserId } from "../../models/investments/investments.types.js"

const { getInvestments, getInvestmentsSummary,
  createInvestment, updateInvestment, closeInvestment,
  updateInvestments, updateInvestmentsSummary
} = require("../../models/investments/investments.mongo.crud.js")

export async function getInvestmentsByUser(userId: UserId, email: Email): Promise<Investment[]> {
  const investments = await getInvestments(userId, email)
  return investments.investments
}

export async function getInvestmentsSummaryByUser(userId: UserId, email: Email): Promise<InvestmentsSummary | void> {
  const investmentsSummary = await getInvestmentsSummary(userId, email)
  return investmentsSummary.investmentsSummary
}

export async function createUserInvestment(userId: UserId, email: Email, investmentInfo: InvestmentInfo): Promise<boolean> {
  console.log("Posting investment creation");
  createInvestment(userId, email, investmentInfo);
  return true
}

export async function updateUserInvestment(userId: UserId, email: Email, 
  originalInvestmentInfo: Investment, updatedInvestmentInfo: Investment): Promise<boolean> {
  console.log("Updating investment");
  updateInvestment(userId, email, originalInvestmentInfo, updatedInvestmentInfo);
  return true
}

export async function deleteUserInvestment(userId: UserId, email: Email, closingInvestmentName: ClosingInvestmentName): Promise<boolean> {
  closeInvestment(userId, email, closingInvestmentName);
  console.log("Deleting investment");
  return true
}

export async function updateUserInvestments(userId: UserId, email: Email, investments: Investment[]): Promise<boolean> {
  updateInvestments(userId, email, investments);
  console.log("Putting investments data");
  return true
}

export async function updateUserInvestmentsSummary(userId: UserId, email: Email, investmentsSummary: InvestmentsSummary): Promise<boolean> {
  updateInvestmentsSummary(userId, email, investmentsSummary);
  console.log("Putting investments summary data");
  return true
}
