/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Host {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
}

interface EventData {
  id: string;
  title: string;
  start_date: number;
  end_date: number;
  frame_display_time: string;
  hosts: Host[];
  image_url: string;
}

export function Events({ events }: { events?: EventData[] }) {
  if (!events) {
    return (
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shrink-0 max-h-[350px] w-[400px] p-4">
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
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4">
        {events.map((event) => (
          <Card key={event.id} className="shrink-0 max-h-[350px] w-[400px] overflow-hidden">
            <img src={event.image_url} alt={event.title} className="h-48 w-full object-cover" />
            <div className="p-4 space-y-2">
              <div className="text-lg font-semibold">{event.title}</div>
              <div className="text-sm text-gray-500">{event.frame_display_time}</div>
              <div className="flex items-center space-x-2 mt-2">
                {event.hosts.map((host) => (
                  <img key={host.fid} src={host.pfp_url} alt={host.display_name} className="size-8 rounded-full" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}