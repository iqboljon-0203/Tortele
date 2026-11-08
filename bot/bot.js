/**
 * TORTEL'E Telegram Bot (Native Node.js - No extra dependencies required)
 * 
 * Ushbu bot mijozlarga Telegram ichida TORTEL'E Mini App'ini ochib beradi.
 * Ishga tushirish uchun:
 * 1. BotFather dan token oling: @BotFather -> /newbot
 * 2. .env yoki pastdagi o'zgaruvchiga bot tokeningizni va Vercel havolasini yozing
 * 3. Terminalda: node bot/bot.js
 */

const fs = require("fs");
const path = require("path");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "SIZNING_BOT_TOKENINGIZ";
const WEBAPP_URL = process.env.WEBAPP_URL || "https://shirinliklar.vercel.app";

if (BOT_TOKEN === "SIZNING_BOT_TOKENINGIZ") {
  console.log("⚠️ Eslatma: TELEGRAM_BOT_TOKEN o'rnatilmagan.");
  console.log("Foydalanish: TELEGRAM_BOT_TOKEN='token' WEBAPP_URL='https://...' node bot/bot.js");
}

const LOGO_PATH = path.join(__dirname, "../public/brand/tortele-welcome.png");

let lastUpdateId = 0;
let logoFileId = null;

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
    `🎂 *Assalomu alaykum, ${(firstName || "qadrli mijoz").replace(/[*_`[]/g, "")}!*\n\n` +
    `🌸 *TORTEL'E (Personal Pastry Chef)* rasmiy Telegram WebApp do'koniga xush kelibsiz!\n\n` +
    `Bizda:\n` +
    `• 🍰 *Bento-tortlar 2-3 soatda* yangi pishirib yetkaziladi\n` +
    `• 🎨 Eksklyuziv *Art-desertlar* va Dubay shokoladli torti\n` +
    `• 🥐 Har kuni ertalabki yangi *Fransuz kruassanlari*\n` +
    `• 💎 *25 000 so'm boshlang'ich bonus* va har xariddan 5% keshbek!\n\n` +
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

  const sent = await sendLogoPhoto({
    chat_id: chatId,
    caption: text,
    parse_mode: "Markdown",
    reply_markup: keyboard,
  });

  // A missing or rejected picture must not leave /start unanswered.
  if (!sent) {
    await callTelegram("sendMessage", {
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    });
  }
}

/** Uploads the logo once, then reuses Telegram's file_id for later greetings. */
async function sendLogoPhoto(payload) {
  if (logoFileId) {
    const data = await callTelegram("sendPhoto", { ...payload, photo: logoFileId });
    if (data && data.ok) return true;
    logoFileId = null;
  }

  try {
    const form = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      form.append(key, typeof value === "string" ? value : typeof value === "object" ? JSON.stringify(value) : String(value));
    }
    form.append("photo", new Blob([fs.readFileSync(LOGO_PATH)], { type: "image/png" }), "tortele.png");

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: "POST", body: form });
    const data = await res.json();
    if (!data.ok) {
      console.error("Logoni yuborib bo'lmadi:", data.description);
      return false;
    }
    logoFileId = data.result.photo[data.result.photo.length - 1].file_id;
    return true;
  } catch (err) {
    console.error("Logoni yuborib bo'lmadi:", err.message);
    return false;
  }
}

async function pollUpdates() {
  const data = await callTelegram("getUpdates", {
    offset: lastUpdateId + 1,
    timeout: 30,
  });

  if (data && data.ok && Array.isArray(data.result)) {
    for (const update of data.result) {
      lastUpdateId = update.update_id;

      if (update.message) {
        const msg = update.message;
        const chatId = msg.chat.id;
        const text = msg.text;
        const firstName = msg.from ? msg.from.first_name : "Mijoz";

        // Handle WebApp data returned from client
        if (msg.web_app_data) {
          try {
            const orderData = JSON.parse(msg.web_app_data.data);
            await callTelegram("sendMessage", {
              chat_id: chatId,
              text: `✅ *Rahmat! Buyurtmangiz #${orderData.orderId} qabul qilindi!*\n\nTez orada qandolatchi va kuryerimiz siz bilan bog'lanadi.`,
              parse_mode: "Markdown",
            });
          } catch {
            // ignore
          }
          continue;
        }

        if (text && text.startsWith("/start")) {
          await sendWelcome(chatId, firstName);
        }
      }
    }
  }

  // Poll recursively
  setTimeout(pollUpdates, 1000);
}

console.log("🚀 TORTEL'E Telegram Bot ishga tushdi...");
console.log(`🔗 WebApp URL: ${WEBAPP_URL}`);
pollUpdates();

