import { insurancesDatabase, insurancesSummaryDatabase } from "./insurances.mongo"

import { validateGetInsurancesSummary } from "../../utils/validations/insurances/insurances.validation"

import { INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER } from "../../utils/constants/insurance.constants"
import { Email, Insurance, InsuranceInfo, insurancesSummary, RemovingInsuranceFor, UserId } from "./insurances.types"
import { Document } from "mongodb"

// TODO: move validation for crud to validation directory

// insurances crud for mongodb

// user sign in
export async function getInsurances(userId: UserId, email: Email): Promise<{ insurances: Insurance[] }> {
  const insurances = await insurancesDatabase.find({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    const insurances = res.map((insurance: Document) => {
      return {
        insuranceFor: insurance.insuranceFor,
        insurancePayment: insurance.insurancePayment,
        insuranceInterval: insurance.insuranceInterval,
        insuranceFirstPaymentDate: insurance.insuranceFirstPaymentDate,
        insuranceEndDate: insurance.insuranceEndDate
      }
    })

    return insurances
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  })

  return {
    insurances: [ ...insurances ]
  }
}

export async function getInsurancesSummary(userId: UserId, email: Email): Promise<{ insurancesSummary: insurancesSummary }> {
  const insurancesSummary = await insurancesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    if (validateGetInsurancesSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then((res: Document) => {
    const summary = {
      currentTotalInsurancePlanned: res.currentTotalInsurancePlanned
    }

    return summary
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  })

  return {
    insurancesSummary: insurancesSummary
  }
}

// insurances operations
export async function calculateTotalInsurancePlanned(insuranceInfo: InsuranceInfo): Promise<number> {

  let newCurrentTotalInsurancePlanned = 0.0

  switch (insuranceInfo.insuranceInterval) {
    case INSURANCE_INTERVALS.daily:
      insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.daily
      break
    case INSURANCE_INTERVALS.weekly:
      insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.weekly
      break
    case INSURANCE_INTERVALS.monthly:
      insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.monthly
      break
    case INSURANCE_INTERVALS.quarterly:
      insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.quarterly
      break
    case INSURANCE_INTERVALS.semiannually:
      insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.semiannually
      break
    case INSURANCE_INTERVALS.annually:
      insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.annually
      break
    default:
      break
  }

  Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
    return this;
  }

  const startDate = new Date(insuranceInfo.insuranceFirstPaymentDate)
  const endDate = new Date(insuranceInfo.insuranceEndDate)

  for (let paymentDate = startDate; 
    paymentDate <= endDate; 
    // paymentDate.setDate(paymentDate.getDate() + insuranceIntervalDaysMultiplier)
    paymentDate = paymentDate.addDays(insuranceIntervalDaysMultiplier)
  ) {

    newCurrentTotalInsurancePlanned += Number(insuranceInfo.insurancePayment)
    const newPaymentDate = paymentDate.toISOString().split('T')[0]
  }

  return newCurrentTotalInsurancePlanned
}

export async function createInsuranceSummary(userId: UserId, email: Email, insuranceInfo: InsuranceInfo): Promise<void> {
  const newCurrentTotalInsurancePlanned = await calculateTotalInsurancePlanned(insuranceInfo)

  const insuranceSummaryExists = await insurancesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })

  if (!insuranceSummaryExists) {

    const newInsuranceSummary = new insurancesSummaryDatabase({
      userId: userId,
      email: email,
      currentTotalInsurancePlanned: Number(newCurrentTotalInsurancePlanned)
    })

    await newInsuranceSummary.save()
    console.log("created new insurance summary")
  } else {
    await updateInsuranceSummary(userId, email, insuranceSummaryExists, insuranceInfo, newCurrentTotalInsurancePlanned)
  }
}

export async function updateInsuranceSummary(userId: UserId, email: Email, 
  insuranceSummaryExists: any, insuranceInfo: InsuranceInfo, newCurrentTotalInsurancePlanned: number): Promise<void> {
  await insurancesSummaryDatabase.updateOne({
    userId: userId,
    email: email
  }, {
    $inc: {
      currentTotalInsurancePlanned: Number(newCurrentTotalInsurancePlanned)
    }
  })
}

export async function createInsurance(userId: UserId, email: Email, insuranceInfo: InsuranceInfo): Promise<void> {
  const insuranceExists = await insurancesDatabase.findOne({
    userId: userId,
    email: email,
    insuranceFor: insuranceInfo.insuranceFor
  })

  if (!insuranceExists) {
    const newInsurance = new insurancesDatabase({
      userId: userId,
      email: email,
      insuranceFor: insuranceInfo.insuranceFor,
      insurancePayment: insuranceInfo.insurancePayment,
      insuranceInterval: insuranceInfo.insuranceInterval,
      insuranceFirstPaymentDate: insuranceInfo.insuranceFirstPaymentDate,
      insuranceEndDate: insuranceInfo.insuranceEndDate
    })
  
    await newInsurance.save()
    console.log("created new insurance")
  
    await createInsuranceSummary(userId, email, insuranceInfo)
  } else {
    return
  }
}

export async function removeInsurance(userId: UserId, email: Email, removingInsuranceFor: RemovingInsuranceFor): Promise<void> {

  const insuranceExists = await insurancesDatabase.findOne({
    userId: userId,
    email: email,
    insuranceFor: removingInsuranceFor
  })

  if (insuranceExists) {
    const newCurrentTotalInsurancePlanned = await calculateTotalInsurancePlanned(insuranceExists)

    await insurancesSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      $inc: {
        currentTotalInsurancePlanned: -Number(newCurrentTotalInsurancePlanned),
      }
    })

    await insurancesDatabase.deleteOne({
      userId: userId,
      email: email,
      insuranceFor: removingInsuranceFor
    })
  } else {
    return
  }
}

// sign out
export async function updateInsurances(userId: UserId, email: Email, insurances: Insurance[]): Promise<void> {
  const insurancesExist = await insurancesDatabase.findOne({
    userId: userId,
    email: email
  })

  if (insurancesExist && insurances !== undefined && insurances.length !== 0) {
    insurances.map(async (insurance) => {
      await insurancesDatabase.updateOne({
        userId: userId,
        email: email,
        insuranceFor: insurance.insuranceFor
      }, {
        insuranceFor: insurance.insuranceFor,
        insurancePayment: insurance.insurancePayment,
        insuranceInterval: insurance.insuranceInterval,
        insuranceFirstPaymentDate: insurance.insuranceFirstPaymentDate,
        insuranceEndDate: insurance.insuranceEndDate,
      })
    })
  } else {
    return
  }
}

export async function updateInsurancesSummary(userId: UserId, email: Email, insurancesSummary: insurancesSummary): Promise<void> {
  const insurancesSummaryExists = await insurancesSummaryDatabase.findOne({
    userId: userId,
    email: email
  })

  if (insurancesSummaryExists && insurancesSummary !== undefined && insurancesSummary !== Object({})) {
    await insurancesSummaryDatabase.updateOne({
      userId: userId,
      email: email
    }, {
      currentTotalInsurancePlanned: insurancesSummary.currentTotalInsurancePlanned
    })
  } else {
    return
  }
}
