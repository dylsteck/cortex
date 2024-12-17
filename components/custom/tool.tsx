import { motion } from 'framer-motion';

import { FarcasterBounties } from './app-builder/widgets/farcaster/bounties/farcaster-bounties';
import { FarcasterEvent, FarcasterEvents } from './app-builder/widgets/farcaster/events/farcaster-events';
import { FarcasterLivestreams } from './app-builder/widgets/farcaster/streams/farcaster-livestream';
import { Casts } from './casts';
import ClankerTrendingTokens from './clanker-trending-tokens';
import IcebreakerProfile from './icebreaker-profile';
import { Weather } from './weather';
import { WebResults } from './web-results';
import WowTrendingTokens from './wow-trending-tokens';
import { Skeleton } from '../ui/skeleton';
import EthTimeline from './app-builder/widgets/ethereum/eth-timeline';
import NounsBuilderProposals from './app-builder/widgets/nouns-builder/nouns-builder-proposals';

export const Tool = ({ result, toolName }: {result: any, toolName: string}) => {
    return (
      <div>
        {toolName === 'getWeather' ? (
          <Weather weatherAtLocation={result} />
        ) : (toolName === 'castSearch' || toolName === 'getUserCasts' || toolName === 'getTrendingCasts' || toolName === 'getChannelsCasts') ? (
          <Casts casts={result} />
        ) : toolName === 'getWowTrendingTokens' ? (
          <WowTrendingTokens results={result} />
        ) : toolName === 'getClankerTrendingTokens' ? (
          <ClankerTrendingTokens results={result} />
        ) : toolName === 'getEvent' ? (
          <FarcasterEvent event={result} />
        ) : toolName === 'getEvents' ? (
          <FarcasterEvents events={result} />
        ) : toolName === 'getBounties' ? (
          <FarcasterBounties bounties={result} />
        ) : toolName === 'getLivestreams' ? (
          <FarcasterLivestreams livestreams={result} />
        ) : toolName === 'webSearch' ? (
          <WebResults results={result} />
        ) : toolName === 'getEthAddressTimeline' ? (
          <EthTimeline timeline={result} />
        ) : (toolName === 'getIcebreakerFCUser' || 
             toolName === 'getIcebreakerEthProfile' || 
             toolName === 'getIcebreakerCredentialProfiles') ? (
          <IcebreakerProfile profile={result} />
        ) : toolName === 'getNounsBuilderProposals' ? (
          <NounsBuilderProposals proposals={result} />
        ) : toolName === 'askNeynarDocs' ? (
          <Skeleton className="w-full h-auto" />
        ) : <Skeleton className="w-full h-auto" /> }
      </div>
    );
  }
  
export const ToolPreview = ({ toolName }: {toolName: string}) => {
  return (
    <div className="relative bg-zinc-950/50 rounded-xl p-4 overflow-hidden">
      <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
        <motion.div
          className='absolute aspect-square bg-zinc-500'
          style={{
            width: 60,
            offsetPath: 'rect(0 auto auto 0 round 60px)',
          }}
          animate={{
            offsetDistance: ['0%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'linear',
          }}
        />
      </div>
      <div className="relative z-10 space-y-4">
        <motion.h2
          className="relative inline-block text-lg font-medium text-zinc-600 dark:text-zinc-300"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ backgroundPosition: '100% 0' }}
          animate={{ 
            backgroundPosition: ['100% 0', '-100% 0'],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          Searching Farcaster...
        </motion.h2>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-xl" />
      </div>
    </div>
  );
}