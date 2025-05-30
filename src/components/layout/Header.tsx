import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/Button';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Our Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="text-2xl font-bold text-primary"
            >
              Catalyst Digital
            </NavLink>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-primary animated-underline',
                    isActive ? 'text-primary' : 'text-foreground/80'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </nav>

          <div className="hidden md:block">
            <Button variant="high">Get Started</Button>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block py-2 text-base font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-foreground/80'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2">
              <Button variant="high" fullWidth={true}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}