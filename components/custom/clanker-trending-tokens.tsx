import { motion } from "framer-motion";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { FarcasterToken } from "./app-builder/widgets/farcaster/tokens/farcaster-token";

type ClankerTrendingTokensResponse = {
    pairs: {
        chainId: string;
        dexId: string;
        url: string;
        pairAddress: string;
        labels: string[];
        baseToken: {
            address: string;
            name: string;
            symbol: string;
        };
        quoteToken: {
            address: string;
            name: string;
            symbol: string;
        };
        priceNative: string;
        priceUsd: string;
        txns: {
            m5: {
                buys: number;
                sells: number;
            };
            h1: {
                buys: number;
                sells: number;
            };
            h6: {
                buys: number;
                sells: number;
            };
            h24: {
                buys: number;
                sells: number;
            };
        };
        volume: {
            h24: number;
            h6: number;
            h1: number;
            m5: number;
        };
        priceChange: {
            m5: number;
            h1: number;
            h6: number;
            h24: number;
        };
        liquidity: {
            usd: number;
            base: number;
            quote: number;
        };
        fdv: number;
        marketCap: number;
        pairCreatedAt: number;
        info: {
            imageUrl: string;
            header: string;
            openGraph: string;
            websites: {
                label: string;
                url: string;
            }[];
            socials: {
                type: string;
                url: string;
            }[];
        };
    }[];
    hasError: boolean;
};

export default function ClankerTrendingTokens({ results }: { results?: ClankerTrendingTokensResponse }) {
    if (!results || results.hasError) {
        return (
            <div className="space-y-6 w-full">
                <ScrollArea className="w-full">
                    <div className="flex space-x-4 pb-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="shrink-0 h-[500px] w-[800px]" />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full">
            <div>
                <h2 className="text-lg font-semibold mb-4">Trending Tokens</h2>
                <ScrollArea className="w-full">
                    <motion.div 
                        className="flex flex-row gap-8 pb-4 overflow-x-auto"
                        style={{ 
                            display: 'flex', 
                            scrollSnapType: 'x mandatory', 
                            overscrollBehaviorX: 'contain',
                            justifyContent: 'center'
                        }}
                    >
                        {results.pairs.map((pair, index) => (
                            <motion.div 
                                key={index} 
                                className="shrink-0 snap-center"
                                style={{ 
                                    scrollSnapAlign: 'center',
                                    maxWidth: '800px',
                                    minWidth: '350px'
                                }}
                            >
                                <FarcasterToken 
                                    contractAddress={pair.baseToken.address}
                                    height="500px"
                                    width="100%"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}