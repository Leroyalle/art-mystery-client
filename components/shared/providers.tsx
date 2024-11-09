import NextTopLoader from 'nextjs-toploader';
import React from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <NextTopLoader />
      <Toaster />
    </>
  );
};
