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
import visionVoidWhiteBack from "@/assets/mens-collection-framed/Vision Void (White Version).png";
import visionVoidWhiteFront from "@/assets/mens-collection-framed/Vision Void (White Version)f.png";

// Unisex collection imports
import unisexgracefront from "@/assets/unisex-collection-framed/gracefront.png";
import unisexgraceback from "@/assets/unisex-collection-framed/graceback.png";
import unisexeightysfront from "@/assets/unisex-collection-framed/eightysfront.png";
import unisexeightysback from "@/assets/unisex-collection-framed/eightysback.png";

// Anime collection imports
import soloLevelingFront from "@/assets/Anime/Solo-Leveling_front.png";
import soloLevelingBack from "@/assets/Anime/Solo-Leveling_back.png";
import zoroStyleFront from "@/assets/Anime/Zoro-Style_front.png";
import zoroStyleBack from "@/assets/Anime/Zoro-Style_back.png";
import zenitsuFront from "@/assets/Anime/Zenitsu_front.png";
import zenitsuBack from "@/assets/Anime/Zenitsu_back.png";

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
  tag?: string; // Add tag property
}

export const featuredProducts: Product[] = [
  // Real T-shirt products (with actual images)
  {
    id: "u1",
    name: "Breath of SEA ",
    price: 1899,
    image: beigeboyfront,
    imageBack: beigeboyback,
    category: "Unisex T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m4",
    name: "The Blacksmith ",
    price: 1799,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "MensT-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m5",
    name: "Vision Void",
    price: 1899,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "MensT-shirts",
    isNew: true,
    isSale: false,
    tag: "Premium" 
  },
  {
    id: "w1",
    name: "Varsity Grace ",
    price: 1999,
    image: unisexgracefront,
    imageBack: unisexgraceback,
    category: "Womens T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW"
  },
  {
    id: "u2",
    name: "City Eighty ",
    price: 1999,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "Unisex T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW"
  },
  {
    id: "w3",
    name: "Afterlight ",
    price: 1799,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "Womens T-shirts",
    isNew: true,
    isSale: false
  },
  // Anime Collection (Premium products)
  {
    id: "a1",
    name: "Solo Leveling T-shirt",
    price: 2499,
    image: soloLevelingFront,
    imageBack: soloLevelingBack,
    category: "Anime",
    isNew: true,
    isSale: false
  },
  {
    id: "a2",
    name: "Zoro Style T-shirt",
    price: 2499,
    image: zoroStyleFront,
    imageBack: zoroStyleBack,
    category: "Anime",
    isNew: true,
    isSale: false
  },
  {
    id: "a3",
    name: "Zenitsu T-shirt",
    price: 2499,
    image: zenitsuFront,
    imageBack: zenitsuBack,
    category: "Anime",
    isNew: true,
    isSale: false
  },
  // Coming soon products (with placeholder images)
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
    id: "m4",
    name: "The Blacksmith ",
    price: 1799,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m5",
    name: "Vision Void ",
    price: 1899,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "Premium" 
  },
  {
    id: "m6",
    name: "Vision Void (White Version)",
    price: 1899,
    image: visionVoidWhiteBack,
    imageBack: visionVoidWhiteFront,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "Premium" 
  },
 
 
  {
    id: "u1",
    name: "Breath of SEA",
    price: 1899,
    image: beigeboyfront,
    imageBack: beigeboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "Premium" 
  },
  {
    id: "u2",
    name: "City Eighty",
    price: 1999,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW"
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
    id: "w1", // Varsity Grace is women's only
    name: "Varsity Grace",
    price: 1999,
    image: unisexgracefront,
    imageBack: unisexgraceback,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW"
  },
  {
    id: "w3",
    name: "Afterlight ",
    price: 1799,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW"
  },
  
  {
    id: "u2",
    name: "City Eighty",
    price: 1999,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW"
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
    id: "u2",
    name: "City Eighty",
    price: 1999,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "NEW"
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

export const animeProducts: Product[] = [
  // Real anime products
  {
    id: "a1",
    name: "Solo Leveling T-shirt",
    price: 2499,
    image: soloLevelingFront,
    imageBack: soloLevelingBack,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "COMING SOON" 
  },
  {
    id: "a2",
    name: "Zoro Style T-shirt",
    price: 2499,
    image: zoroStyleFront,
    imageBack: zoroStyleBack,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "COMING SOON" 
  },
  {
    id: "a3",
    name: "Zenitsu T-shirt",
    price: 2499,
    image: zenitsuFront,
    imageBack: zenitsuBack,
    category: "T-shirts",
    isNew: true,
    isSale: false,
    tag: "COMING SOON" 
  }
];

// Combine all products for easy lookup
export const allProducts: Product[] = [
  ...featuredProducts,
  ...menProducts,
  ...womenProducts,
  ...unisexProducts,
  ...gamingProducts,
  ...animeProducts
];