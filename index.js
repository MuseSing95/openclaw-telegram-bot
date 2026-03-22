const { TelegramBot } = require("openclaw");

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);

bot.on("message", (ctx) => {
  ctx.reply("✅ Bot received your message: " + ctx.message.text);
});

bot.start();
