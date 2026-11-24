export type VehicleCategory =
  "suv" | "sedan" | "luxury" | "electric" | "van" | "convertible"

export type Transmission = "automatic" | "manual"

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric"

export type RentalType = "daily" | "weekly" | "monthly"

/**
 * Illustrative demo owner profile. These are fictional names used to show how
 * an owner block will look once listings come from real accounts.
 */
export type VehicleOwner = {
  name: string
  memberSince: number
  responseTime: string
  listingCount: number
}

/**
 * Illustrative demo rental terms. Placeholder values only — not an actual
 * rental policy, deposit schedule, or insurance product.
 */
export type VehicleTerms = {
  minAge: number
  mileagePerDay: string
  fuelPolicy: string
  deposit: number
  cancellation: string
  insurance: string
}

/**
 * Shape of a rental listing. Mock values live in `lib/data/vehicles.ts`
 * and are not backed by a database yet.
 */
export type Vehicle = {
  id: string
  name: string
  model: string
  year: number
  category: VehicleCategory
  imageUrl: string
  imageAlt: string
  /** Extra gallery shots. The main image is `imageUrl` and is not repeated. */
  galleryImages: string[]
  seats: number
  transmission: Transmission
  fuel: FuelType
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  rentalTypes: RentalType[]
  currency: "USD"
  rating: number
  reviewCount: number
  location: string
  available: boolean
  /** ISO date for the next available pickup when `available` is false. */
  availableFrom?: string
  description: string
  highlights: string[]
  pickupNotes: string
  owner: VehicleOwner
  terms: VehicleTerms
}

export type VehicleSearch = {
  location: string
  pickupDate: string
  returnDate: string
  category: VehicleCategory | "any"
}

/** Filters accepted by the `/vehicles` browsing page. */
export type VehicleFilters = {
  query?: string
  category?: VehicleCategory | "any"
  location?: string
  maxPrice?: number
  availableOnly?: boolean
}
