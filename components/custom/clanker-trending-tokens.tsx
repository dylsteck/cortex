/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";

import { ToolResponse, ToolResponseHeader, ToolResponseBody, ToolResponseCard } from "./tool-response";

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

function FarcasterTokenItem({ pair }: { pair: ClankerTrendingTokensResponse['pairs'][0] }) {
    return (
        <ToolResponseCard height="h-[35vh]" onClick={() => window.open(`https://www.clanker.world/clanker/${pair.baseToken.address}`, "_blank")}>
            <div className="flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-4">
                    {pair.info.imageUrl && (
                        <img 
                            src={pair.info.imageUrl} 
                            alt={pair.baseToken.name} 
                            className="size-12 rounded-full"
                        />
                    )}
                    <div>
                        <h3 className="text-lg font-semibold">{pair.baseToken.name}</h3>
                        <p className="text-sm text-muted-foreground">{pair.baseToken.symbol}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-medium">Price (USD)</p>
                        <p>{pair.priceUsd}</p>
                    </div>
                    <div>
                        <p className="font-medium">24h Volume</p>
                        <p>${pair.volume.h24.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="font-medium">24h Change</p>
                        <p className={pair.priceChange.h24 >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {pair.priceChange.h24.toFixed(2)}%
                        </p>
                    </div>
                    <div>
                        <p className="font-medium">Market Cap</p>
                        <p>${pair.marketCap.toLocaleString()}</p>
                    </div>
                </div>
                {pair.info.websites && pair.info.websites.length > 0 && (
                    <div className="mt-4">
                            <p className="font-medium mb-2">Websites</p>
                            <div className="flex flex-row justify-between gap-2 mx-0.5">
                                <div className="space-y-1 space-x-2">
                                    {pair.info.websites.map((website, index) => (
                                        <a 
                                            key={index} 
                                            href={website.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {website.label}
                                        </a>
                                    ))}
                                </div>
                                <div>
                                    <a 
                                        href={`https://app.uniswap.org/swap?outputCurrency=${pair.baseToken.address}&chain=base`}
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Trade
                                    </a>
                                </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolResponseCard>
    );
}

export default function ClankerTrendingTokens({ results }: { results?: ClankerTrendingTokensResponse }) {
    if (!results || results.hasError) {
        return null;
    }

    return (
        <ToolResponse>
            <ToolResponseHeader text="Trending Tokens" />
            <ToolResponseBody>
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
                            <FarcasterTokenItem pair={pair} />
                        </motion.div>
                    ))}
                </motion.div>
            </ToolResponseBody>
        </ToolResponse>
    );
}