const { TelegramBot } = require("openclaw");

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);

bot.on("message", (ctx) => {
  console.log("Received message:", ctx.message.text);
  ctx.reply("✅ Bot received: " + ctx.message.text);
});

bot.start();
