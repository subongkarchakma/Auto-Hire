export type VehicleCategory =
  "suv" | "sedan" | "luxury" | "electric" | "van" | "convertible"

export type Transmission = "automatic" | "manual"

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric"

/**
 * Shape of a rental listing. Mock values live in `lib/data/vehicles.ts`
 * and are not backed by a database yet.
 */
export type Vehicle = {
  id: string
  name: string
  category: VehicleCategory
  imageUrl: string
  imageAlt: string
  seats: number
  transmission: Transmission
  fuel: FuelType
  pricePerDay: number
  currency: "USD"
  rating: number
  reviewCount: number
  location: string
  available: boolean
}

export type VehicleSearch = {
  location: string
  pickupDate: string
  returnDate: string
  category: VehicleCategory | "any"
}
