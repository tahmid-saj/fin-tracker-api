import { Request, Response, NextFunction } from "express"
import { LogsRepo } from "../../postgres/repos/logs.repo.js"
import { ENVIRONMENT_MODES } from "../../utils/constants/shared.constants.js"

export const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  if (process.env.ENVIRONMENT_MODE === ENVIRONMENT_MODES.test) {
    const { userId, email } = req.params
  
    // capture read status code after response is sent
    const originalSend = res.send
    res.send = function (body: any) {
      LogsRepo.insertLog({
        userId: userId ?? "unknown",
        email: email ?? "unknown",
        requestPath: req.path,
        requestMethod: req.method,
        responseStatus: res.statusCode === 200 ? "OK" : "ERROR",
        responseCode: res.statusCode
      }).catch(console.error)
  
      // we'll hook onto the originalSend function, and perform the logging right before the 
      // originalSend function is invoked
      return originalSend.call(this, body)
    }
  }
  
  next()
}