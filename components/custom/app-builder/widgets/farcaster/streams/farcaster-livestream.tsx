import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { StreammStream } from '@/lib/types';

const FallbackImage = () => (
  <div className="w-full h-[158px] bg-gray-200 flex items-center justify-center">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="size-12 text-gray-500" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
  </div>
);

export const FarcasterLivestreams: React.FC<{ livestreams?: StreammStream[] }> = ({ livestreams }) => {
  const liveStreams = livestreams?.filter(stream => stream.isLive) || [];

  if (!liveStreams.length) {
    return (
      <div className="text-center text-muted-foreground py-4 w-full">
        No live streams available
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4 overflow-x-auto">
        {liveStreams.map((stream) => (
          <Card 
            key={stream.streamId} 
            className="w-[280px] shrink-0 hover:shadow-lg transition-shadow duration-300 relative"
          >
            <CardContent className="p-0">
              <div className="relative">
                {stream.thumbnailId ? (
                  <Image
                    src={`https://image.livepeer.studio/thumbnail/${stream.thumbnailId}`}
                    alt={stream.streamTitle}
                    width={280}
                    height={158}
                    className="w-full h-[158px] object-cover rounded-t-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                {!stream.thumbnailId && <FallbackImage />}
                <Badge 
                  variant="destructive" 
                  className="absolute top-2 right-2"
                >
                  LIVE
                </Badge>
              </div>
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  {stream.tokenDetails?.imageUrl && (
                    <Image
                      src={stream.tokenDetails.imageUrl}
                      alt={stream.tokenDetails.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-sm truncate max-w-[200px]">
                      {stream.streamTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {stream.creatorAddress.slice(0, 6)}...{stream.creatorAddress.slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">
                      {stream.likes} likes
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {stream.tokenDetails && (
                      <Badge 
                        variant="outline" 
                        className="text-[10px] px-1.5"
                      >
                        {stream.tokenDetails.ticker}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <Link 
              href={`https://streamm.tv/live/${stream.creatorId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white/90 transition-colors"
            >
              <ExternalLinkIcon className="size-4 text-gray-700" />
            </Link>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const FarcasterLivestreamsLoading: React.FC = () => (
  <div className="flex space-x-4 overflow-x-auto">
    {[...Array(4)].map((_, index) => (
      <Skeleton key={index} className="w-[280px] h-[250px] shrink-0" />
    ))}
  </div>
);

export const FarcasterLivestreamsWrapper: React.FC = () => (
  <div className="w-full">
    <Skeleton className="w-full h-[400px]" />
  </div>
);
