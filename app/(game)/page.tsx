import { Container, Title, CreateRoom } from '@/components/shared';

export default function Home() {
  return (
    <Container className="w-full h-[100vh] flex justify-center items-center">
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
