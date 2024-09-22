
import { getInsurances, getInsurancesSummary,
  createInsurance, removeInsurance,
  updateInsurances, updateInsurancesSummary
} from "./insurances.mongo.crud.ts"
import { Email, Insurance, InsuranceInfo, insurancesSummary, RemovingInsuranceFor, UserId } from "./insurances.types.ts"

// TODO: handle error

// signed in
export async function getInsurancesData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting insurances data")
  return getInsurances(userId, email)
}

// TODO: need to better manage summary
export async function getInsurancesSummaryData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting insurances summary data")
  return getInsurancesSummary(userId, email)
}

// insurances operations
export async function postInsuranceCreate(userId: UserId, email: Email, insuranceInfo: InsuranceInfo): Promise<boolean> {
  console.log("Posting insurance creation")
  await createInsurance(userId, email, insuranceInfo)
  return true
}

// TODO: need to better manage summary on delete
export async function deleteInsurance(userId: UserId, email: Email, removingInsuranceFor: RemovingInsuranceFor): Promise<boolean> {
  await removeInsurance(userId, email, removingInsuranceFor)
  console.log("Deleting insurance")
  return true
}

// signed out
export async function putInsurancesData(userId: UserId, email: Email, insurances: Insurance[]): Promise<boolean> {
  await updateInsurances(userId, email, insurances)
  console.log("Putting insurances data")
  return true
}

// TODO: need to better manage summary
export async function putInsurancesSummaryData(userId: UserId, email: Email, insurancesSummary: insurancesSummary): Promise<boolean> {
  await updateInsurancesSummary(userId, email, insurancesSummary)
  console.log("Putting insurances summary data")
  return true
}
