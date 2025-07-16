import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Anime = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center justify-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">Anime Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Explore our exclusive Anime-inspired streetwear and accessories. Stay tuned for the latest drops and collaborations!</p>
        {/* Add more anime-themed content here */}
      </main>
      <Footer />
    </div>
  );
};

export default Anime; 