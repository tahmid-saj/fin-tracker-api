import express, { Request, Response, Router } from "express"
import { createUser, getUser } from "../../redis/queries/users/users.queries.js"

const testRouter: Router = express.Router()

const httpGetTestRoute = async (req: Request, res: Response): Promise<void> => {
  createUser({
    userId: "bob",
    email: "bob@gmail.com"
  })

  const user = await getUser({
    userId: "bob",
    email: "bob@gmail.com"
  })

  console.log(user)

  res.send("test route for fin-tracker-api")
}

testRouter.get("/testroute", httpGetTestRoute)

export { testRouter }