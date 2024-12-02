"use client"
import { motion } from 'framer-motion';

import { ChatHeader } from '@/components/custom/chat-header';
import { CortexIcon } from '@/components/custom/icons';

export default function Page() {
  return(
    <div>
      <ChatHeader />
      <motion.div
        key="homepage"
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
        </div>
      </motion.div>
    </div>
  );
}
