import { CalendarIcon, ExternalLinkIcon } from "lucide-react"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Bounty } from "@/lib/types"

export function FarcasterBountySkeleton() {
  return (
    <Card className="w-[300px] md:w-[400px] h-[450px] md:h-[500px] flex flex-col shrink-0">
      <CardHeader className="flex-none">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-y-auto">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function FarcasterBounty({ bounty }: { bounty: Bounty }) {
  const hasReward = bounty.reward_summary?.token?.symbol && bounty.reward_summary?.unit_amount;

  return (
    <Card className="w-[300px] md:w-[400px] flex flex-col shrink-0">
      <CardHeader className="flex-none pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">
              <a href={bounty.links.external} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {bounty.title}
              </a>
            </CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              {hasReward && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {bounty.reward_summary?.token?.symbol} {bounty.reward_summary?.unit_amount}
                  {bounty.reward_summary?.usd_value && ` ($${bounty.reward_summary.usd_value})`}
                </Badge>
              )}
              <Badge variant="outline" className={
                bounty.current_state === "active" ? "text-blue-600 border-blue-600" :
                bounty.current_state === "completed" ? "text-green-600 border-green-600" :
                "text-gray-600 border-gray-600"
              }>
                {bounty.current_state}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <CalendarIcon className="size-4" />
            <span>{new Date(bounty.expiration_date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 relative pb-0">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={bounty.poster.profile_picture} alt={bounty.poster.display_name} />
            <AvatarFallback>{bounty.poster.display_name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{bounty.poster.display_name}</div>
            <div className="text-sm text-gray-500">@{bounty.poster.short_name}</div>
          </div>
        </div>
        <div className="max-h-[120px] overflow-y-auto text-sm text-gray-600 dark:text-gray-300">
          {bounty.summary_text}
        </div>
        <div className="flex flex-wrap gap-2 pb-8">
          {bounty.tag_slugs.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <a 
          href={`https://bountycaster.xyz/bounty/${bounty.uid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-1 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <ExternalLinkIcon className="size-4" />
        </a>
      </CardContent>
    </Card>
  )
}

export function FarcasterBounties({ bounties }: { bounties?: Bounty[] }) {
  if (!bounties) {
    return (
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {[...Array(3)].map((_, i) => (
          <FarcasterBountySkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 p-1">
        {bounties.map((bounty) => (
          <FarcasterBounty key={bounty.uid} bounty={bounty} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}