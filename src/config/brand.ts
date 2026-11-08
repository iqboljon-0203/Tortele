export interface WeightOption {
  label: string; // e.g., 'Bento (400g — 2 kishilik)'
  weightGrams: number;
  multiplier: number; // price multiplier
  calories: number;
  servings: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number; // In UZS
  baseWeight: string;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  isPopular?: boolean;
  isNew?: boolean;
  weightOptions?: WeightOption[];
  fillings?: string[];
  allowsCustomText?: boolean;
  allowsCandles?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  city: string;
  defaultAddress: string;
  branches: { name: string; address: string; distance: string }[];
  deliveryTime: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  cashbackPercent: number;
  initialBonusCoins: number;
  currency: string;
  supportPhone: string;
  instagram: string;
  telegramChannel: string;
  logoUrl: string;
  followersCount: string;
  theme: {
    creamBg: string;
    roseAccent: string;
    roseDark: string;
    deepCocoa: string;
    cardBg: string;
    textDark: string;
    textMuted: string;
    badgeBg: string;
    borderLight: string;
  };
  categories: Category[];
  products: Product[];
  standardFillings: string[];
}

export const BRAND_CONFIG: BrandConfig = {
  brandName: "TORTEL'E",
  tagline: "Personal Pastry Chef • Toshkent",
  city: "Toshkent",
  defaultAddress: "Toshkent sh., Mirobod tumani, Nukus ko'chasi, 24-uy",
  branches: [
    { name: "Mirobod filiali (Bosh sex)", address: "Nukus ko'chasi, 24-uy", distance: "1.2 km" },
    { name: "Chilonzor filiali", address: "Bunyodkor shoh ko'chasi, 18-uy", distance: "3.5 km" },
    { name: "Yunusobod filiali", address: "Amir Temur shoh ko'chasi, 45-uy", distance: "4.8 km" },
  ],
  deliveryTime: "40 daqiqa (Bento 2-3 soatda)",
  deliveryFee: 20000,
  freeDeliveryThreshold: 250000,
  cashbackPercent: 5,
  initialBonusCoins: 25000,
  currency: "so'm",
  supportPhone: "+998 90 980 00 24",
  instagram: "@tortele.uz",
  telegramChannel: "@tortele",
  logoUrl: "/tortele-logo.jpg",
  followersCount: "21.2K",
  theme: {
    creamBg: "#FAF6F4",
    roseAccent: "#D47A96",
    roseDark: "#B85474",
    deepCocoa: "#301D24",
    cardBg: "#FFFFFF",
    textDark: "#2B1A21",
    textMuted: "#846B74",
    badgeBg: "#FBF0F4",
    borderLight: "#F0E1E6",
  },
  categories: [
    { id: "all", name: "Barchasi", icon: "✨" },
    { id: "bento", name: "Bento (2-3 soatda)", icon: "🎂" },
    { id: "art", name: "Art-desertlar", icon: "🎨" },
    { id: "cakes", name: "Buyurtma tortlar", icon: "🎉" },
    { id: "bakery", name: "Yangi pishiriqlar", icon: "🥐" },
    { id: "coffee", name: "Kofe & Ichimliklar", icon: "☕" },
  ],
  standardFillings: [
    "Qulupnay va nozik qaymoqli krem",
    "Belgiya shokoladi va gilos (Black Forest)",
    "Pista va nordon malina (Hit)",
    "Klassik qatlama asal (Medovik)",
    "Tuzli karamel va bananli krem",
  ],
  products: [
    {
      id: "bento-love-pink",
      name: "Bento-tort \"Love & Rose\"",
      category: "bento",
      basePrice: 155000,
      baseWeight: "400 g",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 340,
      description: "Tortel'e oshpazlaridan 2-3 soatda tayyorlanadigan eng mashhur nozik bento-tort. Shaxsiy tabrik yozuvi va bepul shamcha bilan taqdim etiladi.",
      calories: 560,
      proteins: 11,
      fats: 26,
      carbs: 48,
      isPopular: true,
      allowsCustomText: true,
      allowsCandles: true,
      weightOptions: [
        { label: "Bento (400g — 2 kishilik)", weightGrams: 400, multiplier: 1.0, calories: 560, servings: "1-2 kishilik" },
        { label: "1 kg (6–8 kishilik)", weightGrams: 1000, multiplier: 2.1, calories: 1400, servings: "6-8 kishilik" },
        { label: "1.5 kg (10–12 kishilik)", weightGrams: 1500, multiplier: 2.9, calories: 2100, servings: "10-12 kishilik" },
        { label: "2 kg (15+ kishilik)", weightGrams: 2000, multiplier: 3.7, calories: 2800, servings: "15+ kishilik" },
      ],
      fillings: [
        "Qulupnay va nozik qaymoqli krem",
        "Belgiya shokoladi va gilos (Black Forest)",
        "Pista va nordon malina (Hit)",
        "Klassik qatlama asal (Medovik)",
      ],
    },
    {
      id: "art-pistachio-mousse",
      name: "Art-desert \"Pista & Malina\" (Hit)",
      category: "art",
      basePrice: 85000,
      baseWeight: "220 g",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviewsCount: 420,
      description: "Tortel'e Instagram stories'ida hit bo'lgan art-desert. Haqiqiy Eron pistasi pastasi, yengil pishloqli muss va yangi pishirilgan malina yorig'i.",
      calories: 380,
      proteins: 9,
      fats: 19,
      carbs: 34,
      isPopular: true,
      isNew: true,
      allowsCustomText: false,
      allowsCandles: true,
      weightOptions: [
        { label: "Standart porsiya (220g)", weightGrams: 220, multiplier: 1.0, calories: 380, servings: "1 kishilik" },
        { label: "Duo-set (2 dona — 440g)", weightGrams: 440, multiplier: 1.9, calories: 760, servings: "2 kishilik" },
        { label: "Party-box (4 dona — 880g)", weightGrams: 880, multiplier: 3.6, calories: 1520, servings: "4 kishilik" },
      ],
      fillings: [
        "Original pista va malinali yadro",
        "Pista va oq Belgiya shokoladi",
      ],
    },
    {
      id: "dubai-chocolate-pistachio-cake",
      name: "Dubay Shokoladli Art-Tort 1 kg",
      category: "cakes",
      basePrice: 290000,
      baseWeight: "1 kg",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviewsCount: 512,
      description: "Qirsildoq Kataifi xamiri, toza pista kremi va nozik Callebaut shokoladi ganashi bilan tayyorlangan shohona tort.",
      calories: 890,
      proteins: 16,
      fats: 54,
      carbs: 62,
      isPopular: true,
      allowsCustomText: true,
      allowsCandles: true,
      weightOptions: [
        { label: "1 kg (6–8 kishilik)", weightGrams: 1000, multiplier: 1.0, calories: 890, servings: "6-8 kishilik" },
        { label: "1.5 kg (10–12 kishilik)", weightGrams: 1500, multiplier: 1.45, calories: 1335, servings: "10-12 kishilik" },
        { label: "2 kg (15+ kishilik)", weightGrams: 2000, multiplier: 1.85, calories: 1780, servings: "15+ kishilik" },
      ],
      fillings: [
        "Qirsildoq Kataifi va Pista (Original)",
        "Pista va Sutli Belgiya Shokoladi",
      ],
    },
    {
      id: "san-sebastian-tortele",
      name: "San-Sebastyan Ispan Chizkeyki",
      category: "art",
      basePrice: 185000,
      baseWeight: "650 g",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 195,
      description: "Kuygan karamel po'sti va ichida oqib turuvchi nozik ispan qaymoqli pishlog'i. Issiq shokolad yoki pista sousi bilan birga beriladi.",
      calories: 620,
      proteins: 14,
      fats: 44,
      carbs: 32,
      allowsCustomText: false,
      allowsCandles: true,
      weightOptions: [
        { label: "1 dona (650g — 4 kishilik)", weightGrams: 650, multiplier: 1.0, calories: 620, servings: "3-4 kishilik" },
        { label: "Katta butun (1.3 kg — 8 kishilik)", weightGrams: 1300, multiplier: 1.85, calories: 1240, servings: "8 kishilik" },
      ],
      fillings: [
        "Issiq Belgiya Shokoladi sousi bilan",
        "Haqiqiy Pista sousi bilan",
        "Klassik soussiz",
      ],
    },
    {
      id: "almond-croissant-fresh",
      name: "Bodomli Fransuz Kruassani",
      category: "bakery",
      basePrice: 45000,
      baseWeight: "160 g",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 380,
      description: "Har kuni ertalab 07:30 da issiq tandirdan chiqadigan yangi pishiriq. Bodomli franjipan kremi va qovurilgan bodom bargchalari bilan.",
      calories: 410,
      proteins: 8,
      fats: 24,
      carbs: 38,
      isPopular: true,
    },
    {
      id: "pain-au-chocolat",
      name: "Shokoladli Kruassan (Pain au Chocolat)",
      category: "bakery",
      basePrice: 42000,
      baseWeight: "140 g",
      image: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=800&auto=format&fit=crop&q=80",
      rating: 4.8,
      reviewsCount: 210,
      description: "82% yog'li tabiiy sariyog'da qatlamalangan xamir va ikki qator nozik qora shokolad tayoqchalari.",
      calories: 390,
      proteins: 7,
      fats: 22,
      carbs: 36,
    },
    {
      id: "berry-cream-tart",
      name: "Yangi Qulupnayli Art-Tart",
      category: "art",
      basePrice: 52000,
      baseWeight: "180 g",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 160,
      description: "Qirsildoq fransuz sablé xamiri, Madagaskar vanilli qaymoq kremi va sarxil qulupnay mevalari.",
      calories: 310,
      proteins: 6,
      fats: 13,
      carbs: 34,
      allowsCandles: true,
    },
    {
      id: "medovik-royal",
      name: "Qirollik Asalli Torti (Medovik)",
      category: "cakes",
      basePrice: 210000,
      baseWeight: "1 kg",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 290,
      description: "Tabiiy tog' asalidan qorilgan 10 qavatli baxmal korjlar va smetana-qaymoqli nozik nordon krem.",
      calories: 590,
      proteins: 10,
      fats: 25,
      carbs: 56,
      allowsCustomText: true,
      allowsCandles: true,
      weightOptions: [
        { label: "1 kg (6–8 kishilik)", weightGrams: 1000, multiplier: 1.0, calories: 590, servings: "6-8 kishilik" },
        { label: "1.5 kg (10–12 kishilik)", weightGrams: 1500, multiplier: 1.45, calories: 885, servings: "10-12 kishilik" },
        { label: "2 kg (15+ kishilik)", weightGrams: 2000, multiplier: 1.85, calories: 1180, servings: "15+ kishilik" },
      ],
      fillings: [
        "Klassik Smetana-Qaymoq",
        "Qaynatilgan Sgushonka va Yong'oq",
      ],
    },
    {
      id: "spanish-rose-latte",
      name: "Tortel'e Rose Spanish Latte",
      category: "coffee",
      basePrice: 38000,
      baseWeight: "350 ml",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 450,
      description: "Tortel'e brend qahvasi: quyuqlashtirilgan sut, yangi maydalangan 100% Arabica espressosi va pushti atirgul suvi ifori.",
      calories: 210,
      proteins: 7,
      fats: 6,
      carbs: 27,
      isPopular: true,
    },
    {
      id: "caramel-cappuccino",
      name: "Karamelli Kapuchino 350ml",
      category: "coffee",
      basePrice: 34000,
      baseWeight: "350 ml",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop&q=80",
      rating: 4.8,
      reviewsCount: 380,
      description: "Kremdek mayin sut ko'pigi, doppio espresso va uy sharoitida qaynatilgan tuzli karamel sousi.",
      calories: 175,
      proteins: 7,
      fats: 5,
      carbs: 20,
    },
  ],
};
