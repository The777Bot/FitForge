import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(135deg,_hsl(0,0%,10%),_hsl(45,33%,80%))] text-[hsl(45,33%,80%)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[hsl(45,33%,80%)]">
              FitForge
            </h3>
            <p className="text-[hsl(45,33%,70%)]">
              Forge your style with premium streetwear and contemporary fashion.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-[hsl(45,33%,70%)] hover:text-[hsl(45,33%,80%)] transition-colors cursor-pointer" />
              <Instagram className="h-5 w-5 text-[hsl(45,33%,70%)] hover:text-[hsl(45,33%,80%)] transition-colors cursor-pointer" />
              <Twitter className="h-5 w-5 text-[hsl(45,33%,70%)] hover:text-[hsl(45,33%,80%)] transition-colors cursor-pointer" />
              <Youtube className="h-5 w-5 text-[hsl(45,33%,70%)] hover:text-[hsl(45,33%,80%)] transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold text-brand-light">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Men's</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Women's</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Accessories</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-brand-light">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Shipping</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Returns</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-brand-light">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">About Us</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Careers</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-brand-light/80 hover:text-brand-purple transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brand-light/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-light/60 text-sm">
            © 2024 FitForge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-brand-light/60 text-sm">Payment methods:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-brand-light/20 rounded"></div>
              <div className="w-8 h-5 bg-brand-light/20 rounded"></div>
              <div className="w-8 h-5 bg-brand-light/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;