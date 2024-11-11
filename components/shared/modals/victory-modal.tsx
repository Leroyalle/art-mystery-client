import React from 'react';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../ui';
import Link from 'next/link';
import { updateDataPath } from '@/app/actions';

interface Props {
  open: boolean;
  name: string;
  hiddenWord: string;
}

export const VictoryModal: React.FC<Props> = ({ open, name, hiddenWord }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        closeButton={false}
        className="w-[450px] bg-white p-10 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-50 ">
        <DialogHeader>
          <DialogTitle className="text-xl">Слово отгадано!</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          Игрок <span className="text-red-700">{name}</span> отгадал загаданное слово:{' '}
          <span className="text-red-700">{hiddenWord}</span>
        </div>
        <DialogFooter>
          <Link href="/" onClick={() => updateDataPath('/rooms')}>
            <Button>В главное меню</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
