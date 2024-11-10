import { Api } from '@/app/services/api-client';
import { Container, RoomClientWrapper } from '@/components/shared';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function Room({ params: { code } }: { params: { code: string } }) {
  const roomData = await Api.room.findRoom(
    { code },
    { headers: { Cookie: `am_userId=${cookies().get('am_userId')?.value || ''}` } },
  );

  if (!roomData) {
    return notFound();
  }

  return (
    <Container>
      <RoomClientWrapper code={roomData.code} />
    </Container>
  );
}
