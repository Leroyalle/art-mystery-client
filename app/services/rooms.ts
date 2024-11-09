import { ApiRouter } from './constnants';
import { axiosInstance } from './instance';

export const createRoom = async ({ hiddenWord }: { hiddenWord: string }) => {
  return (await axiosInstance.post(ApiRouter.ROOMS, { hiddenWord })).data;
};

export const findRoom = async ({ hiddenWord }: { hiddenWord: string }) => {
  return (await axiosInstance.get(ApiRouter.ROOMS, { params: { hiddenWord } })).data;
};
