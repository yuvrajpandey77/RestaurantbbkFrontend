import { ShoppingCart, Search, Menu } from 'lucide-react';
import Logo from './Logo';

export const Header = () => {
  const onClick = (name: string) => () => console.log(`${name} clicked`);

  const nav = ['Menu', 'About', 'Home', 'Services', 'Contact'];
  return (
    <header className="elevated sticky top-0 z-20 w-full bg-transparent shadow-none">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo className="flex items-center" />
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map((n) => (
            <a
              key={n}
              href="#"
              className="focus-ring text-neutral-900/80 hover:text-neutral-900"
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
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


