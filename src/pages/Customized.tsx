import React, { useState, useRef } from "react";
import { useLoader } from "@/components/LoaderContext";
import FeaturedSection from "@/components/FeaturedSection";

const premadeDesigns = [
  { id: 1, name: "Dragon Emblem", img: "/placeholder.svg" },
  { id: 2, name: "Pixel Hero", img: "/placeholder.svg" },
  { id: 3, name: "Sakura Wave", img: "/placeholder.svg" },
  { id: 4, name: "Retro Console", img: "/placeholder.svg" },
];

const colorOptions = ["Black", "White", "Beige", "Pink", "Blue"];
const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const Customized: React.FC = () => {
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [selectedPremade, setSelectedPremade] = useState<number | null>(null);
  const [color, setColor] = useState(colorOptions[0]);
  const [size, setSize] = useState(sizeOptions[0]);
  const { setLoading } = useLoader();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedDesign(ev.target?.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setLoading(false);
    }
  };

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload({ target: { files: e.dataTransfer.files } } as any);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const resetAll = () => {
    setUploadedDesign(null);
    setSelectedPremade(null);
    setColor(colorOptions[0]);
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
                  <div className="flex gap-2">
                    {colorOptions.map(opt => (
                      <button
                        key={opt}
                        className={`w-8 h-8 rounded-full border-2 ${color === opt ? 'border-black ring-2 ring-black' : 'border-[#b6a98c]'} flex items-center justify-center`}
                        style={{ background: opt === 'Beige' ? '#e7dbc7' : opt.toLowerCase() }}
                        onClick={() => setColor(opt)}
                        title={opt}
                      >
                        {color === opt && <span className="w-3 h-3 bg-black rounded-full"></span>}
                      </button>
                    ))}
                  </div>
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
