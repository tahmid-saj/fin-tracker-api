import { getInsurances, getInsurancesSummary,
  createInsurance, removeInsurance,
  updateInsurances, updateInsurancesSummary
} from "../../models/insurances/insurances.mongo.crud.ts"
import { Email, Insurance, InsuranceInfo, insurancesSummary, RemovingInsuranceFor, UserId } from "../../models/insurances/insurances.types.ts"

export async function insurancesByUser(userId: UserId, email: Email): Promise<Insurance[]> {
  const insurances = await getInsurances(userId, email)
  return insurances.insurances
}

export async function insurancesSummaryByUser(userId: UserId, email: Email): Promise<insurancesSummary | void> {
  const insurancesSummary = await getInsurancesSummary(userId, email)
  return insurancesSummary.insurancesSummary
}

export async function createUserInsurance(userId: UserId, email: Email, insuranceInfo: InsuranceInfo): Promise<boolean> {
  console.log("Posting insurance creation")
  await createInsurance(userId, email, insuranceInfo)
  return true
}

export async function deleteUserInsurance(userId: UserId, email: Email, removingInsuranceFor: RemovingInsuranceFor): Promise<boolean> {
  await removeInsurance(userId, email, removingInsuranceFor)
  console.log("Deleting insurance")
  return true
}

export async function updateUserInsurances(userId: UserId, email: Email, insurances: Insurance[]): Promise<boolean> {
  await updateInsurances(userId, email, insurances)
  console.log("Putting insurances data")
  return true
}

export async function updateUserInsurancesSummary(userId: UserId, email: Email, insurancesSummary: insurancesSummary): Promise<boolean> {
  await updateInsurancesSummary(userId, email, insurancesSummary)
  console.log("Putting insurances summary data")
  return true
}
