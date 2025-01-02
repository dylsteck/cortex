import Image from 'next/image';
import React from 'react';

import { ToolResponse, ToolResponseHeader, ToolResponseBody, ToolResponseCard } from '@/components/custom/tool-response';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { IcebreakerChannel, IcebreakerCredential, IcebreakerProfile as IcebreakerProfileType } from '@/lib/types';
import { USER_FALLBACK_IMG_URL } from '@/lib/utils';

interface IcebreakerProfileProps {
  profile: IcebreakerProfileType;
  title?: string;
}

export default function IcebreakerProfile({ profile, title = `Icebreaker Profile: ${profile.displayName || 'Unknown'}` }: IcebreakerProfileProps) {
  return (
    <ToolResponse>
      <ToolResponseHeader text={title} />
      <ToolResponseBody>
        <ToolResponseCard height="h-auto min-h-[150px]" onClick={() => window.open(`https://app.icebreaker.xyz/profiles/${profile.profileID}`, '_blank')}>
          <div className="flex items-center space-x-4">
            <Avatar className="size-16">
              <AvatarImage 
                src={profile.avatarUrl ? profile.avatarUrl : USER_FALLBACK_IMG_URL} 
                alt={`${profile.displayName}'s profile picture`} 
              />
              <AvatarFallback>{profile.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-semibold">{profile.displayName}</div>
              {profile.bio && (
                <div 
                  className="text-sm text-muted-foreground break-words 
                             whitespace-normal line-clamp-2 
                             max-h-20 overflow-hidden"
                >
                  {profile.bio}
                </div>
              )}
            </div>
          </div>
          
          {(profile.credentials && profile.credentials.length > 0) || (profile.channels && profile.channels.length > 0) ? (
            <div>
              {profile.credentials && profile.credentials.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">Credentials</div>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-2">
                      {profile.credentials.map((cred: IcebreakerCredential, index: number) => (
                        <div 
                          key={index} 
                          className="bg-neutral-200 dark:bg-neutral-800 px-3 py-1.5 rounded-full text-xs inline-block 
                                      hover:bg-neutral-300 dark:hover:bg-neutral-700 
                                      transition-colors duration-200 cursor-default"
                        >
                          {cred.name}
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}

              {profile.channels && profile.channels.length > 0 && (
                <div className="mt-2">
                  <div className="text-sm font-medium mb-2">Contact</div>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-2">
                      {profile.channels.map((channel: IcebreakerChannel, index: number) => (
                        <div 
                          key={index} 
                          className="bg-neutral-200 dark:bg-neutral-800 px-3 py-1.5 rounded-full text-xs inline-block 
                                      hover:bg-neutral-300 dark:hover:bg-neutral-700 
                                      transition-colors duration-200 cursor-default"
                        >
                          {channel.type}
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}
            </div>
          ) : null}
        </ToolResponseCard>
      </ToolResponseBody>
    </ToolResponse>
  );
}