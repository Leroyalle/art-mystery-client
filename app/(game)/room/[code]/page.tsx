import { Container, RoomClientWrapper } from '@/components/shared';

export default async function Room({ params: { code } }: { params: { code: string } }) {
  // TODO: проверить есть ли комната с таким кодом
  return (
    <Container>
      <RoomClientWrapper code={code} />
    </Container>
  );
}
