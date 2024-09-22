import express, { Request, Response, Router } from "express"

const testRouter: Router = express.Router()

const httpGetTestRoute = (req: Request, res: Response): void => {
  res.send("test route for fin-tracker-api")
}

testRouter.get("/testroute", httpGetTestRoute)

export { testRouter }