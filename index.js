const { TelegramBot } = require("openclaw");

console.log(">>> Bot starting <<<");

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);

bot.on("message", (ctx) => {
  console.log("Message received:", ctx.message.text);
  ctx.reply("✅ Bot received: " + ctx.message.text);
});

bot.start();
