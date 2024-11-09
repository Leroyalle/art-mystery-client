'use client';
import React from 'react';
import { Button } from '../ui';
import { CreateRoomModal } from './modals/create-room-modal';

export const CreateRoom: React.FC = () => {
  const [formIsOpened, setFormIsOpened] = React.useState(false);
  return (
    <>
      <Button className="w-full" variant={'destructive'} onClick={() => setFormIsOpened(true)}>
        Создать комнату
      </Button>
      <CreateRoomModal open={formIsOpened} onClose={() => setFormIsOpened(false)} />
    </>
  );
};
