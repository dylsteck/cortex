/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const PreviewBadge = ({ title, images }: { title: string, images: string[] }) => {
  return (
    <Badge variant="secondary" className="h-9 gap-2 px-4 bg-zinc-900 text-white hover:bg-zinc-900">
      <div className="flex -space-x-2">
        {images.slice(0,4).map((image, index) => (
          <Avatar key={index} className="size-5 border border-black">
            <AvatarImage src={image} />
            <AvatarFallback>{index}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className="text-sm">{title}</span>
    </Badge>
  )
}

export function ToolResponseNew({ 
  title,
  images
}: {
  title: string,
  images: string[],
}){
  // todo: pass list or iterable for items
  return <PreviewBadge title={title} images={images} />
}

export function ToolResponse({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}

export function ToolResponseHeader({ text }: { text: string }) {
  if(typeof text === 'undefined' || text.length === 0){
    return null
  }
  return (
    <h2 className="text-lg font-medium mb-2.5">
      {text}
    </h2>
  );
}

export function ToolResponseBody({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex space-x-4 pb-4">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function ToolResponseCard({ children, onClick, height }: { children: React.ReactNode; onClick?: () => void; height?: string }) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the click target is the card itself or a non-interactive child
    const target = e.target as HTMLElement;
    const isInteractiveElement = target.closest('button, a, input, [onclick], [role="button"]');
    if (!isInteractiveElement && onClick) {
      onClick();
    }
  };

  return (
    <Card
      className={`shrink-0 size-auto w-[400px] ${height ? height : "max-h-[20vh] sm:max-h-[22.5vh]"} overflow-y-hidden text-sm p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-0 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors`}
      onClick={handleCardClick}
    >
      {children}
    </Card>
  );
}