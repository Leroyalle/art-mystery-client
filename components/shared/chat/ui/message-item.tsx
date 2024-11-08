import React from 'react';

interface Props {
  name: string;
  text: string;
}

export const MessageItem: React.FC<Props> = ({ name, text }) => {
  return (
    <div className="flex flex-col w-fit">
      <strong>{name}</strong>
      <span>{text}</span>
    </div>
  );
};
