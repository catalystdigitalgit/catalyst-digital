import { createElement } from 'react';
import * as Hi2Icons from 'react-icons/hi2';
import { cn } from '@/lib/utils';

type IconName = keyof typeof Hi2Icons;
type IconVariant = 'solid' | 'outline';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconProps {
  name: string;
  variant?: IconVariant;
  size?: IconSize;
  className?: string;
}

const sizeClasses: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export function Icon({ name, variant = 'solid', size = 'md', className }: IconProps) {
  // Convert name to proper format (e.g., "userCircle" -> "HiUserCircle" or "HiOutlineUserCircle")
  const prefix = variant === 'outline' ? 'HiOutline' : 'Hi';
  const iconName = prefix + name.charAt(0).toUpperCase() + name.slice(1);
  
  const IconComponent = Hi2Icons[iconName as IconName];
  
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`);
    return null;
  }

  return createElement(IconComponent, {
    className: cn(
      'text-foreground',
      sizeClasses[size],
      className
    )
  });
}