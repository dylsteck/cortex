import { type ChatRequestOptions, type CreateMessage, type Message } from 'ai';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { CortexIcon } from './icons';
import { SuggestedActions } from './suggested-actions';

export const Overview = ({ append }: { append: (
  message: Message | CreateMessage,
  chatRequestOptions?: ChatRequestOptions
) => Promise<string | null | undefined>;}) => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-4 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-1 items-center">
          <CortexIcon size={40} />
          <span className="text-2xl font-semibold">Cortex</span>
        </p>
        <SuggestedActions onActionSelect={async(suggestedAction: string) => {
          append({
            role: 'user',
            content: suggestedAction,
          });
        }} />
      </div>
    </motion.div>
  )
};