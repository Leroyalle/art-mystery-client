import React from 'react';
import { Slider } from '../ui';
import { Brush } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  defaultValue: number;
  max: number;
  min: number;
  step: number;
  onChange: (value: number[]) => void;
  className?: string;
}

export const BrushSlider: React.FC<Props> = ({
  defaultValue = 1,
  max,
  min,
  step,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      <Brush size={50} />
      <Slider
        defaultValue={[defaultValue]}
        max={max}
        min={min}
        step={step}
        onValueChange={onChange}
      />
    </div>
  );
};
