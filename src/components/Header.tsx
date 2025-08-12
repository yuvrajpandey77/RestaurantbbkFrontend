import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onClick = (name: string) => () => console.log(`${name} clicked`);

  const nav = ['Menu', 'About', 'Home', 'Services', 'Contact'];
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="elevated fixed top-0 left-0 right-0 z-[9999] w-full  shadow-none">
      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:px-6">
        <Logo className="flex items-center" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm">
          {nav.map((n) => (
            <a
              key={n}
              href="#"
              className="focus-ring group relative text-neutral-900/80 transition-colors hover:text-neutral-900"
            >
              <span className="relative">
                {n}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" aria-hidden />
              </span>
            </a>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center justify-end gap-3">
          <button aria-label="Cart" className="focus-ring rounded-full p-2 hover:bg-black/5 transition-colors" onClick={onClick('cart')}>
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button aria-label="User profile" className="focus-ring rounded-full p-2 bg-black/5 transition-colors" onClick={onClick('user')}>
            <User className="h-5 w-5" />
          </button>
          
          {/* Mobile menu toggle */}
          <button 
            aria-label="Toggle mobile menu" 
            className="focus-ring rounded-full p-2 hover:bg-black/5 transition-colors md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            onClick={closeMobileMenu}
            aria-hidden
          />
          
          {/* Mobile menu */}
          <div className="fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200 z-[9999]">
            <nav className="px-4 py-6">
              <ul className="space-y-4">
                {nav.map((n) => (
                  <li key={n}>
                    <a
                      href="#"
                      className="focus-ring block py-3 px-2 text-lg font-medium text-neutral-900/80 hover:text-neutral-900 transition-colors border-b border-transparent hover:border-neutral-300"
                      onClick={closeMobileMenu}
                    >
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


