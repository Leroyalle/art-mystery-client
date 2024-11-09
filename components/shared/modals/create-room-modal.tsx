import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '../../ui';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib';
import toast from 'react-hot-toast';
import { createRoom } from '@/app/services/rooms';
import { useRouter } from 'nextjs-toploader/app';

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export const CreateRoomModal: React.FC<Props> = ({ open, onClose }) => {
  const router = useRouter();
  const { handleSubmit, control, setValue } = useForm<{ hiddenWord: string }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      hiddenWord: '',
    },
  });

  const handleClose = () => {
    setValue('hiddenWord', '');
    onClose();
  };

  const onSubmit = async (data: { hiddenWord: string }) => {
    try {
      const room = await createRoom({ hiddenWord: data.hiddenWord });
      toast.success(`Комната создана! Переход...`);
      setValue('hiddenWord', '');
      router.push(`/room/${room.code}`);
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-50 ">
        <DialogHeader>
          <DialogTitle>Создание комнаты</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <span className="mb-2 block text-xl">Загадайте слово:</span>
            <Controller
              control={control}
              name="hiddenWord"
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  className="w-full md:text-2xl uppercase placeholder:text-lg placeholder:normal-case"
                  placeholder="Введите загаданное слово..."
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button>Создать комнату</Button>
            <Button onClick={handleClose} variant={'ghost'}>
              Отмена
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
