import React from 'react';
import { z } from 'zod';

import FarcasterCast from './farcaster/farcaster-cast';
import FarcasterFeed from './farcaster/farcaster-feed';
import IcebreakerProfile from './icebreaker/icebreaker-profile';
import IcebreakerSocials from './icebreaker/icebreaker-socials';
import NounsBuilderProposals from './nouns-builder/nouns-builder-proposals';
import { TextWidget, textWidgetSchema } from './general/text';
import { ImageWidget, imageWidgetSchema } from './general/image';

export * from './widget';

export type App = {
    id: string;
    iconUrl: string;
    name: string;
    description: string;
}

export type Widget<T = any> = {
    id: string;
    appId: typeof APPS[number]['id']
    name: string;
    description: string;
    defaultParams?: T;
    paramsSchema?: z.ZodType<T>;
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
        preview: <TextWidget text="Example text widget" />,
        defaultParams: {
            text: 'Example text'
        },
        paramsSchema: textWidgetSchema
    },
    {
        id: 'general-image',
        appId: 'general',
        name: 'Image',
        description: 'Display an image from a URL',
        component: ImageWidget,
        preview: <ImageWidget imageUrl="https://i.imgur.com/uAvnFSF.png" />,
        defaultParams: {
            imageUrl: 'https://i.imgur.com/uAvnFSF.png'
        },
        paramsSchema: imageWidgetSchema
    },
    {
        id: 'farcaster-cast',
        appId: 'farcaster',
        name: 'Cast',
        description: 'View a cast given a url or hash',
        component: FarcasterCast,
        preview: <FarcasterCast castUrl="https://warpcast.com/dylsteck.eth/0x1f459eb2" />,
        defaultParams: {
            castUrl: 'https://warpcast.com/dylsteck.eth/0x1f459eb2'
        },
        paramsSchema: z.object({
            castUrl: z.string().url('Must be a valid Warpcast URL')
        })
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
        })
    },
    {
        id: 'icebreaker-profile',
        appId: 'icebreaker',
        name: 'Profile',
        description: 'View network info per a fid',
        component: IcebreakerProfile,
        preview: <IcebreakerProfile fid="616" />,
        defaultParams: {
            fid: '616'
        },
        paramsSchema: z.object({
            fid: z.string().min(1, 'FID is required')
        })
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
        })
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
        })
    }
];