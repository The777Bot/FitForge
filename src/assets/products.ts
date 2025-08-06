import featuredImage from "@/assets/featured-collection.png";
import beigeboyfront from "@/assets/mens-collection-framed/beigeboyfront.png";
import beigeboyback from "@/assets/mens-collection-framed/beigeboyback.png";
import charcoalboyfront from "@/assets/mens-collection-framed/charcoalboyfront.png";
import charcoalboyback from "@/assets/mens-collection-framed/charcoalboyback.png";
import whitegirlfront from "@/assets/womens-collection-framed/whitegirlfront.png";
import whitegirlback from "@/assets/womens-collection-framed/whitegirlback.png";

// New product imports
import blackwarriorfront from "@/assets/mens-collection-framed/black-warrior.png";
import blackwarriorback from "@/assets/mens-collection-framed/black-warrior(back).png";
import gracefront from "@/assets/mens-collection-framed/gracefront.jpg";
import graceback from "@/assets/mens-collection-framed/graceback.jpg";
import eightysfront from "@/assets/mens-collection-framed/eightysfront.jpg";
import eightysback from "@/assets/mens-collection-framed/eightysback.jpg";

// Unisex collection imports
import unisexgracefront from "@/assets/unisex-collection-framed/gracefront.png";
import unisexgraceback from "@/assets/unisex-collection-framed/graceback.png";
import unisexeightysfront from "@/assets/unisex-collection-framed/eightysfront.png";
import unisexeightysback from "@/assets/unisex-collection-framed/eightysback.png";

// Add a type for products that includes optional imageBack
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageBack?: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

export const featuredProducts: Product[] = [
  // Real products first (with actual images)
  {
    id: "m3",
    name: "Visionary + Beige Boy T-shirt",
    price: 1899,
    image: beigeboyfront,
    imageBack: beigeboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "m4",
    name: "The Blacksmith T-shirt",
    price: 1799,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "m5",
    name: "Black Warrior T-shirt",
    price: 1899,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "u1",
    name: "Grace Unisex T-shirt",
    price: 1799,
    image: unisexgracefront,
    imageBack: unisexgraceback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "u2",
    name: "Eightys Unisex T-shirt",
    price: 1799,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "w3",
    name: "Afterlight T-shirt",
    price: 1799,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  // Coming soon products last (with placeholder images)
  {
    id: "1",
    name: "Urban Bomber Jacket",
    price: 89,
    originalPrice: 120,
    image: featuredImage,
    category: "Outerwear",
    isNew: true,
    isSale: true
  },
  {
    id: "2",
    name: "Classic Hoodie",
    price: 65,
    image: featuredImage,
    category: "Hoodies",
    isNew: false,
    isSale: false
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    price: 78,
    image: featuredImage,
    category: "Denim",
    isNew: true,
    isSale: false
  },
  {
    id: "4",
    name: "Streetwear Tee",
    price: 35,
    originalPrice: 45,
    image: featuredImage,
    category: "Tees",
    isNew: false,
    isSale: true
  }
];

export const menProducts: Product[] = [
  // Real products first
  {
    id: "m3",
    name: "Visionary + Beige Boy T-shirt",
    price: 1899,
    image: beigeboyfront,
    imageBack: beigeboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "m4",
    name: "The Blacksmith T-shirt",
    price: 1799,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "m5",
    name: "Black Warrior T-shirt",
    price: 1899,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "m6",
    name: "Grace T-shirt",
    price: 1799,
    image: gracefront,
    imageBack: graceback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "m7",
    name: "Eightys T-shirt",
    price: 1799,
    image: eightysfront,
    imageBack: eightysback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  // Coming soon products last
  {
    id: "m1",
    name: "Men's Urban Jacket",
    price: 99,
    originalPrice: 130,
    image: featuredImage,
    category: "Outerwear",
    isNew: true,
    isSale: false
  },
  {
    id: "m2",
    name: "Classic Men's Hoodie",
    price: 75,
    image: featuredImage,
    category: "Hoodies",
    isNew: false,
    isSale: true
  }
];

export const womenProducts: Product[] = [
  // Real products first
  {
    id: "w3",
    name: "Afterlight T-shirt",
    price: 1799,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  // Coming soon products last
  {
    id: "w1",
    name: "Women's Urban Jacket",
    price: 105,
    originalPrice: 140,
    image: featuredImage,
    category: "Outerwear",
    isNew: true,
    isSale: false
  },
  {
    id: "w2",
    name: "Classic Women's Hoodie",
    price: 85,
    image: featuredImage,
    category: "Hoodies",
    isNew: false,
    isSale: true
  }
];

export const unisexProducts: Product[] = [
  // Real unisex products
  {
    id: "u1",
    name: "Grace Unisex T-shirt",
    price: 1799,
    image: unisexgracefront,
    imageBack: unisexgraceback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "u2",
    name: "Eightys Unisex T-shirt",
    price: 1799,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  }
];

export const gamingProducts: Product[] = [
  // All coming soon products (no real products yet)
  {
    id: "g1",
    name: "Retro Console Tee",
    price: 60,
    originalPrice: 75,
    image: featuredImage,
    category: "Gaming",
    isNew: true,
    isSale: false
  },
  {
    id: "g2",
    name: "Pixel Art Hoodie",
    price: 70,
    image: featuredImage,
    category: "Gaming",
    isNew: false,
    isSale: true
  }
];

// Combine all products for easy lookup
export const allProducts: Product[] = [
  ...featuredProducts,
  ...menProducts,
  ...womenProducts,
  ...unisexProducts,
  ...gamingProducts
];