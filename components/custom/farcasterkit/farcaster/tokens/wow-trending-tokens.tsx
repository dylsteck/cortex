import { motion } from "framer-motion";

import { FarcasterToken } from "./farcaster-token";
import { ScrollArea, ScrollBar } from "../../../../ui/scroll-area";
import { Skeleton } from "../../../../ui/skeleton";

type WowTrendingTokensResponse = {
    data: {
        wowTrending: {
            edges: {
                node: {
                    name: string;
                    address: string;
                    chainId: string;
                    description: string;
                    creator: {
                        avatar: {
                            small: string;
                        };
                        handle: string;
                        walletAddress: string;
                    };
                    hasGraduated: boolean;
                    image: {
                        mimeType: string;
                        originalUri: string;
                        medium: string;
                    };
                    video?: {
                        mimeType: string;
                        originalUri: string;
                    };
                    usdPrice: string;
                    symbol: string;
                    totalSupply: string;
                    marketCap: string;
                    blockTimestamp: string;
                    nsfw: boolean;
                    socialLinks: {
                        twitter?: string;
                        discord?: string;
                        website?: string;
                        telegram?: string;
                    };
                };
                cursor: string;
            }[];
            pageInfo: {
                hasNextPage: boolean;
                hasPreviousPage: boolean;
                startCursor: string;
                endCursor: string;
            };
            count: number;
        };
    };
};

export default function WowTrendingTokens({ results }: { results?: WowTrendingTokensResponse }) {
    if (!results || !results.data?.wowTrending?.edges) {
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
                <h2 className="text-lg font-semibold mb-4">Trending Wow Tokens</h2>
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
                        {results.data.wowTrending.edges.map(({ node }, index) => (
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
                                    contractAddress={node.address}
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