import type { Vehicle, VehicleCategory } from "@/lib/types/vehicle"

export const categoryLabels: Record<VehicleCategory, string> = {
  suv: "SUV",
  sedan: "Sedan",
  luxury: "Luxury",
  electric: "Electric",
  van: "Van",
  convertible: "Convertible",
}

export type VehicleCategoryInfo = {
  value: VehicleCategory
  label: string
  blurb: string
}

export const vehicleCategories: VehicleCategoryInfo[] = [
  { value: "suv", label: "SUV", blurb: "Room for the whole crew" },
  { value: "sedan", label: "Sedan", blurb: "Comfort for the daily drive" },
  { value: "luxury", label: "Luxury", blurb: "Arrive in something special" },
  { value: "electric", label: "Electric", blurb: "Quiet, clean, and quick" },
  { value: "van", label: "Van", blurb: "Space for gear and detours" },
  {
    value: "convertible",
    label: "Convertible",
    blurb: "Open-air weekend escapes",
  },
]

function unsplashPhoto(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`
}

/**
 * Mock approved listings. Shaped like the documents we expect from MongoDB
 * later, so the UI can switch to real data without changing its props.
 */
export const featuredVehicles: Vehicle[] = [
  {
    id: "rav4-hybrid-2023",
    name: "Toyota RAV4 Hybrid",
    category: "suv",
    imageUrl: unsplashPhoto("photo-1617469767053-d3b523a0b982"),
    imageAlt: "Silver Toyota RAV4 parked in front of trees",
    seats: 5,
    transmission: "automatic",
    fuel: "hybrid",
    pricePerDay: 58,
    currency: "USD",
    rating: 4.8,
    reviewCount: 86,
    location: "Los Angeles, CA",
    available: true,
  },
  {
    id: "audi-rs7-sportback-2022",
    name: "Audi RS7 Sportback",
    category: "sedan",
    imageUrl: unsplashPhoto("photo-1616422285623-13ff0162193c"),
    imageAlt: "White Audi RS7 Sportback on a mountain road",
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 124,
    currency: "USD",
    rating: 4.9,
    reviewCount: 54,
    location: "San Francisco, CA",
    available: true,
  },
  {
    id: "porsche-911-turbo-s-2021",
    name: "Porsche 911 Turbo S",
    category: "luxury",
    imageUrl: unsplashPhoto("photo-1580274455191-1c62238fa333"),
    imageAlt: "Black Porsche 911 Turbo parked by a harbor at sunset",
    seats: 4,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 210,
    currency: "USD",
    rating: 5,
    reviewCount: 38,
    location: "Miami, FL",
    available: true,
  },
  {
    id: "tesla-model-3-long-range-2023",
    name: "Tesla Model 3 Long Range",
    category: "electric",
    imageUrl: unsplashPhoto("photo-1606016159991-dfe4f2746ad5"),
    imageAlt: "White Tesla Model 3 driving on a highway",
    seats: 5,
    transmission: "automatic",
    fuel: "electric",
    pricePerDay: 76,
    currency: "USD",
    rating: 4.7,
    reviewCount: 112,
    location: "Austin, TX",
    available: true,
  },
  {
    id: "volkswagen-t2-camper-1972",
    name: "Volkswagen T2 Camper",
    category: "van",
    imageUrl: unsplashPhoto("photo-1527786356703-4b100091cd2c"),
    imageAlt:
      "Beige Volkswagen camper van with the roof tent raised beside the sea",
    seats: 4,
    transmission: "manual",
    fuel: "petrol",
    pricePerDay: 94,
    currency: "USD",
    rating: 4.6,
    reviewCount: 41,
    location: "Seattle, WA",
    available: true,
  },
  {
    id: "jaguar-f-type-2020",
    name: "Jaguar F-Type",
    category: "convertible",
    imageUrl: unsplashPhoto("photo-1507136566006-cfc505b114fc"),
    imageAlt: "Red Jaguar F-Type parked along a city street",
    seats: 2,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 138,
    currency: "USD",
    rating: 4.8,
    reviewCount: 29,
    location: "Denver, CO",
    available: true,
  },
]
