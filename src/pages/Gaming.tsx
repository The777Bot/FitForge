import Header from "@/components/Header";

const Gaming = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center justify-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">Gaming Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Level up your style with our Gaming-inspired apparel and gear. New arrivals and exclusive releases coming soon!</p>
        {/* Add more gaming-themed content here */}
      </main>
    </div>
  );
};

export default Gaming;