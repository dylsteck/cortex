import React from 'react';
import { z } from 'zod';

import FarcasterCast from './farcaster/farcaster-cast';
import IcebreakerProfile from './icebreaker/icebreaker-profile';
import IcebreakerSocials from './icebreaker/icebreaker-socials';

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
        id: 'icebreaker-profile',
        appId: 'icebreaker',
        name: 'Profile',
        description: 'View network info per a fid',
        component: IcebreakerProfile,
        preview: <IcebreakerProfile />
    },
    {
        id: 'icebreaker-socials',
        appId: 'icebreaker',
        name: 'Socials',
        description: 'View social profiles per a fid',
        component: IcebreakerSocials,
        preview: <IcebreakerSocials />
    }
];