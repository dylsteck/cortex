import Image from 'next/image';
import React, { useState, useEffect, useMemo, Suspense } from 'react';

import { APPS } from '@/components/custom/app-builder/widgets';
import { Widget } from '@/components/custom/app-builder/widgets/widget';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IcebreakerWidgetPropsSchema, IcebreakerProfile as IcebreakerProfileType, IcebreakerChannel, IcebreakerCredential } from '@/lib/types';
import { cortexAPI } from '@/lib/utils';

interface IcebreakerProfileProps {
  profile?: IcebreakerProfileType;
  profiles?: IcebreakerProfileType[];
  fname?: string;
  fid?: string;
}

export default function IcebreakerProfile({ fname, fid, profile, profiles }: IcebreakerProfileProps) {
  const [profileState, setProfileState] = useState<IcebreakerProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const props = useMemo(() => {
    try {
      return IcebreakerWidgetPropsSchema.parse({ fname, fid });
    } catch (error) {
      return { fname: "dylsteck.eth", fid };
    }
  }, [fname, fid]);

  const icebreakerApp = useMemo(() => APPS.find((app) => app.id === 'icebreaker'), []);

  useEffect(() => {
    if (profile) {
      setProfileState(profile);
      setLoading(false);
      return;
    }

    if (profiles && profiles.length > 0) {
      setProfileState(profiles[0]);
      setLoading(false);
      return;
    }

    if (props.fname || props.fid) {
      setLoading(true);
      cortexAPI.getIcebreakerProfile(props.fname, props.fid)
        .then(setProfileState)
        .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch profile'))
        .finally(() => setLoading(false));
    }
  }, [props.fname, props.fid, profile, profiles]);

  if (loading) {
    return (
      <Widget>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full size-8 border-b-2 border-gray-400" />
        </div>
      </Widget>
    );
  }

  if (error) {
    return (
      <Widget>
        <div className="p-4 text-red-500">Error: {error}</div>
      </Widget>
    );
  }

  if (!profileState) return null;

  return (
    <Suspense fallback={
      <Widget>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full size-8 border-b-2 border-gray-400" />
        </div>
      </Widget>
    }>
      <Widget>
        {icebreakerApp && (
          <Image
            src={icebreakerApp.iconUrl}
            alt={`${icebreakerApp.name} icon`}
            className="size-[25px] rounded-md absolute top-2 right-2"
            width={25}
            height={25}
          />
        )}
        <div className="absolute bottom-3 left-2 flex flex-col gap-2 items-start text-black dark:text-white">
          {(profileState as any).avatarUrl && (
            <Image
              src={(profileState as any).avatarUrl}
              alt={`Profile image for ${profileState.displayName}`}
              className="size-[35px] rounded-full border border-gray-500/40"
              width={35}
              height={35}
            />
          )}
          <div className="pl-1 flex flex-col gap-1">
            <p className="font-medium text-md">
              {profileState.displayName}
            </p>
            <p className="text-sm">
              {profileState.bio}
            </p>
          </div>
          <div className="pl-1 flex flex-row gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="px-3 py-1 bg-white text-black rounded-full text-sm cursor-pointer">
                  Socials
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {profileState.channels
                  ?.filter((channel: IcebreakerChannel) => channel.url)
                  .map((channel: IcebreakerChannel, index: number) => (
                    <DropdownMenuItem key={index} asChild className="cursor-pointer">
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="capitalize"
                      >
                        {channel.type}
                      </a>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="px-3 py-1 bg-white text-black rounded-full text-sm cursor-pointer">
                  Credentials
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {profileState.credentials
                  ?.filter((credential: IcebreakerCredential) => credential.name)
                  .map((credential: IcebreakerCredential, index: number) => (
                    <DropdownMenuItem key={index} asChild>
                      <a
                        href={credential.reference || "#"}
                        target={credential.reference ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        {credential.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Widget>
    </Suspense>
  );
}
