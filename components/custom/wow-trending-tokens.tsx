import Image from "next/image";

import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

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
                            <Card key={i} className="shrink-0 h-[200px] w-[400px] p-4">
                                <div className="space-y-4">
                                    <Skeleton className="h-4 w-[300px]" />
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-[100px] w-full" />
                                    <Skeleton className="h-4 w-[100px]" />
                                </div>
                            </Card>
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
                    <div className="flex flex-row gap-4 pb-4">
                        {results.data.wowTrending.edges.map(({ node }, index) => (
                            <Card key={index} className="shrink-0 h-[250px] w-[400px] p-4 flex flex-col">
                                <Image
                                    src={node.image.medium}
                                    alt={node.name}
                                    width={48}
                                    height={48}
                                    className="size-12 rounded-full mb-2"
                                />
                                <h3 className="text-lg font-bold line-clamp-1">
                                    {node.name} ({node.symbol})
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Price: ${parseFloat(node.usdPrice).toFixed(6)}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                    {node.description}
                                </p>
                                <div className="text-xs text-gray-500 mb-4">
                                    Market Cap: ${parseFloat(node.marketCap).toLocaleString()}
                                </div>
                                <div className="flex justify-between mt-auto">
                                    <a
                                        href={`https://wow.xyz/token/${node.address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-500 hover:underline"
                                    >
                                        View Token
                                    </a>
                                    {node.socialLinks.website && (
                                        <a
                                            href={node.socialLinks.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-500 hover:underline"
                                        >
                                            Website
                                        </a>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
} 