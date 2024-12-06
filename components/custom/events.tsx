/* eslint-disable @next/next/no-img-element */
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

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
  display_tz: string;
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
  cover_url?: string;
  location?: {
    address: {
      city: string;
      state: string;
    };
  };
  tags?: string[];
}

function EventSkeleton() {
  return (
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
  );
}

function Event({ event }: { event: EventData }) {
  const formatDate = (
    startTimestamp: number,
    endTimestamp?: number,
    timeZoneAbbr?: string
  ) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const startDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date(startTimestamp)
    );

    if (endTimestamp) {
      const endTimeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const endTime = new Intl.DateTimeFormat("en-US", endTimeOptions).format(
        new Date(endTimestamp)
      );
      // return `${startDate} - ${endTime} ${timeZoneAbbr || ""}`;
      return `${startDate} - ${endTime}`;
    }
    // return `${startDate} ${timeZoneAbbr || ""}`;
    return `${startDate}`;
  };

  return (
    <Card className="w-[300px] h-[380px] hover:shadow-lg transition-shadow duration-200 rounded-xl overflow-hidden">
      <div className="w-full h-[55%]">
        <img
          src={event.image_url}
          alt={event.title}
          className="size-full object-cover"
        />
      </div>
      <div className="h-[45%] p-3 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base leading-tight truncate">
            {event.title}
          </h3>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-3.5 shrink-0" />
              <span className="text-wrap text-xs">
                {formatDate(event.start_date, event.end_date, event.display_tz)}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1">
                <MapPinIcon className="size-3.5 shrink-0" />
                <span className="truncate">{`${event.location.address.city}, ${event.location.address.state}`}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {event.hosts.map((host) => (
              <a
                key={host.fid}
                href={`https://warpcast.com/${host.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-muted/50 hover:bg-muted rounded-full px-2 py-0.5 transition-colors"
              >
                <Avatar className="size-4 shrink-0">
                  <AvatarImage src={host.pfp_url} alt={host.display_name} />
                  <AvatarFallback>
                    {host.display_name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs truncate max-w-[100px]">
                  {host.display_name}
                </span>
              </a>
            ))}
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {event.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <a
          href={`https://events.xyz/events/${event.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
        >
          View on Events.xyz
        </a>
      </div>
    </Card>
  );
}

export const Events = ({ events }: { events?: EventData[] }) => {
  if (!events) {
    return (
      <div className="-mx-3">
        <ScrollArea>
          <div className="flex gap-3 px-3 pb-3">
            <div className="w-[280px] flex-none">
              <EventSkeleton />
            </div>
            <div className="w-[280px] flex-none">
              <EventSkeleton />
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="-mx-3">
      <ScrollArea>
        <div className="flex gap-3 px-3 pb-3">
          {events.map((event) => (
            <div key={event.id} className="w-[280px] flex-none">
              <Event event={event} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};