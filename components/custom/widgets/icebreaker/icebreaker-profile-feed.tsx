import React from 'react';

import { ToolResponse, ToolResponseHeader, ToolResponseBody, ToolResponseCard } from '@/components/custom/tool-response';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { IcebreakerProfile as IcebreakerProfileType } from '@/lib/types';

import IcebreakerProfile from './icebreaker-profile';

interface IcebreakerProfileFeedProps {
  profiles: IcebreakerProfileType[];
}

export default function IcebreakerProfileFeed({ profiles }: IcebreakerProfileFeedProps) {
  return (
    <ToolResponse>
      <ToolResponseHeader text="Icebreaker Profiles" />
      <ToolResponseBody>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {profiles.map((profile, index) => (
              <ToolResponseCard 
                key={index}
                onClick={() => window.open(`https://app.icebreaker.xyz/profiles/${profile.profileID}`, '_blank')}
              >
                <IcebreakerProfile profile={profile} title="" />
              </ToolResponseCard>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ToolResponseBody>
    </ToolResponse>
  );
}