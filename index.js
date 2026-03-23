const { TelegramBot } = require("openclaw");
const fetch = require("node-fetch");

console.log(">>> Bot starting <<<");

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);

bot.on("message", async (ctx) => {
  console.log("Message received:", ctx.message.text);

  // Simple Claude integration via REST API
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 200,
        messages: [{ role: "user", content: ctx.message.text }],
      }),
    });

    const data = await response.json();
    ctx.reply(data.content?.[0]?.text || "⚠️ Claude didn’t return a response.");
  } catch (err) {
    console.error("Claude error:", err);
    ctx.reply("❌ Error talking to Claude.");
  }
});

bot.start();

