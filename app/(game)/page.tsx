import { Container, Title, CreateRoom } from '@/components/shared';

export default function Home() {
  return (
    <Container className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center gap-y-2">
        <Title text={'Art Mystery'} size="2xl" />
        <p className="text-lg">
          Сыграй с друзьями! <br /> Догадаются ли они о чем ты думаешь?
        </p>
        <CreateRoom />
      </div>
    </Container>
  );
}
