import express, { Request, Response, Router } from "express"
import { createUser, getUser } from "../../redis/queries/users/users.queries.js"
import { getSession, saveSession } from "../../redis/queries/sessions/sessions.queries.js"
import { logMiddleware } from "../middlewares/log.middleware.js"

const testRouter: Router = express.Router()

testRouter.use(logMiddleware)

const httpGetTestRoute = async (req: Request, res: Response): Promise<any> => {
  // user test:
  createUser({
    userId: "bob",
    email: "bob@gmail.com"
  })
  const user = await getUser({
    userId: "bob",
    email: "bob@gmail.com"
  })
  console.log(user)

  // session test:
  saveSession({
    sessionId: "123",
    userId: "bob",
    email: "bob@gmail.com"
  })
  const session = await getSession("123")
  console.log(session)

  return res.send("test route for fin-tracker-api")
}

testRouter.get("/testroute", httpGetTestRoute)

export { testRouter }