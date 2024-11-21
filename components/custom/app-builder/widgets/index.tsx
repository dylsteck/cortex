import React from 'react';

import IcebreakerProfile from './icebreaker/icebreaker-profile';


export * from './widget';

export type App = {
    id: string;
    icon: React.ReactNode;
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
    // {
    //     id: 'farcaster',
    //     icon: <Sparkles className="size-6" />,
    //     name: 'Farcaster',
    //     description: 'A decentralized social protocol'
    // },
    {
        id: 'icebreaker',
        icon: <div className="size-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg mr-3" />,
        name: 'Icebreaker',
        description: 'The open professional network'
    },
    // {
    //     id: 'zora',
    //     icon: <Sparkles className="size-6" />,
    //     name: 'Zora',
    //     description: 'A social minting protocol'
    // }
]

export const WIDGETS: Widget[] = [
    {
        id: 'icebreaker-profile',
        appId: 'icebreaker',
        component: <IcebreakerProfile />,
        name: 'Profile',
        description: 'View network info per a fid'
    }
]