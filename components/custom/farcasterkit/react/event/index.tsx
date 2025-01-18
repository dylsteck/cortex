/* eslint-disable @next/next/no-img-element */
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { EventData } from "../../common/types/events";

function formatDate(
  startTimestamp: number,
  endTimestamp?: number,
  timeZoneAbbr?: string
) {
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
    return `${startDate} - ${endTime}`;
  }
  return `${startDate}`;
}

export function Event({ event }: { event: EventData }) {
  return (
    <div className="flex flex-col w-full h-[25vh]" onClick={() => window.open(`https://events.xyz/events/${event.id}`, '_blank')}>
      <div className="w-full h-2/5">
        <img
          src={event.image_url}
          alt={event.title}
          className="size-full object-cover"
        />
      </div>
      <div className="h-auto max-h-[45%] p-3 flex flex-col justify-between">
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
                className="flex items-center gap-2.5 ounded-full py-0.5 transition-colors"
              >
                <Avatar className="size-4 shrink-0 bg-transparent">
                  <AvatarImage src={host.pfp_url} alt={host.display_name} />
                  <AvatarFallback>
                    {host.display_name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
