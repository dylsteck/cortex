/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import Frame from './frame';

interface Host {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  custody_address?: string;
  follower_count?: number;
  following_count?: number;
  verified_addresses?: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
  verified_accounts?: {
    platform: string;
    username: string;
  }[];
  power_badge?: boolean;
  location?: {
    latitude: number;
    longitude: number;
    address: {
      city: string;
      state: string;
      state_code: string;
      country: string;
      country_code: string;
    };
  };
  profile?: {
    bio: {
      text: string;
    };
  };
}

interface EventData {
  id: string;
  title: string;
  start_date: number;
  end_date: number;
  frame_display_time?: string;
  hosts: Host[];
  image_url?: string;
  description?: string;
  time_zone?: string;
  time_zone_full?: string;
  city?: boolean;
  going_count?: number;
  capacity?: number;
  palette?: {
    color?: string;
    fill?: string;
    accent_border?: string;
    border_color?: string;
    background?: string;
    accent?: string;
    accent_font?: {
      style?: {
        fontFamily?: string;
        fontStyle?: string;
      };
      className?: string;
    };
    text_font?: {
      style?: {
        fontFamily?: string;
        fontStyle?: string;
      };
      className?: string;
    };
  };
  channel?: {
    id?: string;
    url?: string;
    name?: string;
    image_url?: string;
    header_image_url?: string;
    external_link?: {
      title?: string;
      url?: string;
    };
    description?: string;
    public_casting?: boolean;
    follower_count?: number;
    member_count?: number;
    pinned_cast_hash?: string;
    created_at?: number;
    parent_url?: string;
    moderator_fids?: number[];
    lead?: Host;
  };
  context?: {
    is_online?: boolean;
    is_pinned?: boolean;
    is_shared?: boolean;
    is_ended?: boolean;
    is_started?: boolean;
    is_today?: boolean;
    is_going?: boolean;
    is_applied?: boolean;
    is_attended?: boolean;
  };
}

function EventSkeleton(){
  return(
    <Card className="shrink-0 max-h-[350px] w-[400px] p-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <Skeleton className="h-[200px] w-full" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </Card>
  )
}

function Event({ event }: { event: EventData }){
  return (
    <div className="min-w-[30vw] w-auto">
      <Frame url={`https://events.xyz/events/${event.id}`} />
    </div>
  )
}

export function Events({ events }: { events?: EventData[] }) {
  if (!events) {
    return (
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {[1, 2, 3].map((i) => (
            <EventSkeleton key={i}  />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4">
        {events.map((event, index) => {
          return <Event key={`frame-${index}`} event={event} />
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}