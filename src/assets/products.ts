import featuredImage from "@/assets/featured-collection.png";
import beigeboyfront from "@/assets/mens-collection-framed/beigeboyfront.png";
import beigeboyback from "@/assets/mens-collection-framed/beigeboyback.png";
import charcoalboyfront from "@/assets/mens-collection-framed/charcoalboyfront.png";
import charcoalboyback from "@/assets/mens-collection-framed/charcoalboyback.png";
import whitegirlfront from "@/assets/womens-collection-framed/whitegirlfront.png";
import whitegirlback from "@/assets/womens-collection-framed/whitegirlback.png";

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
  },
  // Add the three new t-shirts to featured
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
    name: "Charcoal Boy T-shirt",
    price: 1799,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  },
  {
    id: "w3",
    name: "White girl T-shirt",
    price: 1799,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  }
];

export const menProducts: Product[] = [
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
  },
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
    name: "Charcoal Boy T-shirt",
    price: 1799,
    image: charcoalboyfront,
    imageBack: charcoalboyback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  }
];

export const womenProducts: Product[] = [
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
  },
  {
    id: "w3",
    name: "White girl T-shirt",
    price: 1799,
    image: whitegirlfront,
    imageBack: whitegirlback,
    category: "T-shirts",
    isNew: true,
    isSale: false
  }
];

export const gamingProducts: Product[] = [
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
  ...gamingProducts
]; 