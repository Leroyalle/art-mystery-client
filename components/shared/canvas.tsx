'use client';
import { PaintData } from '@/@types/canvas';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui';
import { cn } from '@/lib/utils';
import { Palette } from './palette';
import { BrushSlider } from './brush-slider';

interface Props {
  role: 'user' | 'author';
  onPaint: (data: PaintData) => void;
  onInit: (ref: CanvasRenderingContext2D) => void;
  onClear: () => void;
  className?: string;
}

export const Canvas: React.FC<Props> = function Canvas({
  role,
  onPaint,
  onInit,
  onClear,
  className,
}) {
  const rootRef = React.useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('red');
  const [width, setWidth] = useState(5);

  useEffect(() => {
    if (rootRef.current) {
      const ctx = rootRef.current.getContext('2d');
      if (ctx) {
        onInit(ctx);
        rootRef.current.width = 1000;
        rootRef.current.height = 450;
        ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
      }
    }
  }, []);

  useEffect(() => {
    if (rootRef.current) {
      const ctx = rootRef.current.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
      }
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const dx = e.movementX;
        const dy = e.movementY;

        if (e.buttons > 0) {
          const ctx = rootRef.current?.getContext('2d');
          if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - dx, y - dy);
            ctx.stroke();
            ctx.closePath();
            onPaint({ x, y, dy, dx, width, color });
          }
        }
      };
      rootRef.current.addEventListener('mousemove', handleMouseMove);
      return () => {
        rootRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [width, color]);

  const handleClickClear = () => {
    onClear();
    if (rootRef.current) {
      const ctx = rootRef.current.getContext('2d');
      ctx?.clearRect(0, 0, 1000, 600);
    }
  };

  return (
    <div className={cn('select-none', className)}>
      <canvas
        ref={rootRef}
        className={cn(
          'border-black border-2 bg-white rounded-sm w-[1000px] h-[450px]',
          role === 'user' && 'pointer-events-none',
        )}
      />
      {role === 'author' && (
        <div className="flex gap-10 items-center">
          <Button onClick={handleClickClear} variant={'destructive'}>
            Очистить
          </Button>
          <Palette onChangeColor={setColor} color={color} className="flex-1" />
          <BrushSlider
            defaultValue={width}
            max={50}
            min={1}
            step={2}
            onChange={([value]) => setWidth(value)}
            className="w-[140px]"
          />
        </div>
      )}
    </div>
  );
};
