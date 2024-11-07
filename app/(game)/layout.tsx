import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art Mystery',
};

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="h-full">{children}</main>
    </>
  );
}
