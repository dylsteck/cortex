import React from 'react';

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

export type Widget = {
    id: string;
    appId: typeof APPS[number]['id']
    component: React.ReactNode;
    name: string;
    description: string;
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
        description: 'Mints, swaps, and more onchain widgets'
    }
]

export const WIDGETS: Widget[] = [
    {
        id: 'farcaster-cast',
        appId: 'farcaster',
        component: <FarcasterCast />,
        name: 'Cast',
        description: 'View a cast given a url or hash'
    },
    {
        id: 'icebreaker-profile',
        appId: 'icebreaker',
        component: <IcebreakerProfile />,
        name: 'Profile',
        description: 'View network info per a fid'
    },
    {
        id: 'icebreaker-socials',
        appId: 'icebreaker',
        component: <IcebreakerSocials />,
        name: 'Socials',
        description: 'View social profiles per a fid'
    }
]