const TELEGRAM_API_URL = "https://api.telegram.org"

function getApiUrl(method: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set")
  }
  return `${TELEGRAM_API_URL}/bot${token}/${method}`
}

export async function sendTelegramMessage(
  text: string,
  chatId: string = process.env.TELEGRAM_CHAT_ID as string,
  parseMode?: "Markdown" | "MarkdownV2" | "HTML"
) {
  const url = getApiUrl("sendMessage")
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...(parseMode ? { parse_mode: parseMode } : {}),
    }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Telegram API error: ${res.status} ${errorText}`)
  }

  return res.json()
}
