/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { WarpcastUser } from '../../common/types/farcaster';

export const Profile = ({ profile, theme = 'light' }: { profile: WarpcastUser, theme?: 'light' | 'dark'}) => {
  const textColors = {
    light: {
      username: 'text-white',
      reactions: 'text-white',
      border: 'border-gray-700'
    },
    dark: {
      username: 'text-gray-400',
      reactions: 'text-gray-400',
      border: 'border-gray-900'
    }
  };

  return (
    <div className={`p-4 rounded-lg max-w-xs border ${textColors[theme].border} shadow-lg overflow-hidden`}> 
      <div className="flex items-center space-x-3">
        <img
          src={profile.pfp.url}
          alt={profile.username}
          className="size-12 rounded-full border border-gray-600"
        />
        <div className="truncate">
          <p className={`font-semibold text-lg truncate ${textColors[theme].username}`}>{profile.displayName}</p>
          <p className={`text-sm truncate ${textColors[theme].username}`}>@{profile.username}</p>
        </div>
      </div>
      <div className="flex mt-3 space-x-4 items-center">
        <p className={`text-sm ${textColors[theme].reactions}`}>{profile.followingCount.toLocaleString()} Following</p>
        <p className={`text-sm ${textColors[theme].reactions}`}>{profile.followerCount.toLocaleString()} Followers</p>
        {profile.profile?.location?.description && (
          <p className={`text-sm ${textColors[theme].reactions}`}>{profile.profile.location.description}</p>
        )}
      </div>
    </div>
  );
};