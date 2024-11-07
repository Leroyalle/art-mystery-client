import { Container } from '@/components/shared';
import { Button, Input } from '@/components/ui';

export default function Room() {
  return (
    <Container className="flex gap-4 justify-between">
      <section className="p-2 h-[100vh] flex max-w-96 min-w-80 flex-col bg-gray-200 gap-2 border-black border-2">
        <div className="flex-1 overflow-y-auto max-w-full"></div>
        <div className="flex flex-col gap-y-2">
          <Input
            placeholder="Введите сообщение..."
            className="bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button className="w-full">Отправить</Button>
        </div>
      </section>
      <section className="flex-1 bg-gray-200">
        <canvas className="w-full h-full max-w-[1100px] max-h-[700px] border-black border-2"></canvas>
      </section>
    </Container>
  );
}
