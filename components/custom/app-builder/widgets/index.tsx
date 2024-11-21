import { Sparkles } from 'lucide-react';
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
        icon: <Sparkles className="size-6" />,
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
        component: <IcebreakerProfile />,
        name: 'Profile',
        description: 'View network info per a fid'
    }
]