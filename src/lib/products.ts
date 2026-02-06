export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  keyBenefits: string[];
  /** Replace with real image paths in /public/images/ */
  imagePlaceholder: string;
  category: "core" | "upgrade" | "hygiene";
  setupSteps: string[];
}

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  productIds: string[];
  discount: number; // percentage off total
  badge?: string;
}

export const products: Product[] = [
  {
    id: "smart-litter-box",
    name: "Smart Cat Litter Box",
    price: 249.99,
    shortDescription:
      "Automatic self-cleaning litter box with advanced odor control and extra-large capacity.",
    keyBenefits: [
      "Fully automatic self-cleaning cycle",
      "Triple-layer odor neutralization",
      "Extra-large space for cats up to 25 lbs",
      "Quiet operation — won't startle your cat",
      "App notifications when waste drawer is full",
    ],
    imagePlaceholder: "/images/smart-litter-box.jpg",
    category: "core",
    setupSteps: [
      "Unbox and place on a flat surface near a power outlet",
      "Fill the drum with your preferred clumping litter",
      "Plug in and press the power button — the unit self-calibrates",
      "Download the SmartPet app and pair via Bluetooth",
      "Set your preferred cleaning schedule in the app",
    ],
  },
  {
    id: "smart-feeder",
    name: "App-Remote Smart Pet Feeder",
    price: 129.99,
    shortDescription:
      "WiFi-connected automatic feeder with app scheduling, portion control, and voice recording.",
    keyBenefits: [
      "Schedule up to 12 meals per day from your phone",
      "Precise portion control from 1/8 to 4 cups",
      "Record a voice message to call your pet at mealtime",
      "Works with WiFi — control from anywhere",
      "BPA-free food-safe hopper holds 6L of dry food",
    ],
    imagePlaceholder: "/images/smart-feeder.jpg",
    category: "upgrade",
    setupSteps: [
      "Assemble the hopper onto the base unit",
      "Fill with dry food and attach the lid",
      "Plug in and connect to your WiFi network via the SmartPet app",
      "Set your pet's meal schedule and portion sizes",
      "Optionally record a voice message for mealtime alerts",
    ],
  },
  {
    id: "steel-feeder-water",
    name: "Stainless Steel Feeder + Water Dispenser",
    price: 59.99,
    shortDescription:
      "Premium stainless steel food bowl paired with a gravity-fed water dispenser — hygienic and durable.",
    keyBenefits: [
      "Medical-grade 304 stainless steel — no bacteria buildup",
      "Gravity-fed water dispenser keeps water fresh all day",
      "Non-slip silicone base protects your floors",
      "Dishwasher-safe for easy cleaning",
      "Sleek design that fits any home décor",
    ],
    imagePlaceholder: "/images/steel-feeder-water.jpg",
    category: "hygiene",
    setupSteps: [
      "Rinse the bowl and dispenser before first use",
      "Place the silicone mat on your preferred feeding spot",
      "Fill the water reservoir and invert onto the base",
      "Add food to the stainless steel bowl",
      "Clean weekly — both pieces are dishwasher safe",
    ],
  },
];

export const bundles: Bundle[] = [
  {
    id: "essential-clean",
    name: "Essential Clean",
    tagline: "Start with the foundation — automatic litter, zero hassle.",
    productIds: ["smart-litter-box"],
    discount: 0,
  },
  {
    id: "smart-routine",
    name: "Smart Routine",
    tagline: "Automate litter + feeding — your pet's daily routine, handled.",
    productIds: ["smart-litter-box", "smart-feeder"],
    discount: 10,
    badge: "Most Popular",
  },
  {
    id: "full-setup",
    name: "Full Smart Pet Setup",
    tagline: "The complete smart care ecosystem — everything your pet needs.",
    productIds: ["smart-litter-box", "smart-feeder", "steel-feeder-water"],
    discount: 15,
    badge: "Best Value",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getBundlePrice(bundle: Bundle): {
  original: number;
  discounted: number;
  savings: number;
} {
  const original = bundle.productIds.reduce((sum, pid) => {
    const product = getProduct(pid);
    return sum + (product?.price ?? 0);
  }, 0);
  const discounted = original * (1 - bundle.discount / 100);
  return {
    original: Math.round(original * 100) / 100,
    discounted: Math.round(discounted * 100) / 100,
    savings: Math.round((original - discounted) * 100) / 100,
  };
}
