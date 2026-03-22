const { TelegramBot } = require("openclaw");
const { Anthropic } = require("@anthropic-ai/sdk");

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

bot.on("message", async (ctx) => {
  try {
    const userMessage = ctx.message.text;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // free/lightweight model
      max_tokens: 200,
      messages: [{ role: "user", content: userMessage }],
    });

    ctx.reply(response.content[0].text);
  } catch (err) {
    console.error(err);
    ctx.reply("Oops, something went wrong talking to Claude.");
  }
});

bot.start();
