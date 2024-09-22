
import { getInvestments, getInvestmentsSummary,
  createInvestment, closeInvestment, updateInvestment,
  updateInvestments, updateInvestmentsSummary } from "./investments.mongo.crud.js"
import { ClosingInvestmentName, Email, Investment, InvestmentsSummary, UserId } from "./investments.types.js";

// signed in
export async function getInvestmentsData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting investments data");
  return getInvestments(userId, email)
};

// TODO: need to better manage summary
export async function getInvestmentsSummaryData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting investments summary data");
  return getInvestmentsSummary(userId, email);
};

// investments operations
export async function postInvestmentCreate(userId: UserId, email: Email, investmentInfo: Investment): Promise<boolean> {
  console.log("Posting investment creation");
  createInvestment(userId, email, investmentInfo);
  return true
};

// TODO: need to better manage summary on updating data
export async function putInvestmentData(userId: UserId, email: Email, 
  originalInvestmentInfo: Investment, updatedInvestmentInfo: Investment): Promise<boolean> {
  console.log("Updating investment");
  updateInvestment(userId, email, originalInvestmentInfo, updatedInvestmentInfo);
  return true
};

// TODO: need to better manage summary on delete
export async function deleteInvestment(userId: UserId, email: Email, closingInvestmentName: ClosingInvestmentName): Promise<boolean> {
  closeInvestment(userId, email, closingInvestmentName);
  console.log("Deleting investment");
  return true
};

// signed out
export async function putInvestmentsData(userId: UserId, email: Email, investments: Investment[]): Promise<boolean> {
  updateInvestments(userId, email, investments);
  console.log("Putting investments data");
  return true
};

// TODO: need to better manage summary
export async function putInvestmentsSummaryData(userId: UserId, email: Email, investmentsSummary: InvestmentsSummary): Promise<boolean> {
  updateInvestmentsSummary(userId, email, investmentsSummary);
  console.log("Putting investments summary data");
  return true
};