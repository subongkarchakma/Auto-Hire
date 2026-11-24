import type {
  Vehicle,
  VehicleCategory,
  VehicleFilters,
  VehicleOwner,
  VehicleTerms,
} from "@/lib/types/vehicle"

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
 * Shared demo terms. Every listing is illustrative: no payment is taken, and
 * none of these values describe a real rental agreement.
 */
const demoTerms: VehicleTerms = {
  minAge: 25,
  mileagePerDay: "200 mi/day included, then $0.35/mi",
  fuelPolicy: "Full-to-full",
  deposit: 300,
  cancellation: "Free until 48 hours before pickup",
  insurance: "Standard collision cover included",
}

function terms(overrides: Partial<VehicleTerms> = {}): VehicleTerms {
  return { ...demoTerms, ...overrides }
}

function owner(
  name: string,
  memberSince: number,
  responseTime: string,
  listingCount: number
): VehicleOwner {
  return { name, memberSince, responseTime, listingCount }
}

/**
 * Mock approved listings. Shaped like the documents we expect from MongoDB
 * later, so the UI can switch to real data without changing its props.
 *
 * Owner profiles and rental terms are fictional demo content.
 */
export const vehicles: Vehicle[] = [
  {
    id: "rav4-hybrid-2023",
    name: "Toyota RAV4 Hybrid",
    model: "RAV4 Hybrid",
    year: 2023,
    category: "suv",
    imageUrl: unsplashPhoto("photo-1617469767053-d3b523a0b982"),
    imageAlt: "Silver Toyota RAV4 parked in front of trees",
    galleryImages: [],
    seats: 5,
    transmission: "automatic",
    fuel: "hybrid",
    pricePerDay: 58,
    pricePerWeek: 340,
    pricePerMonth: 1250,
    rentalTypes: ["daily", "weekly", "monthly"],
    currency: "USD",
    rating: 4.8,
    reviewCount: 86,
    location: "Los Angeles, CA",
    available: true,
    description:
      "A practical hybrid SUV for city errands and weekend trips. The RAV4 pairs generous cargo space with low fuel use and an upright, easy driving position.",
    highlights: [
      "Hybrid drivetrain, around 40 mpg combined",
      "Folding rear seats for extra cargo",
      "Apple CarPlay and Android Auto",
      "All-wheel drive for wet roads",
    ],
    pickupNotes:
      "Pickup at the downtown garage or the LAX terminal, arranged after booking.",
    owner: owner("Maya Rodriguez", 2021, "Replies within 1 hour", 3),
    terms: terms(),
  },
  {
    id: "audi-rs7-sportback-2022",
    name: "Audi RS7 Sportback",
    model: "RS7 Sportback",
    year: 2022,
    category: "sedan",
    imageUrl: unsplashPhoto("photo-1616422285623-13ff0162193c"),
    imageAlt: "White Audi RS7 Sportback on a mountain road",
    galleryImages: [],
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 124,
    pricePerWeek: 720,
    pricePerMonth: 2600,
    rentalTypes: ["daily", "weekly", "monthly"],
    currency: "USD",
    rating: 4.9,
    reviewCount: 54,
    location: "San Francisco, CA",
    available: true,
    description:
      "A four-door performance car with a twin-turbo V8 and a cabin built for long drives. Comfortable in traffic, genuinely quick on an open road.",
    highlights: [
      "Twin-turbo V8 with 591 hp",
      "Quattro all-wheel drive",
      "Massaging front seats",
      "Bang & Olufsen sound system",
    ],
    pickupNotes: "Pickup in SoMa, a short walk from Market Street transit.",
    owner: owner("Daniel Okafor", 2020, "Replies within 2 hours", 5),
    terms: terms({
      minAge: 28,
      deposit: 800,
      mileagePerDay: "150 mi/day included, then $0.45/mi",
    }),
  },
  {
    id: "porsche-911-turbo-s-2021",
    name: "Porsche 911 Turbo S",
    model: "911 Turbo S",
    year: 2021,
    category: "luxury",
    imageUrl: unsplashPhoto("photo-1580274455191-1c62238fa333"),
    imageAlt: "Black Porsche 911 Turbo parked by a harbor at sunset",
    galleryImages: [],
    seats: 4,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 210,
    pricePerWeek: 1250,
    pricePerMonth: 4500,
    rentalTypes: ["daily", "weekly"],
    currency: "USD",
    rating: 5,
    reviewCount: 38,
    location: "Miami, FL",
    available: true,
    description:
      "A weekend car that happens to be usable every day: all-wheel drive, a composed ride, and acceleration that still feels absurd.",
    highlights: [
      "640 hp flat-six with all-wheel drive",
      "Sport Chrono package",
      "Adaptive sport seats",
      "Front axle lift for driveways",
    ],
    pickupNotes:
      "Pickup from a covered garage in Brickell, with a short handover walkthrough.",
    owner: owner("Priya Raman", 2019, "Replies within 3 hours", 2),
    terms: terms({
      minAge: 30,
      deposit: 2500,
      mileagePerDay: "100 mi/day included, then $1.00/mi",
      insurance: "Premium cover with a $1,000 excess",
    }),
  },
  {
    id: "tesla-model-3-long-range-2023",
    name: "Tesla Model 3 Long Range",
    model: "Model 3 Long Range",
    year: 2023,
    category: "electric",
    imageUrl: unsplashPhoto("photo-1606016159991-dfe4f2746ad5"),
    imageAlt: "White Tesla Model 3 driving on a highway",
    galleryImages: [],
    seats: 5,
    transmission: "automatic",
    fuel: "electric",
    pricePerDay: 76,
    pricePerWeek: 440,
    pricePerMonth: 1600,
    rentalTypes: ["daily", "weekly", "monthly"],
    currency: "USD",
    rating: 4.7,
    reviewCount: 112,
    location: "Austin, TX",
    available: true,
    description:
      "An easy electric sedan with enough range for a full day of driving. Supercharger access and one-pedal driving make it simple to live with.",
    highlights: [
      "Around 330 mi of range",
      "Supercharger access included",
      "Autopilot driver assistance",
      "Glass roof and minimal cabin",
    ],
    pickupNotes:
      "Pickup at a downtown garage with a charged battery; return it above 20%.",
    owner: owner("Luis Ortega", 2022, "Replies within 1 hour", 4),
    terms: terms({
      deposit: 500,
      fuelPolicy: "Return charged to at least 20%",
    }),
  },
  {
    id: "volkswagen-t2-camper-1972",
    name: "Volkswagen T2 Camper",
    model: "T2 Camper",
    year: 1972,
    category: "van",
    imageUrl: unsplashPhoto("photo-1527786356703-4b100091cd2c"),
    imageAlt:
      "Beige Volkswagen camper van with the roof tent raised beside the sea",
    galleryImages: [],
    seats: 4,
    transmission: "manual",
    fuel: "petrol",
    pricePerDay: 94,
    pricePerWeek: 540,
    pricePerMonth: 1950,
    rentalTypes: ["daily", "weekly", "monthly"],
    currency: "USD",
    rating: 4.6,
    reviewCount: 41,
    location: "Seattle, WA",
    available: true,
    description:
      "A restored camper van with a pop-top roof, a small kitchen, and a bed for two. Slow, charming, and happiest on coastal roads.",
    highlights: [
      "Pop-top roof with a double bed",
      "Two-burner stove and sink",
      "Restored interior and upholstery",
      "Cruises comfortably at 55 mph",
    ],
    pickupNotes:
      "Pickup in Ballard; a 20-minute walkthrough covers the roof, stove, and hookups.",
    owner: owner("Hannah Fischer", 2021, "Replies within 4 hours", 1),
    terms: terms({
      deposit: 600,
      mileagePerDay: "150 mi/day included, then $0.40/mi",
      cancellation: "Free until 7 days before pickup",
    }),
  },
  {
    id: "jaguar-f-type-2020",
    name: "Jaguar F-Type",
    model: "F-Type",
    year: 2020,
    category: "convertible",
    imageUrl: unsplashPhoto("photo-1507136566006-cfc505b114fc"),
    imageAlt: "Red Jaguar F-Type parked along a city street",
    galleryImages: [],
    seats: 2,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 138,
    pricePerWeek: 790,
    pricePerMonth: 2850,
    rentalTypes: ["daily", "weekly"],
    currency: "USD",
    rating: 4.8,
    reviewCount: 29,
    location: "Denver, CO",
    available: true,
    description:
      "A rear-drive convertible with a supercharged V6 and a loud, theatrical exhaust. Best with the roof down on a clear mountain road.",
    highlights: [
      "Supercharged V6 with 380 hp",
      "Soft top opens in about 12 seconds",
      "Meridian sound system",
      "Heated seats for cool evenings",
    ],
    pickupNotes: "Pickup in LoDo, two blocks from Union Station.",
    owner: owner("Grace Whitfield", 2020, "Replies within 2 hours", 3),
    terms: terms({
      minAge: 28,
      deposit: 900,
      mileagePerDay: "150 mi/day included, then $0.50/mi",
    }),
  },
  {
    id: "bmw-m4-competition-2023",
    name: "BMW M4 Competition",
    model: "M4 Competition",
    year: 2023,
    category: "luxury",
    imageUrl: unsplashPhoto("photo-1555215695-3004980ad54e"),
    imageAlt: "Blue BMW M4 Competition parked in front of a building",
    galleryImages: [],
    seats: 4,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 168,
    pricePerWeek: 960,
    pricePerMonth: 3400,
    rentalTypes: ["daily", "weekly"],
    currency: "USD",
    rating: 4.7,
    reviewCount: 58,
    location: "New York, NY",
    available: true,
    description:
      "A sharp coupe with rear-wheel drive and a turbocharged straight-six. Firm but livable, with a cabin that makes long highway runs easy.",
    highlights: [
      "503 hp twin-turbo straight-six",
      "Adaptive M suspension",
      "Carbon-fibre roof",
      "Heads-up display",
    ],
    pickupNotes:
      "Pickup from a Midtown garage; bring a valid licence and a second photo ID.",
    owner: owner("Noah Bennett", 2022, "Replies within 1 hour", 2),
    terms: terms({
      minAge: 28,
      deposit: 1200,
      mileagePerDay: "150 mi/day included, then $0.60/mi",
    }),
  },
  {
    id: "bmw-430i-gran-coupe-2022",
    name: "BMW 430i Gran Coupé",
    model: "430i Gran Coupé",
    year: 2022,
    category: "sedan",
    imageUrl: unsplashPhoto("photo-1502877338535-766e1452684a"),
    imageAlt: "Blue BMW coupé parked beside a garage",
    galleryImages: [],
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    pricePerDay: 96,
    pricePerWeek: 550,
    pricePerMonth: 1980,
    rentalTypes: ["daily", "weekly", "monthly"],
    currency: "USD",
    rating: 4.6,
    reviewCount: 71,
    location: "Chicago, IL",
    available: true,
    description:
      "A four-door coupé that splits the difference between a sedan and something more interesting. Comfortable, quiet, and easy to park.",
    highlights: [
      "Turbo four-cylinder with 255 hp",
      "Hatchback boot with 45 cu ft of space",
      "Wireless CarPlay",
      "Driver assistance package",
    ],
    pickupNotes:
      "Pickup near the West Loop, with the keys handed over in person.",
    owner: owner("Elena Petrova", 2021, "Replies within 2 hours", 4),
    terms: terms({ deposit: 500 }),
  },
  {
    id: "ford-mustang-gt-2021",
    name: "Ford Mustang GT",
    model: "Mustang GT",
    year: 2021,
    category: "luxury",
    imageUrl: unsplashPhoto("photo-1494976388531-d1058494cdd8"),
    imageAlt: "Grey Ford Mustang GT seen from the front",
    galleryImages: [],
    seats: 4,
    transmission: "manual",
    fuel: "petrol",
    pricePerDay: 112,
    pricePerWeek: 640,
    pricePerMonth: 2300,
    rentalTypes: ["daily", "weekly"],
    currency: "USD",
    rating: 4.8,
    reviewCount: 44,
    location: "San Diego, CA",
    available: false,
    availableFrom: "2026-12-12",
    description:
      "A V8 coupé with a manual gearbox and a straightforward, old-school feel. Loud, comfortable on the highway, and fun on a back road.",
    highlights: [
      "5.0 L V8 with 460 hp",
      "Six-speed manual gearbox",
      "Recaro seats",
      "Track apps and launch control",
    ],
    pickupNotes:
      "Pickup in North Park; a short manual-gearbox briefing is included.",
    owner: owner("Marcus Lee", 2020, "Replies within 3 hours", 2),
    terms: terms({
      deposit: 700,
      mileagePerDay: "150 mi/day included, then $0.45/mi",
    }),
  },
]

