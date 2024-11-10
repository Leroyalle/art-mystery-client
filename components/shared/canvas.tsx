import { PaintCoords } from '@/@types/canvas';
import React from 'react';
import { Button } from '../ui';
import { cn } from '@/lib/utils';

type TCanvas = {
  onPaint: (data: PaintCoords) => void;
  onInit: (ref: CanvasRenderingContext2D) => void;
  onClear: () => void;
  className?: string;
};

export const Canvas: React.FC<TCanvas> = function Canvas({ onPaint, onInit, onClear, className }) {
  const rootRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (rootRef.current) {
      const ctx = rootRef.current.getContext('2d');
      if (ctx) {
        onInit(ctx);
        rootRef.current.width = 1000;
        rootRef.current.height = 450;
        ctx.lineCap = 'round';
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'black';

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

  const handleClickClear = () => {
    onClear();
    if (rootRef.current) {
      const ctx = rootRef.current.getContext('2d');
      ctx?.clearRect(0, 0, 1000, 600);
    }
  };

  return (
    <div className={cn('select-none', className)}>
      <canvas ref={rootRef} className=" border-black border-2" />
      <Button onClick={handleClickClear} variant={'destructive'}>
        Очистить
      </Button>
    </div>
  );
};
