import React from "react";
import { Link } from "react-router-dom";
import FeaturedSection from "@/components/FeaturedSection";

const Customized = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-8 text-center" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>
          Customized Clothing
        </h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Explore our exclusive collection of Anime and Gaming inspired customized clothes. Unique designs, premium quality, and made for fans!
        </p>
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Anime Customized</h2>
          <FeaturedSection /* You can filter or pass anime products here if needed */ />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Gaming Customized</h2>
          <FeaturedSection /* You can filter or pass gaming products here if needed */ />
        </div>
      </div>
    </div>
  );
};

export default Customized;
