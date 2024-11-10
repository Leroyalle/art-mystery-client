import { AxiosRequestConfig } from 'axios';
import { ApiRouter } from './constnants';
import { axiosInstance } from './instance';

export const createRoom = async ({
  author,
  hiddenWord,
}: {
  author: string;
  hiddenWord: string;
}) => {
  return (await axiosInstance.post(ApiRouter.ROOMS, { author, hiddenWord })).data;
};

export const findRoom = async (
  { code }: { code: string },
  options: AxiosRequestConfig = {},
): Promise<{ code: string; author: string; role: 'user' | 'author'; hiddenWord?: string }> => {
  return (await axiosInstance.get(`${ApiRouter.ROOMS}/${code}`, options)).data;
};
