import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "9226026482:AAECapPxUcMBCU0TD5ZXA28f9XxE_OT1Sh4";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1004327366395";
const WEBAPP_URL = process.env.WEBAPP_URL || "https://tortele.vercel.app";
const WELCOME_PHOTO_URL = `${WEBAPP_URL}/brand/tortele-welcome.png`;

// Helper: send text message
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

// Helper: send photo with caption and buttons (with fallback to sendMessage)
async function sendTelegramPhoto(chatId: string | number, photoUrl: string, caption: string, replyMarkup?: any) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        photo: photoUrl,
        caption: caption,
        parse_mode: "HTML",
        reply_markup: replyMarkup,
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      console.warn("sendPhoto failed, falling back to sendMessage:", data);
      return await sendTelegramMessage(chatId, caption, replyMarkup);
    }
    return data;
  } catch (error) {
    console.error("Telegram sendPhoto error:", error);
    return await sendTelegramMessage(chatId, caption, replyMarkup);
  }
}

// Helper: answer callback queries
async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text: text,
      }),
    });
  } catch (e) {
    console.error("answerCallbackQuery error:", e);
  }
}

// Helper: set menu button with proper UTF-8 emoji
async function setMenuButton(chatId?: number | string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`;
  const payload: any = {
    menu_button: {
      type: "web_app",
      text: "🍰 Menyuni ochish",
      web_app: { url: WEBAPP_URL },
    },
  };
  if (chatId) payload.chat_id = chatId;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("setMenuButton error:", e);
  }
}

// Filiallar haqida ma'lumot matni
const BRANCHES_TEXT =
  `🏪 <b>TORTEL'E filiallari va qandolat sexlari:</b>\n\n` +
  `📍 <b>1. Mirobod filiali (Bosh sex)</b>\n` +
  `Manzil: Mirobod tumani, Nukus ko'chasi, 24-uy\n` +
  `Mo'ljal: Rossiya elchixonasi yaqinida\n\n` +
  `📍 <b>2. Chilonzor filiali</b>\n` +
  `Manzil: Bunyodkor shoh ko'chasi, 18-uy\n` +
  `Mo'ljal: Mirzo Ulug'bek metro bekati yonida\n\n` +
  `📍 <b>3. Yunusobod filiali</b>\n` +
  `Manzil: Amir Temur shoh ko'chasi, 45-uy\n` +
  `Mo'ljal: Megaplanet savdo majmuasi ro'parasida\n\n` +
  `🛵 <b>Yetkazib berish:</b> 40 daqiqa (Bento 2-3 soatda)\n` +
  `🕒 <b>Ish vaqti:</b> 09:00 dan 22:00 gacha (Har kuni)\n` +
  `📞 <b>Telefon:</b> +998 90 980 00 24`;

// Bog'lanish / Aloqa matni
const CONTACTS_TEXT =
  `📞 <b>TORTEL'E bilan bog'lanish:</b>\n\n` +
  `🌸 <b>Shaxsiy qandolat ustasi:</b> @tortele\n` +
  `📞 <b>Buyurtmalar va ma'lumot:</b> +998 90 980 00 24\n` +
  `📸 <b>Instagram:</b> @tortele.uz\n` +
  `🛵 <b>Dastavka:</b> Toshkent shahri bo'ylab 40-60 daqiqada\n` +
  `🕒 <b>Qabul vaqti:</b> 09:00 — 22:00`;

// POST: Telegram Webhook updates
export async function POST(request: Request) {
  try {
    const update = await request.json();

    // 1. Inline tugma (Callback query) bosilganda
    if (update.callback_query) {
      const cb = update.callback_query;
      const chatId = cb.message?.chat?.id || cb.from?.id;
      const data = cb.data;

      await answerCallbackQuery(cb.id);

      if (data === "show_branches") {
        await sendTelegramMessage(chatId, BRANCHES_TEXT, {
          inline_keyboard: [
            [
              {
                text: "🍰 Menyuni ochish (Buyurtma)",
                web_app: { url: WEBAPP_URL },
              },
            ],
            [
              {
                text: "💬 Administrator bilan bog'lanish",
                url: "https://t.me/tortele",
              },
            ],
          ],
        });
      }
      return NextResponse.json({ ok: true });
    }

    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const text = msg.text || "";
      const firstName = msg.from?.first_name || "Mijoz";

      // 2. WebApp orqali buyurtma yuborilganda
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

      // 3. /start buyrug'i kelganda
      if (text.startsWith("/start")) {
        // Chat menyu tugmasini darhol to'g'ri UTF-8 emoji bilan yangilaymiz
        setMenuButton(chatId);

        const caption =
          `🎂 <b>Assalomu alaykum, ${firstName}!</b>\n\n` +
          `🌸 <b>TORTEL'E (Shaxsiy qandolat ustasi)</b> rasmiy Telegram do'koniga xush kelibsiz!\n\n` +
          `Siz uchun eng sara shirinliklar:\n` +
          `• 🍰 <b>Bento-tortlar 2-3 soatda</b> yangi pishirib yetkaziladi\n` +
          `• 🎨 Eksklyuziv <b>Art-desertlar</b> va Dubay shokoladli torti\n` +
          `• 🥐 Har kuni ertalabki yangi <b>Fransuz kruassanlari</b>\n` +
          `• 💎 <b>25 000 so'm boshlang'ich bonus</b> va har xariddan 5% keshbek!\n\n` +
          `Quyidagi tugmalardan birini tanlang:`;

        // Chiroyli, keng va kesilmaydigan Inline klaviatura
        const inlineKeyboard = {
          inline_keyboard: [
            [
              {
                text: "🍰 Do'konni ochish (WebApp)",
                web_app: { url: WEBAPP_URL },
              },
            ],
            [
              {
                text: "💎 25 000 so'm bonusni olish",
                web_app: { url: WEBAPP_URL },
              },
            ],
            [
              {
                text: "📍 Filiallar va lokatsiya",
                callback_data: "show_branches",
              },
              {
                text: "🛍 Buyurtmalarim",
                web_app: { url: `${WEBAPP_URL}?tab=orders` },
              },
            ],
            [
              {
                text: "📸 Instagram",
                url: "https://instagram.com/tortele.uz",
              },
              {
                text: "💬 Aloqa / Admin",
                url: "https://t.me/tortele",
              },
            ],
          ],
        };

        // 1. Logoli rasmli xabar yuborish
        await sendTelegramPhoto(chatId, WELCOME_PHOTO_URL, caption, inlineKeyboard);

        // 2. Doimiy pastki klaviatura (ReplyKeyboardMarkup) o'rnatish
        const replyKeyboard = {
          keyboard: [
            [
              {
                text: "🍰 Menyuni ochish",
                web_app: { url: WEBAPP_URL },
              },
            ],
            [
              {
                text: "💎 Bonuslarim (25 000 so'm)",
                web_app: { url: WEBAPP_URL },
              },
              {
                text: "🛍 Buyurtmalarim",
                web_app: { url: `${WEBAPP_URL}?tab=orders` },
              },
            ],
            [
              {
                text: "📍 Bizning filiallar",
              },
              {
                text: "📞 Aloqa / Admin",
              },
            ],
          ],
          resize_keyboard: true,
          is_persistent: true,
        };

        await sendTelegramMessage(
          chatId,
          `<i>Pastdagi tugmalar yoki menyu orqali ham istalgan paytda buyurtma berishingiz mumkin 👇</i>`,
          replyKeyboard
        );

        return NextResponse.json({ ok: true });
      }

      // 4. "Filiallar" yoki manzil so'ralganda
      if (text.includes("filial") || text.includes("Filial") || text.includes("manzil") || text.includes("Manzil")) {
        await sendTelegramMessage(chatId, BRANCHES_TEXT, {
          inline_keyboard: [
            [
              {
                text: "🍰 Menyuni ochish (Buyurtma)",
                web_app: { url: WEBAPP_URL },
              },
            ],
          ],
        });
        return NextResponse.json({ ok: true });
      }

      // 5. "Aloqa" yoki admin so'ralganda
      if (text.includes("Aloqa") || text.includes("aloqa") || text.includes("Admin") || text.includes("admin") || text.includes("telefon")) {
        await sendTelegramMessage(chatId, CONTACTS_TEXT, {
          inline_keyboard: [
            [
              {
                text: "💬 Administratorga yozish",
                url: "https://t.me/tortele",
              },
              {
                text: "📸 Instagram",
                url: "https://instagram.com/tortele.uz",
              },
            ],
            [
              {
                text: "🍰 Menyuni ochish (WebApp)",
                web_app: { url: WEBAPP_URL },
              },
            ],
          ],
        });
        return NextResponse.json({ ok: true });
      }

      // 6. Boshqa har qanday xabar yozilganda
      const defaultText =
        `🌸 <b>TORTEL'E</b> qandolat do'konimiz menyusini ko'rish va buyurtma berish uchun quyidagi tugmani bosing:`;
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: "🍰 Menyuni ochish (TORTEL'E WebApp)",
              web_app: { url: WEBAPP_URL },
            },
          ],
          [
            {
              text: "📍 Filiallar",
              callback_data: "show_branches",
            },
            {
              text: "💬 Administrator",
              url: "https://t.me/tortele",
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

  // Har bir GET chaqiruvida Chat Menu Buttonni to'g'ri UTF-8 emoji bilan yangilab qo'yamiz
  await setMenuButton();

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
      menuButton: "🍰 Menyuni ochish o'rnatildi",
      currentWebhook: data.result,
      instruction: `Webhookni yangilash uchun: ${WEBAPP_URL}/api/telegram-webhook?action=set`,
    });
  } catch (err) {
    return NextResponse.json({ status: "error", error: (err as Error).message });
  }
}
