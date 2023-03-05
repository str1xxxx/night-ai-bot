import TelegramBot from "node-telegram-bot-api";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// Устанавливаем токен для Telegram-бота
const telegramToken = "5557591942:AAH9azVvtxpGoKymconYWiLsHviI4OGJ8Ng";
const bot = new TelegramBot(telegramToken, {
  polling: true,
  username: "night_ai_bot",
});

// Определяем команду /start
bot.onText(/\/питання/, (msg) => {
  generateResponse(msg);
});

bot.on("message", async (msg) => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  if (randomNumber === 3) return generateResponse(msg);
});

async function generateResponse(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const randomNumber = Math.floor(Math.random() * 300) + 1;

  try {
    // Вызываем API OpenAI для генерации текста
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.7,
      max_tokens: randomNumber,
    });

    const generatedText = completion.data.choices[0].text;

    // Отправляем сгенерированный текст пользователю
    bot.sendMessage(chatId, generatedText);
  } catch (error) {
    console.error(error);
    bot.sendMessage(
      chatId,
      "Произошла ошибка при обработке вашего запроса. Попробуйте позже."
    );
  }
}
