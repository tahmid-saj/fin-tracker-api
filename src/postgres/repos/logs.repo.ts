import { LogQuery, LogType } from "../../models/logs/logs.types.js";
import { toCamelCase } from "../../utils/helpers/helpers.utils.js";
import { pgPool } from "../pool/pool.js";
import { insertLogQuery, readAllLogsQuery, readLogsByRequestQuery, readLogsByResponseQuery, 
  readLogsByTimeQuery, readLogsByUserQuery } from "../queries/logs.queries.js";

export class LogsRepo {
  static async insertLog(log: LogType) {
    // the actual returned result set will be in the rows field
    const { rows } = await pgPool.query(insertLogQuery, [
      Math.floor(Date.now() / 1000),
      log.userId,
      log.email,
      log.requestPath,
      log.requestMethod,
      log.responseStatus,
      log.responseCode
    ])

    return toCamelCase(rows)
  }

  static async readAllLogs(logQuery: LogQuery) {
    const { rows } = await pgPool.query(readAllLogsQuery, [
      logQuery.begTime, logQuery.endTime, logQuery.userId, logQuery.email,
      logQuery.requestPath, logQuery.requestMethod,
      logQuery.responseStatus, logQuery.responseCode,
      logQuery.offset,
      logQuery.limit
    ])

    return toCamelCase(rows)
  }

  static async readLogsByTime(begTime: number, endTime: number, offset: number, limit: number) {
    const { rows } = await pgPool.query(readLogsByTimeQuery, [
      begTime, endTime,
      offset,
      limit
    ])

    return toCamelCase(rows)
  }

  static async readLogsByUser(userId: string, email: string, offset: number, limit: number) {
    const { rows } = await pgPool.query(readLogsByUserQuery, [
      userId, email,
      offset,
      limit
    ])

    return toCamelCase(rows)
  }

  static async readLogsByRequest(requestPath: string, requestMethod: string, offset: number, limit: number) {
    const { rows } = await pgPool.query(readLogsByRequestQuery, [
      requestPath, requestMethod,
      offset,
      limit
    ])

    return toCamelCase(rows)
  }

  static async readLogsByResponse(responseStatus: string, responsecode: number, offset: number, limit: number) {
    const { rows } = await pgPool.query(readLogsByResponseQuery, [
      responseStatus, responsecode,
      offset,
      limit
    ])

    return toCamelCase(rows)
  }
}