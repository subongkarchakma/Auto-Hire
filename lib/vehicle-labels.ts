import type { FuelType, RentalType, Transmission } from "@/lib/types/vehicle"

export const transmissionLabels: Record<Transmission, string> = {
  automatic: "Automatic",
  manual: "Manual",
}

export const fuelLabels: Record<FuelType, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Electric",
}

export const rentalTypeLabels: Record<RentalType, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
}
