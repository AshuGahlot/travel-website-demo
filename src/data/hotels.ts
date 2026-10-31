import type { Bilingual } from "./trips";

export type Amenity = "wifi" | "pool" | "spa" | "breakfast" | "gym" | "restaurant" | "beach" | "onsen" | "parking";

export interface Hotel {
  id: number;
  tripId: number;
  name: Bilingual;
  area: Bilingual;
  image: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  roomType: Bilingual;
  amenities: Amenity[];
  distanceKm: number;
  freeCancel: boolean;
  tag?: Bilingual;
}

export const HOTELS: Hotel[] = [
  {
    id: 101, tripId: 1,
    name: { en: "Ryokan Sakura An", ja: "旅館 さくら庵" },
    area: { en: "Gion, Kyoto", ja: "京都・祇園" },
    image: "https://images.pexels.com/photos/37067835/pexels-photo-37067835.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 5, rating: 4.9, reviews: 318, pricePerNight: 245,
    roomType: { en: "Tatami suite with garden view", ja: "庭園ビュー付き和室スイート" },
    amenities: ["onsen", "breakfast", "wifi", "restaurant", "spa"],
    distanceKm: 0.8, freeCancel: true, tag: { en: "Traveler favorite", ja: "人気の宿" },
  },
  {
    id: 102, tripId: 1,
    name: { en: "Kyoto Machiya House", ja: "京町家ハウス" },
    area: { en: "Higashiyama, Kyoto", ja: "京都・東山" },
    image: "https://images.pexels.com/photos/34936748/pexels-photo-34936748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 4, rating: 4.7, reviews: 204, pricePerNight: 160,
    roomType: { en: "Private townhouse, 2 bedrooms", ja: "一棟貸し町家・2ベッドルーム" },
    amenities: ["wifi", "breakfast", "parking"],
    distanceKm: 1.6, freeCancel: true,
  },
  {
    id: 103, tripId: 2,
    name: { en: "Caldera Blue Suites", ja: "カルデラ・ブルースイーツ" },
    area: { en: "Oia, Santorini", ja: "サントリーニ島・イア" },
    image: "https://images.pexels.com/photos/11363037/pexels-photo-11363037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 5, rating: 4.8, reviews: 276, pricePerNight: 390,
    roomType: { en: "Cave suite with private plunge pool", ja: "専用プール付きケーブスイート" },
    amenities: ["pool", "breakfast", "wifi", "spa", "restaurant"],
    distanceKm: 0.3, freeCancel: true, tag: { en: "Sunset view", ja: "夕日ビュー" },
  },
  {
    id: 104, tripId: 3,
    name: { en: "Ubud Jungle Villas", ja: "ウブド・ジャングルヴィラ" },
    area: { en: "Ubud, Bali", ja: "バリ島・ウブド" },
    image: "https://images.pexels.com/photos/20768597/pexels-photo-20768597.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 4, rating: 4.8, reviews: 512, pricePerNight: 115,
    roomType: { en: "Villa with infinity pool", ja: "インフィニティプール付きヴィラ" },
    amenities: ["pool", "spa", "breakfast", "wifi", "restaurant"],
    distanceKm: 2.1, freeCancel: true, tag: { en: "Best value", ja: "コスパ最高" },
  },
  {
    id: 105, tripId: 4,
    name: { en: "Alpine Lodge Grindelwald", ja: "アルパインロッジ・グリンデルワルト" },
    area: { en: "Grindelwald, Switzerland", ja: "スイス・グリンデルワルト" },
    image: "https://images.pexels.com/photos/39333422/pexels-photo-39333422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 4, rating: 4.9, reviews: 189, pricePerNight: 310,
    roomType: { en: "Chalet room with balcony", ja: "バルコニー付きシャレールーム" },
    amenities: ["spa", "breakfast", "wifi", "gym", "parking", "restaurant"],
    distanceKm: 0.5, freeCancel: false,
  },
  {
    id: 106, tripId: 5,
    name: { en: "Lagoon Water Villas", ja: "ラグーン・ウォーターヴィラ" },
    area: { en: "North Malé Atoll", ja: "北マーレ環礁" },
    image: "https://images.pexels.com/photos/9394274/pexels-photo-9394274.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 5, rating: 5.0, reviews: 164, pricePerNight: 620,
    roomType: { en: "Overwater villa with sea deck", ja: "海上デッキ付き水上ヴィラ" },
    amenities: ["beach", "pool", "spa", "breakfast", "restaurant", "wifi"],
    distanceKm: 0, freeCancel: true, tag: { en: "Luxury", ja: "ラグジュアリー" },
  },
  {
    id: 107, tripId: 6,
    name: { en: "Aurora Glass Lodge", ja: "オーロラ・グラスロッジ" },
    area: { en: "Vík, Iceland", ja: "アイスランド・ヴィーク" },
    image: "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 4, rating: 4.8, reviews: 231, pricePerNight: 280,
    roomType: { en: "Glass-roof cabin for aurora viewing", ja: "オーロラ観賞用ガラス天井キャビン" },
    amenities: ["breakfast", "wifi", "spa", "parking"],
    distanceKm: 3.4, freeCancel: true, tag: { en: "Aurora alerts", ja: "オーロラ通知付き" },
  },
  {
    id: 108, tripId: 7,
    name: { en: "Shinjuku Sky Hotel", ja: "新宿スカイホテル" },
    area: { en: "Shinjuku, Tokyo", ja: "東京・新宿" },
    image: "https://images.pexels.com/photos/34118720/pexels-photo-34118720.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 4, rating: 4.7, reviews: 688, pricePerNight: 190,
    roomType: { en: "Deluxe king with skyline view", ja: "スカイラインビュー・デラックスキング" },
    amenities: ["wifi", "gym", "restaurant", "breakfast"],
    distanceKm: 0.4, freeCancel: true,
  },
  {
    id: 109, tripId: 8,
    name: { en: "Hôtel Montmartre Rive", ja: "オテル・モンマルトル・リヴ" },
    area: { en: "Montmartre, Paris", ja: "パリ・モンマルトル" },
    image: "https://images.pexels.com/photos/7722164/pexels-photo-7722164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 4, rating: 4.6, reviews: 402, pricePerNight: 225,
    roomType: { en: "Classic double with balcony", ja: "バルコニー付きクラシックダブル" },
    amenities: ["wifi", "breakfast", "restaurant", "gym"],
    distanceKm: 1.1, freeCancel: true,
  },
  {
    id: 110, tripId: 3,
    name: { en: "Seminyak Beach Resort", ja: "スミニャック・ビーチリゾート" },
    area: { en: "Seminyak, Bali", ja: "バリ島・スミニャック" },
    image: "https://images.pexels.com/photos/3011575/pexels-photo-3011575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stars: 5, rating: 4.7, reviews: 376, pricePerNight: 198,
    roomType: { en: "Ocean-view room with pool access", ja: "プールアクセス付きオーシャンビュー" },
    amenities: ["beach", "pool", "spa", "gym", "wifi", "restaurant"],
    distanceKm: 0.2, freeCancel: true,
  },
];

