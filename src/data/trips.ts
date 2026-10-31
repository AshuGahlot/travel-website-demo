export type Category = "all" | "beach" | "mountain" | "city" | "culture" | "adventure";

export interface Bilingual {
  en: string;
  ja: string;
}

export interface Trip {
  id: number;
  image: string;
  country: Bilingual;
  title: Bilingual;
  summary: Bilingual;
  price: number; // USD per person
  rating: number;
  reviews: number;
  days: number;
  category: Exclude<Category, "all">;
  badge?: Bilingual;
}

export const TRIPS: Trip[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/29537651/pexels-photo-29537651.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Kyoto, Japan", ja: "京都、日本" },
    title: { en: "Kyoto Cultural Escape", ja: "京都文化の旅" },
    summary: {
      en: "Walk beneath thousands of vermilion torii gates and stay in a traditional ryokan.",
      ja: "何千もの朱色の鳥居の下を歩き、伝統的な旅館に宿泊する特別な体験。",
    },
    price: 1280,
    rating: 4.9,
    reviews: 482,
    days: 5,
    category: "culture",
    badge: { en: "Bestseller", ja: "人気No.1" },
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Santorini, Greece", ja: "サントリーニ島、ギリシャ" },
    title: { en: "Santorini Sunset Getaway", ja: "サントリーニ島サンセットの休暇" },
    summary: {
      en: "Whitewashed villages, caldera views and the world's most famous sunset from Oia.",
      ja: "白壁の村、カルデラの絶景、イアから眺める世界一有名な夕日。",
    },
    price: 1850,
    rating: 4.8,
    reviews: 356,
    days: 6,
    category: "beach",
    badge: { en: "Romantic", ja: "ロマンチック" },
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/4423657/pexels-photo-4423657.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Bali, Indonesia", ja: "バリ島、インドネシア" },
    title: { en: "Bali Tropical Retreat", ja: "バリ島トロピカルリトリート" },
    summary: {
      en: "Jungle villas, emerald rice terraces and beach clubs on the Island of the Gods.",
      ja: "ジャングルのヴィラ、エメラルドの棚田、神々の島のビーチクラブ。",
    },
    price: 980,
    rating: 4.7,
    reviews: 618,
    days: 7,
    category: "beach",
    badge: { en: "Hot deal", ja: "お得プラン" },
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/34345854/pexels-photo-34345854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Swiss Alps", ja: "スイスアルプス" },
    title: { en: "Swiss Alps Adventure", ja: "スイスアルプス冒険の旅" },
    summary: {
      en: "Cable cars above the clouds, alpine lakes and scenic train rides through the mountains.",
      ja: "雲の上のロープウェイ、高山の湖、山あいを走る絶景列車の旅。",
    },
    price: 2400,
    rating: 4.9,
    reviews: 274,
    days: 8,
    category: "mountain",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/1287455/pexels-photo-1287455.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Maldives", ja: "モルディブ" },
    title: { en: "Maldives Luxury Cruise", ja: "モルディブ贅沢クルーズ" },
    summary: {
      en: "Overwater villas, private sandbanks and turquoise lagoons straight from a postcard.",
      ja: "水上ヴィラ、プライベートの砂洲、絵葉書のようなターコイズのラグーン。",
    },
    price: 2950,
    rating: 5.0,
    reviews: 198,
    days: 5,
    category: "beach",
    badge: { en: "Luxury", ja: "ラグジュアリー" },
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/31291321/pexels-photo-31291321.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Iceland", ja: "アイスランド" },
    title: { en: "Iceland Northern Lights", ja: "アイスランド オーロラの旅" },
    summary: {
      en: "Chase the aurora across volcanic landscapes, glaciers and black-sand beaches.",
      ja: "火山の大地、氷河、黒い砂浜を巡りながらオーロラを追いかける。",
    },
    price: 2100,
    rating: 4.8,
    reviews: 341,
    days: 6,
    category: "adventure",
    badge: { en: "Northern lights", ja: "オーロラ" },
  },
  {
    id: 7,
    image:
      "https://images.pexels.com/photos/40437973/pexels-photo-40437973.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Tokyo, Japan", ja: "東京、日本" },
    title: { en: "Tokyo City Lights", ja: "東京シティライト" },
    summary: {
      en: "Neon streets, Michelin dining and serene shrines in the world's biggest city.",
      ja: "ネオンの街、ミシュランの食、そして世界最大の都市の静かな神社。",
    },
    price: 1150,
    rating: 4.8,
    reviews: 529,
    days: 4,
    category: "city",
  },
  {
    id: 8,
    image:
      "https://images.pexels.com/photos/14681748/pexels-photo-14681748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    country: { en: "Paris, France", ja: "パリ、フランス" },
    title: { en: "Paris Romantic Escape", ja: "パリ ロマンチックな旅" },
    summary: {
      en: "Golden-hour picnics by the Seine, world-class art and café terraces in Montmartre.",
      ja: "セーヌ川の黄金のピクニック、世界級のアート、モンマルトルのカフェテラス。",
    },
    price: 1420,
    rating: 4.6,
    reviews: 445,
    days: 5,
    category: "city",
  },
];

export const HERO_IMAGE =
  "https://images.pexels.com/photos/37402013/pexels-photo-37402013.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

export const DESTINATION_IMAGES: { name: Bilingual; image: string; trips: number }[] = [
  { name: { en: "Kyoto", ja: "京都" }, image: TRIPS[0].image, trips: 12 },
  { name: { en: "Santorini", ja: "サントリーニ島" }, image: TRIPS[1].image, trips: 8 },
  { name: { en: "Bali", ja: "バリ島" }, image: TRIPS[2].image, trips: 15 },
  { name: { en: "Swiss Alps", ja: "スイスアルプス" }, image: TRIPS[3].image, trips: 6 },
  { name: { en: "Maldives", ja: "モルディブ" }, image: TRIPS[4].image, trips: 9 },
  { name: { en: "Iceland", ja: "アイスランド" }, image: TRIPS[5].image, trips: 7 },
  { name: { en: "Tokyo", ja: "東京" }, image: TRIPS[6].image, trips: 11 },
  { name: { en: "Paris", ja: "パリ" }, image: TRIPS[7].image, trips: 10 },
];
