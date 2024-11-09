'use client';
import { Button, Input } from '@/components/ui';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  onSendMessage: (message: string) => void;
  className?: string;
}

export const ChatActions: React.FC<Props> = ({ onSendMessage, className }) => {
  const { handleSubmit, control, setValue } = useForm<{ message: string }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = (data: { message: string }) => {
    onSendMessage(data.message);
    setValue('message', '');
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              required
              placeholder="Введите сообщение..."
              className="bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            />
          )}
        />
        <Button className="w-full" type="submit">
          Отправить
        </Button>
      </form>
    </div>
  );
};
