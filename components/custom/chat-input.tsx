"use client";

import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { toast } from 'sonner';

import { ArrowUpIcon, StopIcon } from './icons';
import useWindowSize from '../../hooks/use-window-size';
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
    setInput('');

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [handleSubmit, setInput]);

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
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className="min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted"
        rows={2}
        onKeyDown={handleKeyDown}
      />

      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
        {isLoading ? (
          <Button onClick={stop} className="rounded-full p-1.5 h-fit border dark:border-zinc-600">
            <StopIcon size={14} />
          </Button>
        ) : (
          <Button
            onClick={submitForm}
            disabled={input.length === 0}
            className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
          >
            <ArrowUpIcon size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}
