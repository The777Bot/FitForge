import React from "react";

const Weeb: React.FC = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-neutral-900 text-white py-16 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-ethnocentric font-bold mb-6 tracking-tight drop-shadow-lg luxury-gradient-text">
          Weeb Collection
        </h1>
        <p className="text-lg md:text-xl mb-8 text-neutral-200">
          Dive into our exclusive Weeb Collection, where anime-inspired fashion meets luxury streetwear. Express your fandom with premium designs, bold graphics, and unique fits crafted for true enthusiasts.
        </p>
        <div className="flex flex-col items-center gap-4">
          <span className="inline-block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
            Coming Soon
          </span>
        </div>
      </div>
    </section>
  );
};

export default Weeb;
