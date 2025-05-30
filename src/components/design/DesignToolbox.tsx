import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, ChevronUp, ChevronDown, Copy, Check } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ColorVariable {
  name: string;
  value: string;
  label: string;
}

interface FontVariable {
  name: string;
  value: string;
  label: string;
}

const colorVariables: ColorVariable[] = [
  { name: '--background', value: '0 0% 100%', label: 'Background' },
  { name: '--foreground', value: '240 10% 3.9%', label: 'Foreground' },
  { name: '--primary', value: '221.2 83.2% 53.3%', label: 'Primary' },
  { name: '--primary-light', value: '221.2 83.2% 65%', label: 'Primary Light' },
  { name: '--primary-dark', value: '221.2 83.2% 40%', label: 'Primary Dark' },
  { name: '--secondary', value: '210 40% 96.1%', label: 'Secondary' },
  { name: '--secondary-light', value: '210 40% 98%', label: 'Secondary Light' },
  { name: '--secondary-dark', value: '210 40% 92%', label: 'Secondary Dark' },
  { name: '--accent', value: '262.1 83.3% 57.8%', label: 'Accent' },
  { name: '--accent-light', value: '262.1 83.3% 67%', label: 'Accent Light' },
  { name: '--accent-dark', value: '262.1 83.3% 47%', label: 'Accent Dark' },
  { name: '--muted', value: '210 40% 96.1%', label: 'Muted' },
  { name: '--muted-foreground', value: '215.4 16.3% 46.9%', label: 'Muted Foreground' },
  { name: '--card', value: '0 0% 100%', label: 'Card' },
  { name: '--card-foreground', value: '240 10% 3.9%', label: 'Card Foreground' },
  { name: '--destructive', value: '0 84.2% 60.2%', label: 'Destructive' },
  { name: '--destructive-light', value: '0 84.2% 70%', label: 'Destructive Light' },
  { name: '--destructive-dark', value: '0 84.2% 50%', label: 'Destructive Dark' },
  { name: '--success', value: '142.1 76.2% 36.3%', label: 'Success' },
  { name: '--success-light', value: '142.1 76.2% 46%', label: 'Success Light' },
  { name: '--success-dark', value: '142.1 76.2% 30%', label: 'Success Dark' },
  { name: '--warning', value: '38 92% 50%', label: 'Warning' },
  { name: '--warning-light', value: '38 92% 60%', label: 'Warning Light' },
  { name: '--warning-dark', value: '38 92% 40%', label: 'Warning Dark' },
];

const fontVariables: FontVariable[] = [
  { name: '--font-size-base', value: '16px', label: 'Base Font Size' },
  { name: '--line-height-base', value: '1.5', label: 'Base Line Height' },
  { name: '--font-family-sans', value: 'Inter var, Inter, sans-serif', label: 'Body Font' },
  { name: '--font-family-heading', value: 'Inter var, Inter, sans-serif', label: 'Heading Font' },
];

const borderRadiusVariables = [
  { name: '--radius', value: '0.5rem', label: 'Border Radius' },
];

const popularGoogleFonts = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Source Sans Pro',
  'Ubuntu',
  'Playfair Display',
];

