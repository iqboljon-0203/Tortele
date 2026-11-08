/**
 * TORTEL'E Telegram Bot (Native Node.js)
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "9226026482:AAECapPxUcMBCU0TD5ZXA28f9XxE_OT1Sh4";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1004327366395";
const WEBAPP_URL = process.env.WEBAPP_URL || "https://tortele.vercel.app";

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
  const text = 
    `🎂 <b>Assalomu alaykum, ${firstName || "qadrli mijoz"}!</b>\n\n` +
    `🌸 <b>TORTEL'E (Shaxsiy qandolat ustasi)</b> rasmiy Telegram WebApp do'koniga xush kelibsiz!\n\n` +
    `Bizda:\n` +
    `• 🍰 <b>Bento-tortlar 2-3 soatda</b> yangi pishirib yetkaziladi\n` +
    `• 🎨 Eksklyuziv <b>Art-desertlar</b> va Dubay shokoladli torti\n` +
    `• 🥐 Har kuni ertalabki yangi <b>Fransuz kruassanlari</b>\n` +
    `• 💎 <b>25 000 so'm boshlang'ich bonus</b> va har xariddan 5% keshbek!\n\n` +
    `Quyidagi tugmani bosing va qandolat menyumizni oching:`;

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

  await callTelegram("sendMessage", {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
}

console.log("🚀 TORTEL'E Telegram Bot skripti tayyor.");
console.log(`🔗 WebApp URL: ${WEBAPP_URL}`);
