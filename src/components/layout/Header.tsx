import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/Button';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Services', path: '/services' },
  { label: 'Our Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navigate = useNavigate();

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
        'w-full transition-all duration-300 z-50',
        isHomePage && !isScrolled && !isMenuOpen
          ? 'absolute top-0 left-0 right-0' 
          : 'fixed top-0 left-0 right-0',
        isScrolled || isMenuOpen
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Left side - Navigation */}
          <div className="w-1/3 flex justify-start">
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
              {/* <ThemeToggle /> */}
            </nav>
          </div>

          {/* Center - Logo */}
          <div className="w-1/3 flex justify-center">
            <NavLink 
              to="/" 
              className="text-2xl font-bold hover:text-primary cursor-pointer transition-colors duration-300 whitespace-nowrap"
            >
              Catalyst Digital
            </NavLink>
          </div>

          {/* Right side - CTA Button */}
          <div className="w-1/3 flex justify-end">
            <div className="hidden md:block">
              <Button variant="outline" onClick={() => navigate('/contact')}>Get Started</Button>
            </div>

            <div className="flex items-center space-x-4 md:hidden">
              {/* <ThemeToggle /> */}
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