function hexToHSL(hex: string): string {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${h} ${s}% ${lPercent}%`;
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function DesignToolbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeColor, setActiveColor] = useState<ColorVariable | null>(null);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<Record<string, string>>({});
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('design') === 'true') {
      setIsOpen(true);
    }

    (window as any).openDesignTools = () => setIsOpen(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const initialTheme: Record<string, string> = {};
    
    [...colorVariables, ...borderRadiusVariables, ...fontVariables].forEach(variable => {
      initialTheme[variable.name] = variable.value;
    });
    
    setTheme(initialTheme);
  }, []);

  const updateVariable = (name: string, value: string) => {
    const root = document.documentElement;
    root.style.setProperty(name, value);
    setTheme(prev => ({ ...prev, [name]: value }));

    if (name === '--font-size-base') {
      const size = parseFloat(value);
      root.style.setProperty('font-size', value);
      root.style.setProperty('--font-size-xs', `${size * 0.75}px`);
      root.style.setProperty('--font-size-sm', `${size * 0.875}px`);
      root.style.setProperty('--font-size-lg', `${size * 1.125}px`);
      root.style.setProperty('--font-size-xl', `${size * 1.25}px`);
      root.style.setProperty('--font-size-2xl', `${size * 1.5}px`);
      root.style.setProperty('--font-size-3xl', `${size * 1.875}px`);
      root.style.setProperty('--font-size-4xl', `${size * 2.25}px`);
    }
  };

  const loadGoogleFont = async (fontFamily: string) => {
    if (loadedFonts.includes(fontFamily)) return;
    
    try {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
      link.rel = 'stylesheet';
      
      await new Promise((resolve, reject) => {
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
      
      setLoadedFonts(prev => [...prev, fontFamily]);
    } catch (error) {
      console.error('Failed to load font:', error);
      toast.error(`Failed to load ${fontFamily}`);
    }
  };

  const handleFontChange = async (fontFamily: string, type: 'sans' | 'heading') => {
    try {
      await loadGoogleFont(fontFamily);
      const value = `"${fontFamily}", system-ui, sans-serif`;
      const variableName = type === 'sans' ? '--font-family-sans' : '--font-family-heading';
      updateVariable(variableName, value);
      
      document.body.style.fontFamily = value;
      if (type === 'heading') {
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
          (el as HTMLElement).style.fontFamily = value;
        });
      }
    } catch (error) {
      console.error('Error changing font:', error);
      toast.error('Failed to change font');
    }
  };

  const handleColorPickerChange = (color: string) => {
    if (!activeColor) return;
    const hslValue = hexToHSL(color);
    updateVariable(activeColor.name, hslValue);
  };

  const getHexFromHSL = (hslString: string): string => {
    const [h, s, l] = hslString.split(' ').map(v => parseFloat(v));
    return hslToHex(h, s, l);
  };

  const getCurrentFont = (type: 'sans' | 'heading') => {
    const value = theme[type === 'sans' ? '--font-family-sans' : '--font-family-heading'] || '';
    return value.split(',')[0].replace(/['"]/g, '').trim();
  };

  const copyTheme = () => {
    const themeConfig = {
      colors: Object.fromEntries(
        Object.entries(theme)
          .filter(([key]) => key.startsWith('--') && !key.includes('font'))
          .map(([key, value]) => [key.replace('--', ''), value])
      ),
      typography: Object.fromEntries(
        Object.entries(theme)
          .filter(([key]) => key.includes('font'))
          .map(([key, value]) => [key.replace('--', ''), value])
      )
    };

    const configString = JSON.stringify(themeConfig, null, 2);
    navigator.clipboard.writeText(configString);
    setCopied(true);
    toast.success('Theme configuration copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-4 right-4 w-96 bg-card rounded-lg border shadow-lg transition-all duration-300 z-[100]"
      style={{ 
        maxHeight: isMinimized ? '48px' : '80vh',
        height: isMinimized ? '48px' : '80vh'
      }}
    >
      <div className="flex items-center justify-between p-3 border-b bg-card sticky top-0 z-[101] rounded-t-lg">
        <h3 className="font-medium">Design Toolbox</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <div className="overflow-y-auto h-[calc(100%-48px)]">
          <div className="p-4">
            <Tabs defaultValue="colors">
              <TabsList className="w-full sticky top-0 bg-card z-[101]">
                <TabsTrigger value="colors" className="flex-1">Colors</TabsTrigger>
                <TabsTrigger value="typography" className="flex-1">Typography</TabsTrigger>
                <TabsTrigger value="spacing" className="flex-1">Spacing</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                {activeColor && (
                  <div className="sticky top-12 bg-card pt-4 pb-2 z-[101] border-b">
                    <div className="flex items-center justify-between mb-2">
                      <Label>{activeColor.label}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveColor(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <HexColorPicker
                      color={getHexFromHSL(theme[activeColor.name])}
                      onChange={handleColorPickerChange}
                      className="w-full"
                    />
                    <Input
                      value={theme[activeColor.name]}
                      onChange={(e) => updateVariable(activeColor.name, e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  {colorVariables.map((variable) => (
                    <div key={variable.name} className="space-y-2">
                      <Label>{variable.label}</Label>
                      <div className="flex gap-2">
                        <div
                          className="w-8 h-8 rounded border cursor-pointer transition-transform hover:scale-105"
                          style={{ backgroundColor: `hsl(${theme[variable.name]})` }}
                          onClick={() => setActiveColor(variable)}
                        />
                        <Input
                          value={theme[variable.name]}
                          onChange={(e) => updateVariable(variable.name, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Body Font</Label>
                    <Select
                      value={getCurrentFont('sans')}
                      onValueChange={(value) => handleFontChange(value, 'sans')}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent 
                        className="z-[999]" 
                        position="popper" 
                        sideOffset={5}
                        align="start"
                      >
                        {popularGoogleFonts.map((font) => (
                          <SelectItem
                            key={font}
                            value={font}
                            style={{ fontFamily: `"${font}", system-ui, sans-serif` }}
                          >
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Heading Font</Label>
                    <Select
                      value={getCurrentFont('heading')}
                      onValueChange={(value) => handleFontChange(value, 'heading')}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent 
                        className="z-[999]" 
                        position="popper" 
                        sideOffset={5}
                        align="start"
                      >
                        {popularGoogleFonts.map((font) => (
                          <SelectItem
                            key={font}
                            value={font}
                            style={{ fontFamily: `"${font}", system-ui, sans-serif` }}
                          >
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Base Font Size</Label>
                    <Input
                      type="number"
                      min="12"
                      max="24"
                      value={parseInt(theme['--font-size-base'])}
                      onChange={(e) => updateVariable('--font-size-base', `${e.target.value}px`)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Line Height</Label>
                    <Input
                      type="number"
                      min="1"
                      max="2"
                      step="0.1"
                      value={theme['--line-height-base']}
                      onChange={(e) => updateVariable('--line-height-base', e.target.value)}
                    />
                  </div>

                  <div className="space-y-4 border rounded-lg p-4 mt-6">
                    <h4 className="font-medium mb-2">Preview</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sample text to preview the selected fonts and sizes
                    </p>
                    <div className="space-y-2">
                      <h1 className="text-4xl">Heading 1</h1>
                      <h2 className="text-3xl">Heading 2</h2>
                      <h3 className="text-2xl">Heading 3</h3>
                      <p className="mt-4">
                        This is a paragraph of text that shows how the body font
                        looks in a longer block of content. It includes different
                        sizes and weights to give you a better idea of how the
                        typography will look in your actual content.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="spacing" className="space-y-4">
                <div className="space-y-4">
                  {borderRadiusVariables.map((variable) => (
                    <div key={variable.name} className="space-y-2">
                      <Label>{variable.label}</Label>
                      <Input
                        value={theme[variable.name]}
                        onChange={(e) => updateVariable(variable.name, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 sticky bottom-0 bg-card pt-2 pb-4 z-[101]">
              <Button
                variant="high"
                className="w-full"
                onClick={copyTheme}
                leftIcon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              >
                {copied ? 'Copied!' : 'Copy Theme Configuration'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}