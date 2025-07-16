import Header from "@/components/Header";

const Women = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center justify-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">Women's Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Elegance meets street style. Discover the latest in women's fashion.</p>
        {/* Add women's products or sections here */}
      </main>
    </div>
  );
};

export default Women;