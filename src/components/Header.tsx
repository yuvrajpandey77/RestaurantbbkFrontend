import { ShoppingCart, Search, Menu } from 'lucide-react';
import Logo from './Logo';

export const Header = () => {
  const onClick = (name: string) => () => console.log(`${name} clicked`);

  const nav = ['Menu', 'About', 'Home', 'Services', 'Contact'];
  return (
    <header className="elevated fixed top-0 left-0 right-0 z-30 w-full backdrop-blur-md shadow-none">
      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:px-6">
        <Logo className="flex items-center" />
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
        <div className="flex items-center justify-end gap-3">
          <button aria-label="Search" className="focus-ring rounded-full p-2 hover:bg-black/5" onClick={onClick('search')}>
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="focus-ring rounded-full p-2 hover:bg-black/5" onClick={onClick('cart')}>
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button aria-label="Toggle menu" className="focus-ring rounded-full p-2 hover:bg-black/5" onClick={onClick('toggle')}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


