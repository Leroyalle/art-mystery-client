'use client';
import { PaintData } from '@/@types/canvas';
import { Message } from '@/@types/message';
import { Canvas, ChatActions, Container, MessageList, VictoryModal } from '@/components/shared';
import { FC, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { RoomInfo } from './room-info';

interface Props {
  code: string;
  role: 'user' | 'author';
  author: string;
  hiddenWord?: string;
}

export const RoomClientWrapper: FC<Props> = ({ code, role, author, hiddenWord }) => {
  const [opened, setOpened] = useState(false);
  const [usersCount, setUsersCount] = useState(1);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [winner, setWinner] = useState<{ name: string; hiddenWord: string }>({
    name: '',
    hiddenWord: '',
  });
  const socketRef = useRef<Socket>();
  const canvasCtxRef = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    const storedUsername = localStorage.getItem('am_username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BASE_API_URL, {
      query: {
        roomId: code,
      },
    });
    socketRef.current.on('online_users', (onlineUsers: number) => {
      setUsersCount(onlineUsers);
    });

    socketRef.current.on('repaint', ({ x, y, dx, dy, width, color }: PaintData) => {
      if (canvasCtxRef.current) {
        canvasCtxRef.current.lineWidth = width;
        canvasCtxRef.current.strokeStyle = color;
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
      localStorage.removeItem('am_username');
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

  const onPaint = (data: PaintData) => {
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
        name: username,
        text: message.toLocaleLowerCase(),
        pathname: code,
      });
      setMessages((prev) => [...prev, { name: username, text: message }]);
    }
  };

  return (
    <Container className="flex flex-col">
      <RoomInfo author={author} hiddenWord={hiddenWord} online={usersCount} />
      <div className="flex gap-4 justify-between  rounded-sm">
        <section className="p-2 h-[90vh] flex max-w-96 min-w-80 flex-col bg-white rounded-sm gap-2 border-black border-2">
          <MessageList messages={messages} />
          {role === 'user' && (
            <ChatActions
              onSendMessage={onSendMessage}
              setUsername={setUsername}
              username={username}
            />
          )}
        </section>
        <section className="flex-1 flex flex-col items-start justify-top px-10">
          <Canvas
            role={role}
            onPaint={onPaint}
            onInit={(ctx) => (canvasCtxRef.current = ctx)}
            onClear={onClear}
            className="flex flex-col gap-y-2 items-start"
          />
        </section>
      </div>
      <VictoryModal open={opened} name={winner.name} hiddenWord={winner.hiddenWord} />
    </Container>
  );
};
