import Image from "next/image";

import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

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
                <h2 className="text-lg font-semibold mb-4">Trending Tokens</h2>
                <ScrollArea className="w-full">
                    <div className="flex flex-row gap-4 pb-4">
                        {results.pairs.map((pair, index) => (
                            <Card key={index} className="shrink-0 h-[250px] w-[400px] p-4 flex flex-col">
                                <Image
                                    src={pair.info.imageUrl}
                                    alt={pair.baseToken.name}
                                    width={48}
                                    height={48}
                                    className="size-12 rounded-full mb-2"
                                />
                                <h3 className="text-lg font-bold line-clamp-1">
                                    {pair.baseToken.name} ({pair.baseToken.symbol})
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Price: ${pair.priceUsd} ({pair.priceNative} Native)
                                </p>
                                <div className="text-xs text-gray-500 mb-4">
                                    24h Change: {pair.priceChange.h24}% | Volume: ${pair.volume.h24.toLocaleString()}
                                </div>
                                <div className="flex justify-between mt-auto">
                                    <a
                                        href={pair.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-500 hover:underline"
                                    >
                                        View Pair
                                    </a>
                                    <a
                                        href={pair.info.websites[0]?.url || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-500 hover:underline"
                                    >
                                        More Info
                                    </a>
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