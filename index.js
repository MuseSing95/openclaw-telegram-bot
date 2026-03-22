const { TelegramBot } = require("openclaw");
const fetch = require("node-fetch");

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);

bot.on("message", async (ctx) => {
  try {
    const userMessage = ctx.message.text;

    // Call Claude API directly
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307", // lightweight free model
        max_tokens: 200,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();

    // Reply with Claude’s output
    if (data.content && data.content[0] && data.content[0].text) {
      ctx.reply(data.content[0].text);
    } else {
      ctx.reply("⚠️ Claude didn’t return a response.");
    }
  } catch (err) {
    console.error("Error:", err);
    ctx.reply("❌ Error talking to Claude.");
  }
});

bot.start();