/** The six listings shown on the landing page, in the approved order. */
export const featuredVehicles: Vehicle[] = vehicles.slice(0, 6)

export const vehicleLocations: string[] = Array.from(
  new Set(vehicles.map((vehicle) => vehicle.location))
).sort((a, b) => a.localeCompare(b))

export const priceRange = {
  min: Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay)),
  max: Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay)),
}

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === id)
}

export function filterVehicles(
  list: Vehicle[],
  filters: VehicleFilters
): Vehicle[] {
  const query = filters.query?.trim().toLowerCase() ?? ""

  return list.filter((vehicle) => {
    if (
      filters.category &&
      filters.category !== "any" &&
      vehicle.category !== filters.category
    ) {
      return false
    }

    if (
      filters.location &&
      filters.location !== "any" &&
      vehicle.location !== filters.location
    ) {
      return false
    }

    if (
      typeof filters.maxPrice === "number" &&
      vehicle.pricePerDay > filters.maxPrice
    ) {
      return false
    }

    if (filters.availableOnly && !vehicle.available) {
      return false
    }

    if (query) {
      const haystack = [
        vehicle.name,
        vehicle.model,
        vehicle.location,
        categoryLabels[vehicle.category],
      ]
        .join(" ")
        .toLowerCase()

      if (!haystack.includes(query)) {
        return false
      }
    }

    return true
  })
}

/** Same-category listings first, then the rest, for the details page. */
export function getRelatedVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  const sameCategory = vehicles.filter(
    (item) => item.id !== vehicle.id && item.category === vehicle.category
  )
  const others = vehicles.filter(
    (item) => item.id !== vehicle.id && item.category !== vehicle.category
  )

  return [...sameCategory, ...others].slice(0, limit)
}
