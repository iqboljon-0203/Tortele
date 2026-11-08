# 🎂 TORTEL'E (tortele.uz) — Telegram Mini App (WebApp)

**TORTEL'E (Personal Pastry Chef • Toshkent)** qandolat uyi uchun premium **"Smorodina" UI** etaloni asosida yaratilgan zamonaviy **Telegram Mini App (WebApp)**.

Loyiha mobil ekranlarga (max-w-md, 9:16) moslashgan, Next.js (App Router), React, TypeScript, Tailwind CSS va Telegram WebApp SDK yordamida to'liq ishlab chiqilgan.

---

## 🌟 Asosiy Imkoniyatlar va "Smorodina" UI Funksiyalari

1. **🎨 10 Daqiqalik White-Label Arxitektura (`src/config/brand.ts`):**
   - Barcha brend ma'lumotlari, filiallar, yetkazib berish narxlari, keshbek foizi (5%) va shirinliklar katalogi bitta konfiguratsiya faylidan boshqariladi.
   - **TORTEL'E** rasmiy logotipi (`/tortele-logo.jpg`), nozik pushti-krem (`#FAF6F4`, `#D47A96`) rangi va Instagram profili (`@tortele.uz`, 21.2K obunachi) bilan to'liq integratsiya qilingan.

2. **💎 Bonus va Keshbek Tizimi (Smorodina 2 ta karta):**
   - **💎 Sizning bonusingiz: 25 000 so'm** (bosganda kassada yoki kuryerga ko'rsatish uchun **QR-kod** modal oynasi ochiladi).
   - **🎁 Sizning keshbekingiz: 5%** (Har bir xariddan 5% bonus avtomatik qaytadi).

3. **🛵 Buyurtma Turi Switcher va Manzil:**
   - `🛵 Yetkazib berish (40-60 daqiqa)` va `🏪 Do'kondan olib ketish` o'tkazgichi.
   - GPS yetkazish manzili yoki Mirobod, Chilonzor, Yunusobod filiallarini tanlash.

4. **⚖️ Tort Vazni va Porsiyasini Dinamik Tanlash:**
   - `Bento (400g — 2 kishilik)`
   - `1 kg (6–8 kishilik)`
   - `1.5 kg (10–12 kishilik)`
   - `2 kg (15+ kishilik)`
   - *Vazn o'zgarganda narx va kaloriya ko'rsatkichi avtomatik o'zgaradi!*

5. **🍓 Ichki Nachinka (Tarkib) Tanlagichi:**
   - Qulupnay va nozik qaymoqli krem
   - Belgiya shokoladi va gilos (Black Forest)
   - Pista va nordon malina (Hit)
   - Klassik qatlama asal (Medovik)
   - Tuzli karamel va bananli krem

6. **✍️ "Tort ustiga nima deb yozaylik?" Maydoni:**
   - Mijoz tort ustiga yoziladigan tabrik matnini kiritadi (masalan: *"Happy Birthday Malika 20! 🎉"*).
   - Tayyor shablonlar (Happy Birthday, Tug'ilgan kuning bilan, Seni yaxshi ko'ramiz).
   - **🕯 Shamchalar soni** (`- 0 +`) tanlagichi (bepul sovg'a).

7. **🍴 Savatchada "Приборы" (Qoshiq/Sanchqi va Salfetka) Soni:**
   - `- 2 kishilik +` qulay hisoblagich.

8. **💎 "25 000 so'm bonusni ishlatish" (`Списать бонусы`) Switcher:**
   - Bitta tugma bilan yoqiladi va yakuniy summadan 25 000 so'm chegirma qilib beradi.

9. **📱 Pastki Navigatsiya (5 ta bo'lim):**
   - `Asosiy` | `Sevimlilar` | `Menyu` | `Savatcha` (mahsulotlar soni badji bilan) | `Bonus QR`.

10. **🧾 Qandolatchi va Kuryer Telegram Cheki (Preview):**
    - Buyurtma berilganda qandolat sexi va kuryer guruhiga boradigan tayyor formatlangan xabar va chek oynasi ochiladi.
    - Guruhga yuborish yoki nusxa olish tugmalari mavjud.

---

## 🚀 Mahalliy Ishga Tushirish (Local Development)

```bash
# 1. Loyiha papkasiga o'ting
cd shirinliklar

# 2. Paketlarni tekshiring (kerak bo'lsa npm install)
npm install

# 3. Dasturni ishga tushiring
npm run dev
```

Brauzeringizda oching: `http://localhost:3000` (F12 bosib mobil rejimga o'tishingiz mumkin).

---

## 🌐 Vercel ga 1 Bosishda Deploy Qilish (Yuklash)

### 1-usul: GitHub orqali (Tavsiya etiladi)
1. GitHub da yangi repozitoriy oching (masalan, `tortele-webapp`).
2. Loyihani GitHub ga push qiling:
   ```bash
   git add .
   git commit -m "TORTEL'E Telegram WebApp initial release"
   git remote add origin https://github.com/SIZNING_PROFILINGIZ/tortele-webapp.git
   git branch -M main
   git push -u origin main
   ```
3. [Vercel.com](https://vercel.com) ga kiring va **"Add New Project"** tugmasini bosing.
4. GitHub repozitoriyingizni tanlang va **"Deploy"** tugmasini bosing.
5. 1 daqiqada sizga tayyor domen beriladi (masalan: `https://tortele-webapp.vercel.app`).

### 2-usul: Vercel CLI orqali to'g'ridan-to'g'ri terminaldan
```bash
npx vercel
```
Savollarga `Enter` bosib tasdiqlasangiz, to'g'ridan-to'g'ri internetga yuklanadi!

---

## 🤖 Telegram BotFather da WebApp ni Ulash

1. Telegram da [@BotFather](https://t.me/BotFather) botiga kiring.
2. `/newbot` buyrug'i bilan yangi bot oching (masalan: `@tortele_cake_bot`).
3. Bot yaratilgach, sizga **Bot Token** beriladi.
4. BotFather ga `/setmenubutton` buyrug'ini yuboring:
   - Botingizni tanlang.
   - WebApp ochiladigan tugma nomini kiriting: `🍰 Menyuni ochish`
   - Vercel havolangizni kiriting: `https://tortele-webapp.vercel.app`
5. Endi mijozlaringiz botingizga kirishi bilanoq pastdagi **"🍰 Menyuni ochish"** tugmasi orqali to'liq ilovadan foydalanishi mumkin!

---

## ⚡ Standalone Telegram Bot (`bot/bot.js`)

Agar botingiz `/start` bosganda chiroyli tabrik xabari va WebApp tugmasini chiqarishini istasangiz:

```bash
# Bot tokeningiz va Vercel havolangizni kiriting
$env:TELEGRAM_BOT_TOKEN="BOT_TOKENINGIZ"
$env:WEBAPP_URL="https://tortele-webapp.vercel.app"

# Botni yurgizing
node bot/bot.js
```
