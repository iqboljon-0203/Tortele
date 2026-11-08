/**
 * TORTEL'E Telegram Bot (Native Node.js)
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "9226026482:AAECapPxUcMBCU0TD5ZXA28f9XxE_OT1Sh4";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1004327366395";
const WEBAPP_URL = process.env.WEBAPP_URL || "https://tortele.vercel.app";
const WELCOME_PHOTO_URL = `${WEBAPP_URL}/brand/tortele-welcome.png`;

async function callTelegram(method, data) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error(`Telegram API xatosi (${method}):`, err.message);
    return null;
  }
}

async function sendWelcome(chatId, firstName) {
  const caption = 
    `🎂 <b>Assalomu alaykum, ${firstName || "qadrli mijoz"}!</b>\n\n` +
    `🌸 <b>TORTEL'E (Shaxsiy qandolat ustasi)</b> rasmiy Telegram do'koniga xush kelibsiz!\n\n` +
    `Siz uchun eng sara shirinliklar:\n` +
    `• 🍰 <b>Bento-tortlar 2-3 soatda</b> yangi pishirib yetkaziladi\n` +
    `• 🎨 Eksklyuziv <b>Art-desertlar</b> va Dubay shokoladli torti\n` +
    `• 🥐 Har kuni ertalabki yangi <b>Fransuz kruassanlari</b>\n` +
    `• 💎 <b>25 000 so'm boshlang'ich bonus</b> va har xariddan 5% keshbek!\n\n` +
    `Quyidagi tugmalardan birini tanlang:`;

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

  // Try sendPhoto first
  const photoRes = await callTelegram("sendPhoto", {
    chat_id: chatId,
    photo: WELCOME_PHOTO_URL,
    caption: caption,
    parse_mode: "HTML",
    reply_markup: inlineKeyboard,
  });

  if (!photoRes || !photoRes.ok) {
    await callTelegram("sendMessage", {
      chat_id: chatId,
      text: caption,
      parse_mode: "HTML",
      reply_markup: inlineKeyboard,
    });
  }

  // Set chat menu button
  await callTelegram("setChatMenuButton", {
    chat_id: chatId,
    menu_button: {
      type: "web_app",
      text: "🍰 Menyuni ochish",
      web_app: { url: WEBAPP_URL },
    },
  });
}

module.exports = { callTelegram, sendWelcome };
