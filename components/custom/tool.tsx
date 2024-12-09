import { FarcasterBounties } from './app-builder/widgets/farcaster/bounties/farcaster-bounties';
import { FarcasterEvent, FarcasterEvents } from './app-builder/widgets/farcaster/events/farcaster-events';
import { Casts } from './casts';
import ClankerTrendingTokens from './clanker-trending-tokens';
import { Weather } from './weather';
import { WebResults } from './web-results';
import { Skeleton } from '../ui/skeleton';

export const Tool = ({ result, toolName }: {result: any, toolName: string}) => {
    return (
      <div>
        {toolName === 'getWeather' ? (
          <Weather weatherAtLocation={result} />
        ) : (toolName === 'castSearch' || toolName === 'getUserCasts' || toolName === 'getTrendingCasts') ? (
          <Casts casts={result} />
        ) : toolName === 'getClankerTrendingTokens' ? (
          <ClankerTrendingTokens results={result} />
        ) : toolName === 'getEvent' ? (
          <FarcasterEvent event={result} />
        ) : toolName === 'getEvents' ? (
          <FarcasterEvents events={result} />
        ) : toolName === 'getBounties' ? (
          <FarcasterBounties bounties={result} />
        ) : toolName === 'webSearch' ? (
          <WebResults results={result} />
        )
        : <Skeleton className="w-full h-auto" /> }
      </div>
    );
  }
  
export const ToolPreview = ({ toolName }: {toolName: string}) => {
    return (
      <div className="skeleton">
        {toolName === 'getWeather' ? (
          <Weather />
        ) : (toolName === 'castSearch' || toolName === 'getUserCasts' || toolName === 'getTrendingCasts') ? (
          <Casts />
        ) : toolName === 'getClankerTrendingTokens' ? (
          <ClankerTrendingTokens />
        ) : toolName === 'getEvent' ? (
            <FarcasterEvent />
        ) : toolName === 'getEvents' ? (
          <FarcasterEvents />
        ) : toolName === 'getBounties' ? (
          <FarcasterBounties />
        ) : toolName === 'webSearch' ? (
          <WebResults />
        ) : <Skeleton className="w-full h-auto" />}
      </div>
    );
}