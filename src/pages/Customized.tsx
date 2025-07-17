import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeaturedSection from "@/components/FeaturedSection";

const premadeDesigns = [
  { id: 1, name: "Dragon Emblem", img: "/placeholder.svg" },
  { id: 2, name: "Pixel Hero", img: "/placeholder.svg" },
  { id: 3, name: "Sakura Wave", img: "/placeholder.svg" },
  { id: 4, name: "Retro Console", img: "/placeholder.svg" },
];

const colorOptions = ["Black", "White", "Beige", "Pink", "Blue"];
const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const Customized = () => {
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [selectedPremade, setSelectedPremade] = useState<number | null>(null);
  const [color, setColor] = useState(colorOptions[0]);
  const [size, setSize] = useState(sizeOptions[0]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedDesign(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-8 text-center" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>
          Customized Clothing
        </h1>
        <p className="text-xl text-muted-foreground mb-8 text-center">
          Design your own clothing or choose from our exclusive collection of Anime and Gaming inspired designs!
        </p>
        {/* Customization Options */}
        <div className="bg-card rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground text-center">Create Your Custom Design</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Upload Design */}
            <div className="flex flex-col items-center">
              <label className="mb-2 font-semibold">Upload Your Design</label>
              <input type="file" accept="image/*" onChange={handleUpload} className="mb-2" />
              {uploadedDesign && (
                <img src={uploadedDesign} alt="Uploaded Design" className="w-24 h-24 object-contain rounded border" />
              )}
            </div>
            {/* Premade Designs */}
            <div className="flex flex-col items-center">
              <label className="mb-2 font-semibold">Or Choose a Design</label>
              <div className="grid grid-cols-2 gap-3">
                {premadeDesigns.map((design) => (
                  <button
                    key={design.id}
                    className={`border rounded p-2 flex flex-col items-center transition-all ${selectedPremade === design.id ? 'border-primary ring-2 ring-primary' : 'border-muted'}`}
                    onClick={() => setSelectedPremade(design.id)}
                  >
                    <img src={design.img} alt={design.name} className="w-16 h-16 object-contain mb-1" />
                    <span className="text-xs text-foreground">{design.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Other Options */}
            <div className="flex flex-col items-center gap-2">
              <label className="font-semibold">Color</label>
              <select value={color} onChange={e => setColor(e.target.value)} className="border rounded px-2 py-1">
                {colorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <label className="font-semibold mt-4">Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} className="border rounded px-2 py-1">
                {sizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>
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
