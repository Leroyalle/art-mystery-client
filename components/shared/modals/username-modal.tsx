import React from 'react';
import { Button, Dialog, DialogContent, DialogFooter, Input } from '../../ui';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  setUsername: (name: string) => void;
}

export const UsernameModal: React.FC<Props> = ({ open, onClose, setUsername }) => {
  const { handleSubmit, control, setValue } = useForm<{ name: string }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const handleClose = () => {
    setValue('name', '');
    onClose();
  };

  const onSubmit = async (data: { name: string }) => {
    setUsername(data.name);
    localStorage.setItem('am_username', data.name);
    toast.success(`Имя добавлено!`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-50 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <span className="mb-2 block text-xl">Ваше имя на текущий раунд:</span>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  className="w-full md:text-2xl placeholder:text-lg"
                  placeholder="Ваше имя..."
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button>Сохранить</Button>
            <Button onClick={handleClose} variant={'ghost'}>
              Отмена
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
