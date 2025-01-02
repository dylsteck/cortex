import React from 'react';
import { z } from 'zod';

import NFTMintWidget from './ethereum/mint';
import { TokenDeployerWidget } from './ethereum/token-deployer';
import FarcasterFeed from './farcaster/farcaster-feed';
import { ImageWidget, imageWidgetSchema } from './general/image';
import { TextWidget, textWidgetSchema } from './general/text';
import IcebreakerSocials from './icebreaker/icebreaker-socials';
import NounsBuilderProposals from './nouns-builder/nouns-builder-proposals';

export * from './widget';

export type App = {
    id: string;
    iconUrl: string;
    name: string;
    description: string;
}

export type ParamMetadata = {
    label: string;
    description?: string;
    placeholder?: string;
}

export type Widget<T = any> = {
    id: string;
    appId: typeof APPS[number]['id']
    name: string;
    description: string;
    defaultParams?: T;
    paramsSchema?: z.ZodType<T>;
    paramsMetadata?: Record<string, ParamMetadata>;
    preview: React.ReactNode;
    component: React.ComponentType<T>;
}

export const APPS: App[] = [
    {
        id: 'general',
        iconUrl: 'https://i.imgur.com/uAvnFSF.png',
        name: 'General',
        description: 'Essentials such as text and navigation'
    },
    {
        id: 'farcaster',
        iconUrl: 'https://i.imgur.com/I2rEbPF.png',
        name: 'Farcaster',
        description: 'A social protocol with a social economy'
    },
    {
        id: 'icebreaker',
        iconUrl: 'https://i.imgur.com/JZMb574.jpg',
        name: 'Icebreaker',
        description: 'The open professional network'
    },
    {
        id: 'nouns-builder',
        iconUrl: 'https://i.imgur.com/PUPG9N5.png',
        name: 'Nouns Builder',
        description: 'A tool for creating Nounish DAOs on Ethereum'
    },
    {
        id: 'onchain',
        iconUrl: 'https://i.imgur.com/KaDZOjF.png',
        name: 'Onchain',
        description: 'Build with onchain data'
    }
];

export const WIDGETS = [
    {
        id: 'general-text',
        appId: 'general',
        name: 'Text',
        description: 'Add text content with consistent styling',
        component: TextWidget,
        preview: <TextWidget text="Add note..." />,
        defaultParams: {
            text: 'Add note...'
        },
        paramsSchema: textWidgetSchema,
        paramsMetadata: {
            text: {
                label: 'Text Content',
                description: 'The text content to display',
                placeholder: 'Enter your text here'
            }
        }
    },
    {
        id: 'general-image',
        appId: 'general',
        name: 'Image',
        description: 'Display an image from a URL',
        component: ImageWidget,
        preview: <ImageWidget imageUrl="https://i.imgur.com/Pwf5x4V.png" />,
        defaultParams: {
            imageUrl: 'https://i.imgur.com/Pwf5x4V.png'
        },
        paramsSchema: imageWidgetSchema,
        paramsMetadata: {
            imageUrl: {
                label: 'Image URL',
                description: 'The URL of the image to display',
                placeholder: 'https://example.com/image.jpg'
            }
        }
    },
    {
        id: 'farcaster-feed',
        appId: 'farcaster',
        name: 'Feed',
        description: 'View casts from a specific user',
        component: FarcasterFeed,
        preview: <FarcasterFeed fid="616" />,
        defaultParams: {
            fid: '616'
        },
        paramsSchema: z.object({
            fid: z.string().min(1, 'FID is required')
        }),
        paramsMetadata: {
            fid: {
                label: 'Farcaster ID',
                description: 'The Farcaster ID (FID) of the user',
                placeholder: '616'
            }
        }
    },
    {
        id: 'icebreaker-socials',
        appId: 'icebreaker',
        name: 'Socials',
        description: 'View social profiles per a fid',
        component: IcebreakerSocials,
        preview: <IcebreakerSocials fid="616" />,
        defaultParams: {
            fid: '616'
        },
        paramsSchema: z.object({
            fid: z.string().min(1, 'FID is required')
        }),
        paramsMetadata: {
            fid: {
                label: 'Farcaster ID',
                description: 'The Farcaster ID (FID) to show social profiles for',
                placeholder: '616'
            }
        }
    },
    {
        id: 'nouns-builder-proposals',
        appId: 'nouns-builder',
        name: 'Proposals',
        description: 'View proposals for a Nouns Builder DAO',
        component: NounsBuilderProposals,
        preview: <NounsBuilderProposals contractAddress="0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60" />,
        defaultParams: {
            contractAddress: '0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60'
        },
        paramsSchema: z.object({
            contractAddress: z.string().min(42, 'Must be a valid Ethereum address').max(42, 'Must be a valid Ethereum address')
        }),
        paramsMetadata: {
            contractAddress: {
                label: 'Contract Address',
                description: 'The Ethereum address of the Nouns Builder DAO contract',
                placeholder: '0x...'
            }
        }
    },
    {
        id: 'nft-mint',
        appId: 'onchain',
        name: 'NFT Mint',
        description: 'A widget for minting NFTs',
        component: NFTMintWidget,
        preview: <NFTMintWidget contractAddress="0x74896e049d124ac8e578a72b3fc16f7fe6aa849e" />,
        defaultParams: {
            contractAddress: '0x74896e049d124ac8e578a72b3fc16f7fe6aa849e'
        },
        paramsSchema: z.object({
            contractAddress: z.string().min(42, 'Must be a valid Ethereum address').max(42, 'Must be a valid Ethereum address')
        }),
        paramsMetadata: {
            contractAddress: {
                label: 'Contract Address',
                description: 'The Ethereum address of the NFT contract',
                placeholder: '0x...'
            }
        }
    },
    {
        id: 'token-deployer',
        appId: 'onchain',
        name: 'Token Deployer',
        description: 'Deploy a custom token with image and metadata',
        component: TokenDeployerWidget,
        preview: <TokenDeployerWidget platform="clanker" />,
        defaultParams: {
            platform: 'clanker'
        },
        paramsSchema: z.object({
            platform: z.enum(['clanker', 'wow']).optional()
        }),
        paramsMetadata: {
            platform: {
                label: 'Platform',
                description: 'The platform to deploy the token on',
                placeholder: 'clanker'
            }
        }
    }
];