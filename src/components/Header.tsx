import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { CartContext, CartUIContext } from "@/components/CartContext";
import { useHeroBg } from "@/components/HeroBgContext";
import FFlogo from "@/assets/FFlogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { cartCount, cartItems, removeFromCart } = useContext(CartContext);
  const { heroBg, toggleHeroBg } = useHeroBg();
  const { cartOpen, setCartOpen } = useContext(CartUIContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-[rgba(30,30,36,0.85)] shadow-xl border-b-0 before:content-[''] before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-gradient-to-r before:from-brand-purple before:via-[#e7dbc7] before:to-brand-purple before:rounded-b-xl before:blur-[2px] ${
      isScrolled 
        ? 'bg-[linear-gradient(135deg,_hsl(0,0%,15%),_hsl(45,33%,30%))]/90 shadow-elegant border-b border-[hsl(45,33%,30%)]' 
        : 'bg-gradient-hero/80'
    }`} style={{boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)'}}>
      {/* Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <input
            autoFocus
            type="text"
            placeholder="Search products..."
            className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
          />
          <div className="mt-4 text-muted-foreground text-sm">(Instant results and suggestions would appear here.)</div>
        </DialogContent>
      </Dialog>
      {/* User Modal */}
      <Dialog open={userOpen} onOpenChange={setUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In / Register</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
            <Button type="submit" className="w-full" variant="hero">Sign In</Button>
            <div className="text-center text-sm text-muted-foreground">or</div>
            <Button type="button" className="w-full" variant="modern">Register</Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Cart Drawer */}
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerContent className="max-w-md ml-auto">
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-muted-foreground">Your cart is empty.</div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-2 relative">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-muted" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">${item.price} x {item.quantity}</div>
                    </div>
                    <div className="font-bold text-brand-purple">${item.price * item.quantity}</div>
                    <button
                      className="absolute top-1 right-0 p-1 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button
              className="w-full mt-4"
              variant="hero"
              disabled={cartItems.length === 0}
              onClick={() => {
                setCartOpen(false);
                window.location.href = '/checkout';
              }}
            >
              Checkout
            </Button>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" className="absolute top-4 right-4">Close</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-14' : 'h-20'
        }`}>
          {/* Logo */}
          <a href="/" className="logo flex items-center gap-2 group relative">
            <span className="relative">
              {/* Beige inner ring behind logo */}
              <span className="absolute inset-0 rounded-full bg-[#e7dbc7] scale-110 z-0"></span>
              <img src={FFlogo} alt="FitForge Logo" className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-white/80 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 relative z-10" />
              <span className="absolute inset-0 rounded-full ring-2 ring-brand-purple/40 group-hover:ring-4 group-hover:ring-brand-purple/80 animate-glow z-20" aria-hidden="true"></span>
            </span>
            <span className="font-serif font-extrabold text-3xl bg-gradient-to-r from-brand-purple via-[#e7dbc7] to-brand-purple bg-clip-text text-transparent drop-shadow-lg tracking-wider group-hover:scale-105 transition-transform duration-300">FitForge</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Add a subtle gradient underline and font enhancements */}
            <Link to="/collection" className="relative group text-foreground hover:text-brand-purple transition-all duration-300 font-semibold tracking-wide text-lg px-2">
              Collection
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple via-[#e7dbc7] to-brand-purple group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link to="/men" className="relative group text-foreground hover:text-brand-purple transition-all duration-300 font-semibold tracking-wide text-lg px-2">
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple via-[#e7dbc7] to-brand-purple group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link to="/women" className="relative group text-foreground hover:text-brand-purple transition-all duration-300 font-semibold tracking-wide text-lg px-2">
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple via-[#e7dbc7] to-brand-purple group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link to="/unisex" className="relative group text-foreground hover:text-brand-purple transition-all duration-300 font-semibold tracking-wide text-lg px-2">
              Unisex
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple via-[#e7dbc7] to-brand-purple group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link to="/customized" className="relative group text-foreground hover:text-brand-purple transition-all duration-300 font-semibold tracking-wide text-lg px-2">
              Customized
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple via-[#e7dbc7] to-brand-purple group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hover:bg-brand-purple/20 hover:scale-110 transition-all duration-300 focus:ring-2 focus:ring-brand-purple">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-brand-purple/20 hover:scale-110 transition-all duration-300 focus:ring-2 focus:ring-brand-purple">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-brand-purple/20 hover:scale-110 transition-all duration-300 group focus:ring-2 focus:ring-brand-purple" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-br from-brand-purple via-[#e7dbc7] to-brand-purple text-brand-dark text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300 border border-[hsl(45,33%,56%)] animate-bounce-badge shadow-lg">
                +{cartCount}
              </span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              <Link
                to="/collection"
                className="block px-3 py-2 text-foreground hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Collection
              </Link>
              <Link
                to="/men"
                className="block px-3 py-2 text-foreground hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                to="/women"
                className="block px-3 py-2 text-foreground hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                to="/unisex"
                className="block px-3 py-2 text-foreground hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Unisex
              </Link>
              <Link
                to="/customized"
                className="block px-3 py-2 text-foreground hover:text-brand-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Customized
              </Link>
              <div className="flex items-center space-x-4 px-3 py-2">
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setUserOpen(true)}>
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-brand-purple text-brand-light text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;