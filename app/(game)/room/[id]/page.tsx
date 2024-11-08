'use client';
import { PaintCoords } from '@/@types/canvas';
import { Canvas, Container } from '@/components/shared';
import { Button, Input } from '@/components/ui';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Room() {
  const socketRef = useRef<Socket>();
  const canvasCtxRef = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BASE_URL);

    socketRef.current.on('repaint', ({ x, y, dx, dy }) => {
      if (canvasCtxRef.current) {
        canvasCtxRef.current.beginPath();
        canvasCtxRef.current.moveTo(x, y);
        canvasCtxRef.current.lineTo(x - dx, y - dy);
        canvasCtxRef.current.stroke();
        canvasCtxRef.current.closePath();
      }
    });

    socketRef.current.on('clear_canvas', () => {
      if (canvasCtxRef.current) {
        canvasCtxRef.current?.clearRect(0, 0, 1000, 600);
      }
    });
  }, []);

  const onPaint = (data: PaintCoords) => {
    if (socketRef.current) {
      socketRef.current.emit('paint', data);
    }
  };

  const onClear = () => {
    if (socketRef.current) {
      socketRef.current.emit('clear');
    }
  };

  return (
    <Container className="flex gap-4 justify-between">
      <section className="p-2 h-[100vh] flex max-w-96 min-w-80 flex-col bg-gray-200 gap-2 border-black border-2">
        <div className="flex-1 overflow-y-auto max-w-full"></div>
        <div className="flex flex-col gap-y-2">
          <Input
            placeholder="Введите сообщение..."
            className="bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button className="w-full">Отправить</Button>
        </div>
      </section>
      <section className="flex-1 bg-gray-200 flex items-center justify-center">
        <Canvas
          onPaint={onPaint}
          onInit={(ctx) => (canvasCtxRef.current = ctx)}
          onClear={onClear}
          className="flex flex-col gap-y-2 items-start"
        />
      </section>
    </Container>
  );
}
