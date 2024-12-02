"use client"

import AppBuilder from '@/components/custom/app-builder';
import { ChatHeader } from '@/components/custom/chat-header';

export default function Page() {
  return(
    <div>
      <ChatHeader />
      <AppBuilder />
    </div>
  );
}
