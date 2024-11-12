import React from 'react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { Copy } from 'lucide-react';

interface Props {
  className?: string;
}

export const ShareLink: React.FC<Props> = ({ className }) => {
  const pathName = usePathname();
  const copiedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`;
  const onClickLinkCopy = () => {
    navigator.clipboard.writeText(copiedUrl);
    toast.success('Ссылка скопирована');
  };
  return (
    <div
      className={cn(
        'flex items-center gap-x-2 transition-all hover:opacity-75 active:opacity-50',
        className,
      )}
      onClick={onClickLinkCopy}>
      <Copy size={20} />
      <span className="select-none">Поделиться комнатой</span>
    </div>
  );
};
