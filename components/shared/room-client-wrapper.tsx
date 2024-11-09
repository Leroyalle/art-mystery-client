'use client';
import { PaintCoords } from '@/@types/canvas';
import { Message } from '@/@types/message';
import { Canvas, ChatActions, Container, MessageList, VictoryModal } from '@/components/shared';
import { FC, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Props {
  code: string;
}

export const RoomClientWrapper: FC<Props> = ({ code }) => {
  const [opened, setOpened] = useState(false);
  const [winner, setWinner] = useState<{ name: string; hiddenWord: string }>({
    name: '',
    hiddenWord: '',
  });
  const socketRef = useRef<Socket>();
  const canvasCtxRef = useRef<CanvasRenderingContext2D>();
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BASE_URL, {
      query: {
        roomId: code,
      },
    });

    socketRef.current.on('repaint', ({ x, y, dx, dy }) => {
      if (canvasCtxRef.current) {
        canvasCtxRef.current.beginPath();
        canvasCtxRef.current.moveTo(x, y);
        canvasCtxRef.current.lineTo(x - dx, y - dy);
        canvasCtxRef.current.stroke();
        canvasCtxRef.current.closePath();
      }
    });

    socketRef.current.on('victory', (data: { name: string; hiddenWord: string }) => {
      setWinner(data);
      setOpened(true);
    });
    socketRef.current.on('clear_canvas', () => {
      if (canvasCtxRef.current) {
        canvasCtxRef.current?.clearRect(0, 0, 1000, 600);
      }
    });

    socketRef.current.on('get_message', (data: Message) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect();
      }
    };
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

  const onSendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.emit('send_message', {
        name: 'Leroyalle',
        text: message,
        pathname: code,
      });
      setMessages((prev) => [...prev, { name: 'Leroyalle', text: message }]);
    }
  };

  return (
    <Container className="flex gap-4 justify-between">
      <section className="p-2 h-[100vh] flex max-w-96 min-w-80 flex-col bg-gray-200 gap-2 border-black border-2">
        <MessageList messages={messages} />
        <ChatActions onSendMessage={onSendMessage} />
      </section>
      <section className="flex-1 bg-gray-200 flex items-center justify-center">
        <Canvas
          onPaint={onPaint}
          onInit={(ctx) => (canvasCtxRef.current = ctx)}
          onClear={onClear}
          className="flex flex-col gap-y-2 items-start"
        />
      </section>
      <VictoryModal open={opened} name={winner.name} hiddenWord={winner.hiddenWord} />
    </Container>
  );
};
