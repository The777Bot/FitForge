import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Anime from "./pages/Anime";
import Gaming from "./pages/Gaming";
import Collection from "./pages/Collection";
import Category from "./pages/Category";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Sale from "./pages/Sale";
import Unisex from "./pages/Unisex";
import Customized from "./pages/Customized";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <CartProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/category" element={<Category />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/unisex" element={<Unisex />} />
            <Route path="/customized" element={<Customized />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </CartProvider>
);

export default App;
