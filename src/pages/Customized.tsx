import React, { useState, useRef } from "react";
import { useLoader } from "@/components/LoaderContext";
import FeaturedSection from "@/components/FeaturedSection";

const premadeDesigns = [
  { id: 1, name: "Dragon Emblem", img: "/placeholder.svg" },
  { id: 2, name: "Pixel Hero", img: "/placeholder.svg" },
  { id: 3, name: "Sakura Wave", img: "/placeholder.svg" },
  { id: 4, name: "Retro Console", img: "/placeholder.svg" },
];

// Modern, full color palette
const colorOptions = [
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF", border: true },
  { name: "Beige", code: "#e7dbc7" },
  { name: "Cream", code: "#f8f6f1" },
  { name: "Brown", code: "#8d6748" },
  { name: "Red", code: "#ef4444" },
  { name: "Orange", code: "#fb923c" },
  { name: "Yellow", code: "#fde047" },
  { name: "Green", code: "#22c55e" },
  { name: "Teal", code: "#14b8a6" },
  { name: "Blue", code: "#3b82f6" },
  { name: "Indigo", code: "#6366f1" },
  { name: "Purple", code: "#a21caf" },
  { name: "Pink", code: "#ec4899" },
  { name: "Gray", code: "#6b7280" }
];
const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const Customized: React.FC = () => {
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [selectedPremade, setSelectedPremade] = useState<number | null>(null);
  const [color, setColor] = useState(colorOptions[0].name);
  const [size, setSize] = useState(sizeOptions[0]);
  const { setLoading } = useLoader();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (input: React.ChangeEvent<HTMLInputElement> | FileList) => {
    setLoading(true);
    let files: FileList | null = null;
    if (input instanceof FileList) {
      files = input;
    } else if (input.target.files) {
      files = input.target.files;
    }
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedDesign(ev.target?.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setLoading(false);
    }
  };

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const resetAll = () => {
    setUploadedDesign(null);
    setSelectedPremade(null);
    setColor(colorOptions[0].name);
    setSize(sizeOptions[0]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const showLoader = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
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
        <div className="bg-card rounded-2xl shadow-2xl p-8 mb-12 border border-[#e7dbc7]">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            {/* Stepper */}
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black text-[#e7dbc7] flex items-center justify-center font-bold">1</span>
                <span className="font-semibold text-lg">Upload Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black text-[#e7dbc7] flex items-center justify-center font-bold">2</span>
                <span className="font-semibold text-lg">Choose Premade</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black text-[#e7dbc7] flex items-center justify-center font-bold">3</span>
                <span className="font-semibold text-lg">Options</span>
              </div>
              <button onClick={resetAll} className="mt-6 bg-[#e7dbc7] text-black px-4 py-2 rounded-lg font-semibold shadow hover:bg-[#b6a98c] transition-colors">Reset</button>
            </div>
            {/* Main Customization UI */}
            <div className="flex-1 flex flex-col gap-8">
              {/* Upload/Dropzone */}
              <div
                className="border-2 border-dashed border-[#b6a98c] rounded-xl p-6 flex flex-col items-center justify-center bg-[#f8f6f1] hover:bg-[#f3ede2] transition-colors cursor-pointer min-h-[120px]"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                title="Click or drag an image here"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
                <span className="text-black font-medium mb-2">Click or drag an image here to upload your design</span>
                {uploadedDesign && (
                  <img src={uploadedDesign} alt="Uploaded Design" className="w-24 h-24 object-contain rounded border mt-2" />
                )}
              </div>
              {/* Premade Designs */}
              <div className="flex flex-col items-center">
                <label className="mb-2 font-semibold text-black">Or Choose a Premade Design</label>
                <div className="grid grid-cols-2 gap-3">
                  {premadeDesigns.map((design) => (
                    <button
                      key={design.id}
                      className={`border-2 rounded-xl p-2 flex flex-col items-center transition-all bg-white hover:bg-[#e7dbc7] ${selectedPremade === design.id ? 'border-black ring-2 ring-black' : 'border-[#b6a98c]'}`}
                      onClick={() => setSelectedPremade(design.id)}
                    >
                      <img src={design.img} alt={design.name} className="w-16 h-16 object-contain mb-1" />
                      <span className="text-xs text-black font-semibold">{design.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Options */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4 items-center">
                  <label className="font-semibold text-black">Color:</label>
                  <div className="flex flex-wrap gap-2 max-w-[320px]">
                    {colorOptions.map(opt => (
                      <button
                        key={opt.name}
                        className={`w-9 h-9 rounded-full border-2 shadow transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black relative
                          ${color === opt.name ? 'ring-2 ring-black border-black scale-110' : (opt.border ? 'border-gray-300' : 'border-[#b6a98c]')} 
                          hover:scale-105 active:scale-95
                        `}
                        style={{ background: opt.code }}
                        onClick={() => setColor(opt.name)}
                        title={opt.name}
                        aria-label={opt.name}
                        type="button"
                        tabIndex={0}
                      >
                        {/* Checkmark for selected color */}
                        {color === opt.name && (
                          <span className="absolute text-white text-lg pointer-events-none select-none">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        )}
                        {/* White/cream swatch border for visibility */}
                        {(opt.name === 'White' || opt.name === 'Cream') && (
                          <span className="absolute w-8 h-8 rounded-full border border-gray-300 pointer-events-none"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Show selected color name below swatches */}
                <div className="mt-2 text-sm text-black font-medium text-center w-full">
                  Selected: <span className="font-bold">{color}</span>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="font-semibold text-black">Size:</label>
                  <div className="flex gap-2">
                    {sizeOptions.map(opt => (
                      <button
                        key={opt}
                        className={`px-3 py-1 rounded-lg border-2 font-semibold ${size === opt ? 'bg-black text-[#e7dbc7] border-black' : 'bg-white text-black border-[#b6a98c]'} transition-colors`}
                        onClick={() => setSize(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Preview Section */}
              <div className="flex flex-col items-center mt-4">
                <span className="font-semibold text-black mb-2">Preview</span>
                <div className="w-32 h-40 bg-[#e7dbc7] rounded-xl flex items-center justify-center border-2 border-[#b6a98c] relative">
                  {(uploadedDesign || selectedPremade) ? (
                    <img
                      src={uploadedDesign || (selectedPremade ? premadeDesigns.find(d => d.id === selectedPremade)?.img : undefined)}
                      alt="Preview"
                      className="w-24 h-24 object-contain"
                    />
                  ) : (
                    <span className="text-[#b6a98c]">Your design will appear here</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Weeb Collection Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Weeb Collection</h2>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground text-center">
            Dive into our exclusive Weeb Collection, where anime-inspired fashion meets luxury streetwear. Express your fandom with premium designs, bold graphics, and unique fits crafted for true enthusiasts.
          </p>
          <span className="inline-block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg mb-8">
            Coming Soon
          </span>
        </div>
        {/* Anime & Gaming Customized Sections */}
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
