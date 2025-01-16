import { Chat } from '@/components/custom/chat';
import { MODEL_NAME } from '@/lib/model';
import { generateUUID } from '@/lib/utils';

export default async function Page() {
  const id = generateUUID();

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      selectedModelName={MODEL_NAME}
    />
  );
}