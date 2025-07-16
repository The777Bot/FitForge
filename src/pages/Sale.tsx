import Header from "@/components/Header";

const Sale = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center justify-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>Sale</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Don't miss out on our exclusive deals and discounts. Shop the sale now!</p>
        {/* Add sale products or sections here */}
      </main>
    </div>
  );
};

export default Sale;