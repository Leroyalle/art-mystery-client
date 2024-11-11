import { PaintCoords } from '@/@types/canvas';
import React from 'react';
import { Button } from '../ui';
import { cn } from '@/lib/utils';
import { Palette } from './palette';

interface Props {
  role: 'user' | 'author';
  onPaint: (data: PaintCoords) => void;
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
  const [color, setColor] = React.useState('black');

  React.useEffect(() => {
    if (rootRef.current) {
      const ctx = rootRef.current.getContext('2d');
      if (ctx) {
        onInit(ctx);
        rootRef.current.width = 1000;
        rootRef.current.height = 450;
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;

        rootRef.current.addEventListener('mousemove', (e) => {
          const x = e.offsetX;
          const y = e.offsetY;
          const dx = e.movementX;
          const dy = e.movementY;

          if (e.buttons > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - dx, y - dy);
            ctx.stroke();
            ctx.closePath();
            onPaint({ x, y, dy, dx });
          }
        });
      }
    }
  }, []);

  React.useEffect(() => {
    if (rootRef.current) {
      const ctx = rootRef.current.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = color;
      }
    }
  }, [color]);

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
          'border-black border-2 bg-white rounded-sm',
          role === 'user' && 'pointer-events-none',
        )}
      />
      {role === 'author' && (
        <div className="flex gap-2 items-center">
          <Button onClick={handleClickClear} variant={'destructive'}>
            Очистить
          </Button>
          <Palette onChangeColor={setColor} color={color} />
        </div>
      )}
    </div>
  );
};
