import { NextResponse } from "next/server";

const telegramApi = (botToken: string, method: string) => `https://api.telegram.org/bot${botToken}/${method}`;

const sendMessage = async (botToken: string, payload: Record<string, unknown>) => {
  const response = await fetch(telegramApi(botToken, "sendMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};

const sendPhoto = async (botToken: string, chatId: string, dataUrl: string, caption: string) => {
  const base64 = dataUrl.split(",")[1];
  const form = new FormData();
  form.append("chat_id", chatId);
  form.append("caption", caption);
  form.append("photo", new Blob([Buffer.from(base64, "base64")], { type: "image/jpeg" }), "dizayn.jpg");
  const response = await fetch(telegramApi(botToken, "sendPhoto"), { method: "POST", body: form });
  return response.json();
};

export async function POST(request: Request) {
  try {
    const { order, text } = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN || "9226026482:AAECapPxUcMBCU0TD5ZXA28f9XxE_OT1Sh4";
    const chatId = process.env.TELEGRAM_CHAT_ID || "-1004327366395";

    if (!botToken || !chatId) {
      return NextResponse.json({
        success: true,
        demo: true,
        message: "Demo rejimi: guruhga yuborish uchun TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni sozlang.",
        orderId: order?.orderId,
      });
    }

    let data = await sendMessage(botToken, { chat_id: chatId, text, parse_mode: "HTML" });

    // Customer-typed text can contain special characters and break entity parsing; fallback safely.
    if (!data.ok) {
      data = await sendMessage(botToken, { chat_id: chatId, text, parse_mode: "Markdown" });
    }
    if (!data.ok) {
      data = await sendMessage(botToken, { chat_id: chatId, text });
    }

    if (!data.ok) {
      return NextResponse.json({ success: false, error: data.description }, { status: 502 });
    }

    // The order text is already delivered, so a failed photo must not report the order as failed.
    for (const item of order?.items ?? []) {
      if (typeof item.referenceImage !== "string" || !item.referenceImage.startsWith("data:image/")) continue;
      try {
        await sendPhoto(botToken, chatId, item.referenceImage, `#${order.orderId} dizayn namunasi: ${item.product?.name ?? ""}`);
      } catch (error) {
        console.error("Dizayn namunasini yuborib bo'lmadi", error);
      }
    }

    return NextResponse.json({ success: true, orderId: order?.orderId });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
