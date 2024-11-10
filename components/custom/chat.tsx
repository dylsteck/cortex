'use client';

import { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import { useState } from 'react';

import { Message as PreviewMessage } from '@/components/custom/message';
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { Model } from '@/lib/model';

import { ChatHeader } from './chat-header';
import { MultimodalInput } from './multimodal-input';

export function Chat({
  id,
  initialMessages,
  selectedModelName,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelName: Model['name'];
}) {
  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      body: { id, model: selectedModelName },
      initialMessages,
      onFinish: () => {
        window.history.replaceState({}, '', `/chat/${id}`);
      },
    });

  return (
    <div className="flex flex-col gap-0 min-w-0 h-screen bg-background">
      <ChatHeader selectedModelName={selectedModelName} />
      <div className="flex-1 overflow-auto">
        {messages.length === 0 && 
          <iframe
            className="w-full h-[91%] rounded-xl border border-white"
            src="https://dylansteck.com"
          />
        }
        {messages.length > 0 &&  
        <div className="w-full h-[91%] rounded-xl border border-white pt-2 overflow-y-scroll">
          {messages.map((message) => (
            <PreviewMessage
              key={message.id}
              role={message.role}
              content={message.content}
              attachments={message.experimental_attachments}
              toolInvocations={message.toolInvocations}
            />
          ))}
        </div>
        }
      </div>
      <form className="flex m-0 bg-background w-full fixed bottom-0 inset-x-0">
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          append={append}
        />
      </form>
    </div>
  );
}