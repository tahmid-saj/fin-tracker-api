import { Request, Response } from "express"
import { getChatBotResponse, getChatBotResponseStream } from "../../utils/requests/chatbot/chatbot.requests.js"
import { RANDOM_SEPARATOR } from "../../utils/constants/chatbot.constants.js"

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

// chatbot response as a stream via SSE
async function httpGetChatBotResponseStream(req: Request, res: Response) {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  })
  res.flushHeaders()

  const messageInput = String(req.body)

  await getChatBotResponseStream(messageInput, (chunk: string) => {
    res.write(`data: ${chunk}${RANDOM_SEPARATOR}`)
  })

  res.write(`data: [DONE]${RANDOM_SEPARATOR}`)
  res.end()
}

export {
  httpGetChatBotResponse,
  httpGetChatBotResponseStream
}