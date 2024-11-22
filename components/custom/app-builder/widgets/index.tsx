import React from 'react';

import IcebreakerProfile from './icebreaker/icebreaker-profile';


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
        id: 'icebreaker',
        iconUrl: 'https://i.imgur.com/JZMb574.jpg',
        name: 'Icebreaker',
        description: 'The open professional network'
    }
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