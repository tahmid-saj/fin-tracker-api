const express = require("express")

const expensesRouter = express.Router()

// TODO: move to env variables
// when user is signed in
expensesRouter.get("/expenses/:userid/:email", )
expensesRouter.get("/summary/:userid/:email", )

// expenses operations
expensesRouter.post("/expenses/:userid/:email/create", )
expensesRouter.delete("/expenses/:userid/:email/remove")

// user is signing out
expenses