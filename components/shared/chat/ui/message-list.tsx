'use client';
import { Message } from '@/@types/message';
import React, { useEffect, useRef } from 'react';
import { MessageItem } from './message-item';

interface Props {
  messages: Message[];
}

export const MessageList: React.FC<Props> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto max-w-full flex flex-col gap-y-4">
      {messages.map(({ name, text }, i) => (
        <MessageItem key={i} name={name} text={text} />
      ))}
    </div>
  );
};
