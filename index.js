console.log(">>> Bot code is running <<<");

// Keep it simple: just stay alive
setInterval(() => {
  console.log("Bot is alive at", new Date().toISOString());
}, 10000);
