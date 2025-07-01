
export type LogType = {
  userId: string,
  email: string,
  requestPath: string,
  requestMethod: string,
  responseStatus: string,
  responseCode: number
}

export type LogQuery = {
  begTime: number,
  endTime: number,
  userId: string,
  email: string,
  requestPath: string,
  requestMethod: string,
  responseStatus: string,
  responseCode: number,
  offset: number,
  limit: number
}