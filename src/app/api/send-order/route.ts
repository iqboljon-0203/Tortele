import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order, text } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      // Send message to Telegram Channel / Group via Telegram Bot API
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      });

      const data = await response.json();
      return NextResponse.json({ success: true, telegram: data });
    }

    // If no credentials configured yet (demo mode)
    return NextResponse.json({
      success: true,
      message: "Demo rejimida qabul qilindi. Telegram guruhga yuborish uchun TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni sozlang.",
      orderId: order?.orderId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
