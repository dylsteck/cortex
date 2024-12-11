import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface FarcasterTokenProps {
  contractAddress: string;
  height?: string;
  width?: string;
}

export const FarcasterToken: React.FC<FarcasterTokenProps> = ({
  contractAddress,
  height = '500px',
  width = '100%'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const embedUrl = `https://www.geckoterminal.com/base/pools/${contractAddress}?embed=1&info=1&swaps=1&grayscale=0&light_chart=0`;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {isLoading && (
        <Skeleton 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: height,
            zIndex: 10
          }}
        />
      )}
      <iframe 
        src={embedUrl}
        onLoad={handleIframeLoad}
        style={{
          width: width,
          height: height,
          border: 'none',
          display: isLoading ? 'none' : 'block'
        }}
      />
    </motion.div>
  );
};