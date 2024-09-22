import express, { Router } from "express"

import { httpGetChatBotResponse } from "./chatbot.controller"

const chatbotRouter: Router = express.Router()

// TODO: move to env variables
// chatbot responses
chatbotRouter.post("/response", httpGetChatBotResponse)

export { chatbotRouter }