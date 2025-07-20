import featuredImage from "@/assets/featured-collection.jpg";

export const featuredProducts = [
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

export const menProducts = [
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

export const womenProducts = [
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

export const gamingProducts = [
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
export const allProducts = [
  ...featuredProducts,
  ...menProducts,
  ...womenProducts,
  ...gamingProducts
]; 