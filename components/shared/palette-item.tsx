import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  onChange: (color: string) => void;
  active: boolean;
  color: string;
  value: string;
}

export const PaletteItem: React.FC<Props> = ({ onChange, color, value, active }) => {
  console.log(active);
  return (
    <li
      className={cn(
        'w-8 h-8 rounded-full cursor-pointer',
        color,
        active && 'border-yellow-200 border-4',
      )}>
      <input
        type="checkbox"
        value={value}
        className="w-full h-full opacity-0"
        onClick={() => onChange(value)}
      />
    </li>
  );
};
