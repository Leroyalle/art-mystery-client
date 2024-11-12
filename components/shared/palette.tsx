import React from 'react';
import { cn } from '@/lib/utils';
import { PaletteItem } from './palette-item';
import { PALETTE_ITEMS } from '@/constants';

interface Props {
  onChangeColor: (color: string) => void;
  color: string;
  className?: string;
}

export const Palette: React.FC<Props> = ({ onChangeColor, color: _color, className }) => {
  return (
    <ul className={cn('flex flex-wrap gap-3 w-full', className)}>
      {PALETTE_ITEMS.map(({ color, value }, i) => (
        <PaletteItem
          key={i}
          color={color}
          value={value}
          onChange={onChangeColor}
          active={value === _color}
        />
      ))}
    </ul>
  );
};
