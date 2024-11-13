'use client';

import { Attachment, ToolInvocation } from 'ai';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { Casts } from './casts';
import { Events } from './events';
import { Markdown } from './markdown';
import { PreviewAttachment } from './preview-attachment';
import { Weather } from './weather';
import { WebResults } from './web-results';
import { Skeleton } from '../ui/skeleton';

const Tool = ({ result, toolName }: {result: any, toolName: string}) => {
  return (
    <div>
      {toolName === 'getWeather' ? (
        <Weather weatherAtLocation={result} />
      ) : (toolName === 'castSearch' || toolName === 'getUserCasts') ? (
        <Casts casts={result} />
      ) : toolName === 'getEvents' ? (
        <Events events={result} />
      ) : toolName === 'webSearch' ? (
        <WebResults results={result} />
      )
      : <Skeleton className="h-4 w-[200px]" /> }
    </div>
  );
}

const ToolPreview = ({ toolName }: {toolName: string}) => {
  return (
    <div className="skeleton">
      {toolName === 'getWeather' ? (
        <Weather />
      ) : (toolName === 'castSearch' || toolName === 'getUserCasts') ? (
        <Casts />
      ) : toolName === 'getEvents' ? (
        <Events />
      ) : toolName === 'webSearch' ? (
        <WebResults />
      ) : <Skeleton className="h-4 w-[200px]" />}
    </div>
  );
}

export const Message = ({
  role,
  nextRole,
  content,
  toolInvocations,
  attachments,
  showDivider,
}: {
  role: string;
  nextRole: string;
  content: string | ReactNode;
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
  showDivider?: boolean;
}) => {

  return (
    <motion.div
      className="w-full px-4 md:px-8 lg:px-12 group/message mb-[5%]"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
    >
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {role === 'user' && (
          <h2 className="text-xl font-medium mb-4">{content}</h2>
        )}
        {role === 'assistant' && (
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-6 w-full">
              {content ? (
                <Markdown>{content as string}</Markdown>
              ) : null}
              {toolInvocations && toolInvocations.length > 0 && (
                <div className="flex flex-col gap-4">
                  {toolInvocations.map((toolInvocation) => {
                    const { toolName, toolCallId, state } = toolInvocation;
                    if (state === 'result') {
                      const { result } = toolInvocation;
                      return <Tool key={toolCallId} result={result} toolName={toolName} />
                    } else {
                      return <ToolPreview key={toolCallId} toolName={toolName} />
                    }
                  })}
                </div>
              )}
              {attachments && (
                <div className="flex flex-row gap-2">
                  {attachments.map((attachment) => (
                    <PreviewAttachment
                      key={attachment.url}
                      attachment={attachment}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {role === 'assistant' && nextRole === 'user' && (
        <div className="max-w-4xl mx-auto">
          <hr className="my-7 w-[99%] border-t-0.5 border-white/55" />
        </div>
      )}
    </motion.div>
  );
};