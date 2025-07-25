import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import { useLoader } from "@/components/LoaderContext";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import blackShirt from "@/assets/blackshirts1.png";
import whiteShirt from "@/assets/whiteshirts1.png";
import { featuredProducts } from "@/assets/products";
import ProductCard from "@/components/ProductCard";
import { CartContext } from "@/components/CartContext";
import { CartUIContext } from "@/components/CartContext";

// Only black and white color options
const colorOptions = [
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF", border: true },
];

const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const SHIRT_WIDTH = 520;
const SHIRT_HEIGHT = 650;

const Customized: React.FC = () => {
  const { addToCart } = useContext(CartContext);
  const { setCartOpen } = useContext(CartUIContext);
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [color, setColor] = useState("Black"); // Default to black shirt
  const [size, setSize] = useState(sizeOptions[0]);
  const { setLoading } = useLoader();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDesignSaved, setIsDesignSaved] = useState(false);

  // Draggable/resizable/rotatable state
  const [designPos, setDesignPos] = useState({ x: SHIRT_WIDTH / 2 - 80, y: SHIRT_HEIGHT / 2 - 80 });
  const [designSize, setDesignSize] = useState({ w: 160, h: 160 });
  const [rotation, setRotation] = useState(0); // degrees
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [rotating, setRotating] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ w: 160, h: 160, x: 0, y: 0 });
  const rotateStart = useRef({ angle: 0, x: 0, y: 0, center: { x: 0, y: 0 } });

  // Prevent text/image selection during drag/resize/rotate
  useEffect(() => {
    if (dragging || resizing || rotating) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.userSelect = "";
    };
  }, [dragging, resizing, rotating]);

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
        setDesignPos({ x: SHIRT_WIDTH / 2 - 80, y: SHIRT_HEIGHT / 2 - 80 });
        setDesignSize({ w: 160, h: 160 });
        setRotation(0);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Drag logic
  const onMouseDown = (e: React.MouseEvent) => {
    if (!uploadedDesign || resizing || rotating) return;
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - designPos.x,
      y: e.clientY - designPos.y,
    };
  };
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    let newX = e.clientX - dragOffset.current.x;
    let newY = e.clientY - dragOffset.current.y;
    // Boundaries
    newX = Math.max(0, Math.min(SHIRT_WIDTH - designSize.w, newX));
    newY = Math.max(0, Math.min(SHIRT_HEIGHT - designSize.h, newY));
    setDesignPos({ x: newX, y: newY });
  }, [dragging, designSize.w, designSize.h]);
  const onMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Resize logic
  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragging || rotating) return;
    setResizing(true);
    resizeStart.current = {
      w: designSize.w,
      h: designSize.h,
      x: e.clientX,
      y: e.clientY,
    };
  };
  const onResizeMouseMove = useCallback((e: MouseEvent) => {
    if (!resizing) return;
    let delta = Math.max(e.clientX - resizeStart.current.x, e.clientY - resizeStart.current.y);
    let newW = Math.max(40, Math.min(SHIRT_WIDTH, resizeStart.current.w + delta));
    let newH = Math.max(40, Math.min(SHIRT_HEIGHT, resizeStart.current.h + delta));
    // Boundaries for position
    let newX = Math.min(designPos.x, SHIRT_WIDTH - newW);
    let newY = Math.min(designPos.y, SHIRT_HEIGHT - newH);
    setDesignSize({ w: newW, h: newH });
    setDesignPos({ x: newX, y: newY });
  }, [resizing, designPos.x, designPos.y]);
  const onResizeMouseUp = useCallback(() => {
    setResizing(false);
  }, []);

  // Rotation logic
  const onRotateMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragging || resizing) return;
    setRotating(true);
    const rect = (e.target as HTMLElement).closest('.design-draggable')?.getBoundingClientRect();
    if (!rect) return;
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    rotateStart.current = { angle: rotation, x: e.clientX, y: e.clientY, center };
  };
  const onRotateMouseMove = useCallback((e: MouseEvent) => {
    if (!rotating) return;
    const { center } = rotateStart.current;
    const angle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * 180 / Math.PI;
    setRotation(angle);
  }, [rotating]);
  const onRotateMouseUp = useCallback(() => {
    setRotating(false);
  }, []);

  // Attach/detach event listeners for drag/resize/rotate
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, onMouseMove, onMouseUp]);
  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", onResizeMouseMove);
      window.addEventListener("mouseup", onResizeMouseUp);
    } else {
      window.removeEventListener("mousemove", onResizeMouseMove);
      window.removeEventListener("mouseup", onResizeMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onResizeMouseMove);
      window.removeEventListener("mouseup", onResizeMouseUp);
    };
  }, [resizing, onResizeMouseMove, onResizeMouseUp]);
  useEffect(() => {
    if (rotating) {
      window.addEventListener("mousemove", onRotateMouseMove);
      window.addEventListener("mouseup", onRotateMouseUp);
    } else {
      window.removeEventListener("mousemove", onRotateMouseMove);
      window.removeEventListener("mouseup", onRotateMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onRotateMouseMove);
      window.removeEventListener("mouseup", onRotateMouseUp);
    };
  }, [rotating, onRotateMouseMove, onRotateMouseUp]);

  // Deletion
  const handleDelete = () => {
    setUploadedDesign(null);
    setIsDesignSaved(false);
  };
  const handleSaveDesign = () => {
    setIsDesignSaved(true);
  };

  // Determine board and shirt colors based on selection
  const isBoardWhite = color === "Black";
  const boardStyle = isBoardWhite ? "bg-white" : "bg-black";
  const shirtImg = isBoardWhite ? blackShirt : whiteShirt;
  const textStyle = isBoardWhite ? "text-black" : "text-white";

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-8 px-4">
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-8 text-center relative z-20" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>
          Design Your Style
        </h1>
        {/* Main Design Board */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1200px] mx-auto">
          {/* Left Toolbar */}
          <div className="lg:w-16 flex flex-col gap-4 justify-center items-center mb-4 lg:mb-0">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12"
                onClick={() => fileInputRef.current?.click()}
              >
              <Upload className="h-6 w-6" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
            </Button>
            {/* Upload instructions below the button */}
            {!uploadedDesign && (
              <div className="text-xs text-muted-foreground text-center max-w-[90px] mt-2">
                drop your design or use the upload button
              </div>
            )}
          </div>
          {/* Center Canvas */}
          <div 
            className="flex-1 aspect-[4/3] rounded-lg overflow-hidden shadow-xl border flex items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className={`w-full h-full flex items-center justify-center relative ${boardStyle} transition-colors duration-300`}>
              {/* Shirt Image */}
              <div className="relative w-[520px] h-[650px] flex items-center justify-center select-none">
                <img
                  src={shirtImg}
                  alt="Shirt"
                  className="w-full h-full object-contain drop-shadow-lg select-none pointer-events-none"
                  draggable={false}
                />
                {/* Uploaded Design Overlay - Draggable/Resizable/Rotatable/Deletable */}
                {uploadedDesign ? (
                  <div
                    className="absolute z-10 group design-draggable"
                    style={{
                      left: designPos.x,
                      top: designPos.y,
                      width: designSize.w,
                      height: designSize.h,
                      cursor: isDesignSaved ? 'default' : (dragging ? 'grabbing' : 'grab'),
                      transform: `rotate(${rotation}deg)`
                    }}
                    onMouseDown={isDesignSaved ? undefined : onMouseDown}
                  >
                    {/* Rotation handle */}
                    {!isDesignSaved && (
                      <div
                        className="absolute left-1/2 -top-8 w-6 h-6 bg-primary rounded-full border-2 border-white cursor-alias flex items-center justify-center z-20 group-hover:opacity-100 opacity-80"
                        style={{ transform: 'translate(-50%, 0)' }}
                        onMouseDown={onRotateMouseDown}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20"><path d="M10 3V7M10 3L7 6M10 3l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="10" cy="12" r="5" stroke="#fff" strokeWidth="2" fill="none"/></svg>
                      </div>
                    )}
                    {/* Delete button */}
                    {!isDesignSaved && (
                      <button
                        className="absolute -right-7 -top-7 w-7 h-7 bg-red-600 rounded-full border-2 border-white flex items-center justify-center z-20 shadow hover:bg-red-700 transition"
                        style={{ transform: 'translate(50%, -50%)' }}
                        onClick={e => { e.stopPropagation(); handleDelete(); }}
                        tabIndex={-1}
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    )}
                    <img
                      src={uploadedDesign}
                      alt="Design"
                      className="w-full h-full object-contain pointer-events-none select-none"
                      draggable={false}
                      style={{ userSelect: 'none' }}
                    />
                    {/* Resize handle */}
                    {!isDesignSaved && (
                      <div
                        className="absolute right-0 bottom-0 w-5 h-5 bg-primary rounded-full border-2 border-white cursor-nwse-resize flex items-center justify-center z-20 group-hover:opacity-100 opacity-80"
                        style={{ transform: 'translate(50%, 50%)' }}
                        onMouseDown={onResizeMouseDown}
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20"><path d="M3 17L17 3M17 17V3H3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* Right Properties Panel */}
          <div className="lg:w-64 space-y-6 p-4 bg-card rounded-lg border">
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-2">
                    {colorOptions.map(opt => (
                      <button
                        key={opt.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all
                      ${color === opt.name ? 'ring-2 ring-primary border-primary scale-110' : 'border-muted'}
                      hover:scale-105`}
                        style={{ background: opt.code }}
                        onClick={() => setColor(opt.name)}
                        title={opt.name}
                  />
                    ))}
                  </div>
                </div>
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                    {sizeOptions.map(opt => (
                      <button
                        key={opt}
                    className={`px-3 py-1 rounded-lg border-2 font-semibold 
                      ${size === opt ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-muted'}
                      transition-colors`}
                        onClick={() => setSize(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
            <Button
              className="w-full"
              variant="default"
              disabled={!isDesignSaved}
              onClick={() => {
                if (!isDesignSaved || !uploadedDesign) return;
                addToCart({
                  id: `custom-${color}-${size}-${Date.now()}`,
                  name: `Customized Shirt (${color}, ${size})`,
                  price: 2499,
                  image: uploadedDesign
                });
                setCartOpen(true);
              }}
            >
              Add to Cart
            </Button>
          </div>
          {/* Save button below the shirt design area */}
          {uploadedDesign && !isDesignSaved && (
            <div className="flex justify-center mt-4">
              <Button className="px-8 py-2 text-lg font-bold" variant="brand" onClick={handleSaveDesign}>
                Save Design
              </Button>
            </div>
          )}
        </div>
        {/* Customized Product Cards */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-foreground">Popular Customized Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
      {/* Anime & Gaming Explore Section */}
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">Explore More Collections</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <a href="/anime" className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-900 via-fuchsia-700 to-pink-600 text-white font-extrabold text-lg shadow-2xl hover:scale-105 transition-transform text-center border-2 border-fuchsia-400 animate-pulse">Anime Collection</a>
          <a href="/gaming" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-900 via-cyan-500 to-green-400 text-white font-extrabold text-lg shadow-2xl hover:scale-105 transition-transform text-center border-2 border-cyan-400 animate-pulse">Gaming Collection</a>
        </div>
      </div>
    </div>
  );
};

export default Customized;
