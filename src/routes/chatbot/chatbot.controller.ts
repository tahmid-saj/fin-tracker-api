import { Request, Response } from "express"
import { getChatBotResponse } from "../../utils/requests/chatbot/chatbot.requests.js"

// chatbot response
async function httpGetChatBotResponse(req: Request, res: Response): Promise<void> {
  try {
    const messageInput = String(req.body)
    const resGetChatBotResponse = await getChatBotResponse(messageInput)

    if (resGetChatBotResponse) res.status(200).json(resGetChatBotResponse)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {
  httpGetChatBotResponse
}