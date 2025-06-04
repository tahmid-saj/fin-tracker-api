import express, { Router } from "express"

import { httpGetChatBotResponse, httpGetChatBotResponseStream, 
  httpGetChatBotSession } from "./chatbot.controller.js"

const chatbotRouter: Router = express.Router()

// TODO: move to env variables
// chatbot responses
chatbotRouter.post("/response", httpGetChatBotResponse)

// chatbot stream
chatbotRouter.post("/stream", httpGetChatBotResponseStream)

// get chatbot session data
chatbotRouter.post("/session", httpGetChatBotSession)

export { chatbotRouter }