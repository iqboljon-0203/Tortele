import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "9226026482:AAECapPxUcMBCU0TD5ZXA28f9XxE_OT1Sh4";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1004327366395";
const WEBAPP_URL = process.env.WEBAPP_URL || "https://tortele.vercel.app";

async function sendTelegramMessage(chatId: string | number, text: string, replyMarkup?: any) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
        reply_markup: replyMarkup,
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("Telegram sendMessage error:", error);
    return null;
  }
}

// POST: Telegram Webhook updates
export async function POST(request: Request) {
  try {
    const update = await request.json();

    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const text = msg.text || "";
      const firstName = msg.from?.first_name || "Mijoz";

      // 1. WebApp orqali buyurtma yuborilganda
      if (msg.web_app_data) {
        try {
          const orderData = JSON.parse(msg.web_app_data.data);
          
          // Mijozga tasdiq xabari
          await sendTelegramMessage(
            chatId,
            `🎂 <b>Rahmat, ${firstName}!</b>\n\n` +
            `Sizning <b>#${orderData.orderId || "Yangi"}</b> raqamli buyurtmangiz muvaffaqiyatli qabul qilindi. Tez orada qandolatchi va kuryerimiz siz bilan bog'lanadi! 🌸`
          );

          // Qandolat sexi va Kuryer guruhiga xabar yuborish
          if (CHAT_ID) {
            const groupText =
              `🔔 <b>YANGI BUYURTMA #${orderData.orderId || ""}</b>\n` +
              `🏪 <b>TORTEL'E (tortele.uz)</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>Mijoz:</b> ${orderData.customerName || firstName}\n` +
              `📞 <b>Telefon:</b> ${orderData.customerPhone || "Ko'rsatilmagan"}\n` +
              `🛵 <b>Turi:</b> ${orderData.orderType === "delivery" ? "Yetkazib berish (40-60 daqiqa)" : "Olib ketish"}\n` +
              `📍 <b>Manzil:</b> ${orderData.deliveryAddress || "Do'kondan"}\n` +
              `🍴 <b>Приборы:</b> ${orderData.cutleryCount ? `${orderData.cutleryCount} kishilik` : "Kerak emas"}\n` +
              `💰 <b>Jami to'lov:</b> <b>${orderData.finalTotal?.toLocaleString("uz-UZ")} so'm</b>\n` +
              `⚡ <b>Holat:</b> Qabul qilindi, sexga yuborildi ✅`;

            await sendTelegramMessage(CHAT_ID, groupText);
          }
        } catch (e) {
          console.error("web_app_data parse error:", e);
        }
        return NextResponse.json({ ok: true });
      }

      // 2. /start buyrug'i kelganda
      if (text.startsWith("/start")) {
        const welcomeText =
          `🎂 <b>Assalomu alaykum, ${firstName}!</b>\n\n` +
          `🌸 <b>TORTEL'E (Shaxsiy qandolat ustasi)</b> rasmiy Telegram WebApp do'koniga xush kelibsiz!\n\n` +
          `Bizda:\n` +
          `• 🍰 <b>Bento-tortlar 2-3 soatda</b> yangi pishirib yetkaziladi\n` +
          `• 🎨 Eksklyuziv <b>Art-desertlar</b> va Dubay shokoladli torti\n` +
          `• 🥐 Har kuni ertalabki yangi <b>Fransuz kruassanlari</b>\n` +
          `• 💎 <b>25 000 so'm boshlang'ich bonus</b> va har xariddan 5% keshbek!\n\n` +
          `Quyidagi tugmani bosing va menyuni oching:`;

        const keyboard = {
          inline_keyboard: [
            [
              {
                text: "🍰 Do'konni ochish (WebApp)",
                web_app: { url: WEBAPP_URL },
              },
            ],
            [
              {
                text: "📸 Instagram (@tortele.uz)",
                url: "https://instagram.com/tortele.uz",
              },
              {
                text: "💬 Aloqa / Admin",
                url: "https://t.me/tortele",
              },
            ],
          ],
        };

        await sendTelegramMessage(chatId, welcomeText, keyboard);
        return NextResponse.json({ ok: true });
      }

      // 3. Har qanday boshqa xabar yozilganda
      const defaultText =
        `🌸 <b>TORTEL'E</b> qandolat menyusini ko'rish va buyurtma berish uchun quyidagi tugmani bosing:`;
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: "🍰 Menyuni ochish (TORTEL'E WebApp)",
              web_app: { url: WEBAPP_URL },
            },
          ],
        ],
      };
      await sendTelegramMessage(chatId, defaultText, keyboard);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook POST error:", error);
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
  }
}

// GET: Webhook holatini tekshirish yoki avtomatik sozlash
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // Agar action=set yoki action=setWebhook bo'lsa, avtomatik ulaymiz
  if (action === "set" || action === "setWebhook") {
    const webhookUrl = `${WEBAPP_URL}/api/telegram-webhook`;
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${encodeURIComponent(webhookUrl)}`
    );
    const data = await res.json();
    return NextResponse.json({
      message: "Webhook sozlandi",
      webhookUrl,
      telegramResponse: data,
    });
  }

  // Webhook info qaytarish
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const data = await res.json();
    return NextResponse.json({
      status: "active",
      bot: "@Torteleuz_bot",
      currentWebhook: data.result,
      instruction: `Webhookni yangilash uchun: ${WEBAPP_URL}/api/telegram-webhook?action=set`,
    });
  } catch (err) {
    return NextResponse.json({ status: "error", error: (err as Error).message });
  }
}
