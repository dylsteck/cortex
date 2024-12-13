import { FarcasterBounties } from './app-builder/widgets/farcaster/bounties/farcaster-bounties';
import { FarcasterEvent, FarcasterEvents } from './app-builder/widgets/farcaster/events/farcaster-events';
import { FarcasterLivestreams, FarcasterLivestreamsWrapper } from './app-builder/widgets/farcaster/streams/farcaster-livestream';
import { Casts } from './casts';
import ClankerTrendingTokens from './clanker-trending-tokens';
import IcebreakerProfile from './icebreaker-profile';
import { Weather } from './weather';
import { WebResults } from './web-results';
import WowTrendingTokens from './wow-trending-tokens';
import { Skeleton } from '../ui/skeleton';
import EthTimeline from './app-builder/widgets/ethereum/eth-timeline';

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
        ) : <Skeleton className="w-full h-auto" /> }
      </div>
    );
  }
  
export const ToolPreview = ({ toolName }: {toolName: string}) => {
    return (
      <div className="skeleton">
        {toolName === 'getWeather' ? (
          <Weather />
        ) : (toolName === 'castSearch' || toolName === 'getUserCasts' || toolName === 'getTrendingCasts' || toolName === 'getChannelsCasts') ? (
          <Casts />
        ) : toolName === 'getWowTrendingTokens' ? (
            <WowTrendingTokens />
        ) : toolName === 'getClankerTrendingTokens' ? (
          <ClankerTrendingTokens />
        ) : toolName === 'getEvent' ? (
            <FarcasterEvent />
        ) : toolName === 'getEvents' ? (
          <FarcasterEvents />
        ) : toolName === 'getBounties' ? (
          <FarcasterBounties />
        ) : toolName === 'getLivestreams' ? (
          <FarcasterLivestreamsWrapper />
        ) : toolName === 'webSearch' ? (
          <WebResults />
        ) : toolName === 'getEthAddressTimeline' ? (
          <EthTimeline />
        ) 
        // : (toolName === 'getIcebreakerFCUser' || 
        //      toolName === 'getIcebreakerEthProfile' || 
        //      toolName === 'getIcebreakerCredentialProfiles') ? (
        //   <IcebreakerProfile />
        // ) 
        : <Skeleton className="w-full h-auto" />}
      </div>
    );
}