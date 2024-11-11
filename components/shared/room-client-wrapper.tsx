'use client';
import { PaintCoords } from '@/@types/canvas';
import { Message } from '@/@types/message';
import { Canvas, ChatActions, Container, MessageList, VictoryModal } from '@/components/shared';
import { FC, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { RoomInfo } from './room-info';
// import toast from 'react-hot-toast';

interface Props {
  code: string;
  role: 'user' | 'author';
  author: string;
  hiddenWord?: string;
}

export const RoomClientWrapper: FC<Props> = ({ code, role, author, hiddenWord }) => {
  const [opened, setOpened] = useState(false);
  const [usersCount, setUsersCount] = useState(1);
  const [username, setUsername] = useState(localStorage.getItem('am_username') || '');
  const [messages, setMessages] = useState<Message[]>([]);
  const [winner, setWinner] = useState<{ name: string; hiddenWord: string }>({
    name: '',
    hiddenWord: '',
  });
  const socketRef = useRef<Socket>();
  const canvasCtxRef = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BASE_URL, {
      query: {
        roomId: code,
      },
    });
    socketRef.current.on('online_users', (onlineUsers: number) => {
      setUsersCount(onlineUsers);
      // toast.success('Новый игрок!');
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
        name: username,
        text: message.toLocaleLowerCase(),
        pathname: code,
      });
      setMessages((prev) => [...prev, { name: username, text: message }]);
    }
  };

  return (
    <Container className="flex gap-4 justify-between">
      <section className="p-2 h-[100vh] flex max-w-96 min-w-80 flex-col bg-gray-200 gap-2 border-black border-2">
        <MessageList messages={messages} />
        {role === 'user' && (
          <ChatActions
            onSendMessage={onSendMessage}
            setUsername={setUsername}
            username={username}
          />
        )}
      </section>
      <section className="flex-1 bg-gray-200 flex flex-col items-start justify-top px-10">
        <RoomInfo author={author} hiddenWord={hiddenWord} online={usersCount} />
        <Canvas
          role={role}
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
