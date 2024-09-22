import { errorOnGetChatBotResponse } from "../../errors/chatbot.errors.js"
import { DEFAULT_CHATBOT_MAX_TOKENS } from "../../constants/chatbot.constants.js"
import { openai } from "../../../services/open-ai/open-ai.service.js"

export async function getChatBotResponse(messageInput: string) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: messageInput }],
      model: process.env.REACT_APP_OPEN_API_MODEL!,
      max_tokens: DEFAULT_CHATBOT_MAX_TOKENS
    });

    return {
      message: response?.choices[0]?.message.content
    }
  } catch (error) {
    console.log("Error getting chatbot response")
    errorOnGetChatBotResponse()
  }
}