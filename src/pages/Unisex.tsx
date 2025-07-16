import Header from "@/components/Header";

const Unisex = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      <main className="flex flex-col items-center justify-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-hero bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>
          Unisex Collection
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">
          Explore our versatile unisex styles designed for everyone. Fashion
          without boundaries, comfort without compromise.
        </p>
        {/* Add unisex products or sections here */}
      </main>
    </div>
  );
};

export default Unisex;