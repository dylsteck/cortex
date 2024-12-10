'use client';
import { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';

import { Message as PreviewMessage } from '@/components/custom/message';
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { Model } from '@/lib/model';

import { ChatHeader } from './chat-header';
import { ChatInput } from './chat-input';
import { Overview } from './overview';
import { SuggestedActions } from './suggested-actions';

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

  const [containerRef, endRef] = useScrollToBottom(messages);
  
  return (
    <div className="flex flex-col w-screen h-dvh bg-background overflow-hidden">
      <ChatHeader />
      <main className="flex-1 w-full overflow-y-auto" ref={containerRef}>
        <div className="w-full px-3">
          {messages.length === 0 && <Overview />}
          {messages.map((message, index) => (
            <PreviewMessage
              key={message.id}
              role={message.role}
              nextRole={messages[index + 1] ? messages[index + 1].role : ""}
              content={message.content}
              attachments={message.experimental_attachments}
              toolInvocations={message.toolInvocations}
            />
          ))}
          <div ref={endRef} />
        </div>
      </main>
      <footer className="w-full bg-background">
        <div className="w-full">
          {messages.length === 0 && (
            <div className="pb-2">      
              <SuggestedActions 
                onActionSelect={(action) => {
                  append({
                    role: 'user',
                    content: action,
                  });
                }} 
              />
            </div>
          )}
          <div className="w-full border-t bg-background p-3">
            <form onSubmit={handleSubmit}>
              <ChatInput
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                stop={stop}
                messages={messages}
                append={append}
                handleSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}