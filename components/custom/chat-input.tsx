"use client";

import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { ArrowUpIcon, StopIcon } from './icons';
import useWindowSize from './use-window-size';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export function ChatInput({
  input,
  setInput,
  isLoading,
  stop,
  messages,
  append,
  handleSubmit,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<Message>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {});

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, width]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (isLoading) {
        toast.error('Please wait for the model to finish its response!');
      } else {
        submitForm();
      }
    }
  };

  return (
    <div className="relative flex items-center w-full gap-2 px-2 sm:px-4">
      <Textarea
        ref={textareaRef}
        tabIndex={0}
        rows={1}
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Message Cortex..."
        spellCheck={false}
        className="min-h-[44px] w-full resize-none bg-background py-3 pr-12 text-base focus-visible:ring-1 focus-visible:ring-offset-0 rounded-lg"
        style={{
          height: textareaRef.current?.scrollHeight,
          maxHeight: '200px'
        }}
      />
      <div className="absolute right-4 sm:right-6 bottom-2.5">
        <Button
          type="submit"
          size="icon"
          disabled={input.trim().length === 0}
          className="size-8 rounded-lg bg-primary hover:bg-primary/90"
        >
          {isLoading ? (
            <div onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              stop();
            }}>
              <StopIcon size={16} />
            </div>
          ) : (
            <ArrowUpIcon size={16} />
          )}
        </Button>
      </div>
    </div>
  );
}
