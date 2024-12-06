'use client';

import { Attachment, ToolInvocation } from 'ai';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { Casts } from './casts';
import ClankerTrendingTokens from './clanker-trending-tokens';
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
      ) : (toolName === 'castSearch' || toolName === 'getUserCasts' || toolName === 'getTrendingCasts') ? (
        <Casts casts={result} />
      ) : toolName === 'getClankerTrendingTokens' ? (
        <ClankerTrendingTokens results={result} />
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
      ) : (toolName === 'castSearch' || toolName === 'getUserCasts' || toolName === 'getTrendingCasts') ? (
        <Casts />
      ) : toolName === 'getClankerTrendingTokens' ? (
        <ClankerTrendingTokens />
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
      className="w-full mb-6"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
    >
      {role === 'user' && (
        <h2 className="text-lg font-medium mb-2 break-words">{content}</h2>
      )}
      {role === 'assistant' && (
        <div className="w-full space-y-4">
          {content ? (
            <div className="prose prose-invert max-w-none break-words">
              <Markdown>{content as string}</Markdown>
            </div>
          ) : null}
          {toolInvocations && toolInvocations.length > 0 && (
            <div className="space-y-4 overflow-hidden">
              {toolInvocations.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;
                if (state === 'result') {
                  const { result } = toolInvocation;
                  return (
                    <div key={toolCallId} className="overflow-x-auto">
                      <Tool result={result} toolName={toolName} />
                    </div>
                  );
                }
                return <ToolPreview key={toolCallId} toolName={toolName} />;
              })}
            </div>
          )}
          {attachments && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {attachments.map((attachment) => (
                <PreviewAttachment
                  key={attachment.url}
                  attachment={attachment}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {role === 'assistant' && nextRole === 'user' && (
        <hr className="mt-6 border-t border-white/10" />
      )}
    </motion.div>
  );
};