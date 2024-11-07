import { Container, Title } from '@/components/shared';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <Container className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center gap-y-2">
        <Title text={'Art Mystery'} size="2xl" />
        <p className="text-lg">
          Сыграй с друзьями! <br /> Догадаются ли они о чем ты думаешь?
        </p>
        <Link href="/game/1">
          <Button className="w-full" variant={'destructive'}>
            Создать комнату
          </Button>
        </Link>
      </div>
    </Container>
  );
}