export type VehicleId = "shuttle" | "sedan" | "van" | "luxury";

export interface Vehicle {
  id: VehicleId;
  name: Bilingual;
  desc: Bilingual;
  price: number; // USD per direction
  seats: number;
  bags: number;
}

export const VEHICLES: Vehicle[] = [
  { id: "shuttle", name: { en: "Shared shuttle", ja: "シェアシャトル" }, desc: { en: "Comfortable minibus with other guests", ja: "他のお客様と相乗りのミニバス" }, price: 18, seats: 2, bags: 2 },
  { id: "sedan", name: { en: "Private sedan", ja: "プライベートセダン" }, desc: { en: "Private car, driver meets you at arrivals", ja: "専用車・到着ロビーでお出迎え" }, price: 45, seats: 3, bags: 3 },
  { id: "van", name: { en: "Premium van", ja: "プレミアムバン" }, desc: { en: "Extra space for families and luggage", ja: "ご家族や荷物に余裕のある広さ" }, price: 72, seats: 6, bags: 6 },
  { id: "luxury", name: { en: "Luxury chauffeur", ja: "ラグジュアリー送迎" }, desc: { en: "Executive class with refreshments", ja: "ドリンク付きエグゼクティブクラス" }, price: 130, seats: 3, bags: 4 },
];

export const hotelsForTrip = (tripId: number) => HOTELS.filter((h) => h.tripId === tripId);
