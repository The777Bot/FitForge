import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(135deg,_hsl(0,0%,14%),_hsl(0,0%,8%))] text-[hsl(45,33%,90%)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[hsl(45,33%,95%)]">FitForge</h3>
            <p className="text-[hsl(45,33%,90%)]">
              Forge your style with premium streetwear and contemporary fashion.
            </p>
            <a href="mailto:fitforge.pk@gmail.com" className="block text-[hsl(45,33%,95%)] font-semibold underline underline-offset-2 hover:text-brand-purple transition-colors">fitforge.pk@gmail.com</a>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-[hsl(45,33%,90%)] hover:text-[hsl(45,33%,95%)] transition-colors cursor-pointer" />
              <Instagram className="h-5 w-5 text-[hsl(45,33%,90%)] hover:text-[hsl(45,33%,95%)] transition-colors cursor-pointer" />
              <Twitter className="h-5 w-5 text-[hsl(45,33%,90%)] hover:text-[hsl(45,33%,95%)] transition-colors cursor-pointer" />
              <Youtube className="h-5 w-5 text-[hsl(45,33%,90%)] hover:text-[hsl(45,33%,95%)] transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[hsl(45,33%,95%)]">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Men's</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Women's</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Accessories</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[hsl(45,33%,95%)]">Support</h4>
            <ul className="space-y-2">
              <li><a href="mailto:fitforge.pk@gmail.com" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Email: fitforge.pk@gmail.com</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Shipping</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Returns</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[hsl(45,33%,95%)]">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">About Us</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Careers</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[hsl(45,33%,90%)] hover:text-brand-purple transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[hsl(45,33%,40%)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center relative">
          <p className="text-[hsl(45,33%,90%)] text-sm">
            © 2025 FitForge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-[hsl(45,33%,90%)] text-sm">Payment methods:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-[hsl(45,33%,40%)] rounded"></div>
              <div className="w-8 h-5 bg-[hsl(45,33%,40%)] rounded"></div>
              <div className="w-8 h-5 bg-[hsl(45,33%,40%)] rounded"></div>
            </div>
          </div>
          <a
            href="mailto:ubadahme@gmail.com"
            className="relative md:static md:ml-auto text-xs md:text-sm text-[hsl(45,33%,90%)] bg-[hsl(0,0%,10%)] px-4 py-2 rounded-full shadow-lg hover:bg-[hsl(45,33%,90%)] hover:text-[hsl(0,0%,5%)] transition-all duration-300 font-semibold flex items-center group border border-[hsl(45,33%,90%)] hover:shadow-2xl hover:shadow-brand-purple/40 mt-4 md:mt-0 mx-auto md:mx-0"
            style={{ letterSpacing: '0.05em', boxShadow: '0 2px 12px 0 hsl(45,33%,80%,0.15)' }}
            title="Contact the developer"
          >
            <Mail className="inline-block w-4 h-4 mr-2 group-hover:text-[hsl(0,0%,5%)] transition-all duration-300" />
            Developed by <span className="underline underline-offset-2 ml-1">ubadahme@gmail.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;