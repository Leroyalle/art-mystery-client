import React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { ShareLink } from './share-link';

interface Props {
  author: string;
  hiddenWord?: string;
  online: number;
  className?: string;
}

export const RoomInfo: React.FC<Props> = ({ author, hiddenWord, online, className }) => {
  const [isShow, setIsShow] = React.useState(false);
  return (
    <ul className={cn('flex flex-wrap items-center gap-6 my-3', className)}>
      <li className="text-2xl">
        <strong>Онлайн:</strong> {online}
      </li>
      <li className="text-2xl">
        <strong>Автор:</strong> {author}
      </li>
      {hiddenWord && (
        <li className="text-2xl flex items-center gap-2">
          <strong>Загаданное слово:</strong>
          {isShow ? (
            <>
              <span className="text-red-700">{hiddenWord}</span>
              <EyeOff onClick={() => setIsShow(false)} className="select-none" />
            </>
          ) : (
            <Eye onClick={() => setIsShow(true)} className="select-none" />
          )}
        </li>
      )}
      <li>
        <ShareLink />
      </li>
    </ul>
  );
};
