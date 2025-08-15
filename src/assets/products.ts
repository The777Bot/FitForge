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
    originalPrice: 2399,
    image: beigeboyfront,
    imageBack: beigeboyback,
    category: "Regular Fit",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m4",
    name: "The Blacksmith ",
    price: 1799,
    originalPrice: 2249,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "Regular Fit",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m5",
    name: "Vision Void",
    price: 1899,
    originalPrice: 2399,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "w1",
    name: "Varsity Grace ",
    price: 1999,
    originalPrice: 2499,
    image: unisexgracefront,
    imageBack: unisexgraceback,
    category: "Drop Shoulder",
    isNew: true,
    isSale: false,
    tag: "COMING SOON"
  },
  {
    id: "u2",
    name: "City Eighty ",
    price: 1999,
    originalPrice: 2499,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "COMING SOON"
  },
  {
    id: "w3",
    name: "Afterlight ",
    price: 1799,
    originalPrice: 2249,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "Crop Top",
    isNew: true,
    isSale: false,
    tag: "NEW"
  }
  // Anime Collection (Premium products)
  

];

export const menProducts: Product[] = [
  // Real products first
  
  {
    id: "m4",
    name: "The Blacksmith ",
    price: 1799,
    originalPrice: 2249,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "Regular Fit",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m5",
    name: "Vision Void ",
    price: 1899,
    originalPrice: 2399,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m6",
    name: "Vision Void (White Version)",
    price: 1899,
    originalPrice: 2399,
    image: visionVoidWhiteBack,
    imageBack: visionVoidWhiteFront,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
 
 
  {
    id: "u1",
    name: "Breath of SEA",
    price: 1899,
    originalPrice: 2399,
    image: beigeboyfront,
    imageBack: beigeboyback,
    category: "Regular Fit",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "u2",
    name: "City Eighty",
    price: 1999,
    originalPrice: 2499,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "COMING SOON"
  }
  
];

export const womenProducts: Product[] = [
  // Real products first
  {
    id: "w1", // Varsity Grace is women's only
    name: "Varsity Grace",
    price: 1999,
    originalPrice: 2499,
    image: unisexgracefront,
    imageBack: unisexgraceback,
    category: "Drop Shoulder",
    isNew: true,
    isSale: false,
    tag: "COMING SOON"
  },
  {
    id: "w3",
    name: "Afterlight ",
    price: 1799,
    originalPrice: 2249,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "Crop Top",
    isNew: true,
    isSale: false,
    tag: "NEW"
  },
  
  {
    id: "u2",
    name: "City Eighty",
    price: 1999,
    originalPrice: 2499,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "COMING SOON"
  },
  {
    id: "m5",
    name: "Vision Void ",
    price: 1899,
    originalPrice: 2399,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m6",
    name: "Vision Void (White Version)",
    price: 1899,
    originalPrice: 2399,
    image: visionVoidWhiteBack,
    imageBack: visionVoidWhiteFront,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  }
 
  // Coming soon products last
  
  
];

export const unisexProducts: Product[] = [
  // Real unisex products
  
  {
    id: "u2",
    name: "City Eighty",
    price: 1999,
    originalPrice: 2499,
    image: unisexeightysfront,
    imageBack: unisexeightysback,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "COMING SOON"
  },
  {
    id: "m5",
    name: "Vision Void ",
    price: 1899,
    originalPrice: 2399,
    image: blackwarriorback,
    imageBack: blackwarriorfront,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  },
  {
    id: "m6",
    name: "Vision Void (White Version)",
    price: 1899,  
    originalPrice: 2399,
    image: visionVoidWhiteBack,
    imageBack: visionVoidWhiteFront,
    category: "Oversized Tee",
    isNew: true,
    isSale: false,
    tag: "NEW" 
  }
 
];

export const gamingProducts: Product[] = [
  // All coming soon products (no real products yet)
  
  {
    id: "g2",
    name: "Coming Soon",
    price: 0,
    image: featuredImage,
    category: "Gaming",
    isNew: false,
    isSale: true,
    tag: "COMING SOON"
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