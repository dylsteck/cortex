import React from 'react';

import IcebreakerProfile from './icebreaker/icebreaker-profile';
import IcebreakerSocials from './icebreaker/icebreaker-socials';
import FarcasterFeed from './farcaster/farcaster-feed';

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
    }
]

export const WIDGETS: Widget[] = [
    // {
    //     id: 'farcaster-feed',
    //     appId: 'farcaster',
    //     component: <FarcasterFeed />,
    //     name: 'Feed',
    //     description: 'View a cast feed given a set of parameters'
    //     // note: stock feeeds or ton of params? we'll see
    // },
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