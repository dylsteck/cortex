import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

import { type IcebreakerProfile, type IcebreakerGuildMembership, type IcebreakerChannel, IcebreakerWidgetPropsSchema } from "@/lib/types";
import { cortexAPI } from "@/lib/utils";

import { APPS } from "..";
import { Widget } from "../widget";

export default function IcebreakerSocials({ fname, fid }: { fname?: string; fid?: string }) {
    const [profile, setProfile] = useState<IcebreakerProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const props = useMemo(() => {
        try {
            return IcebreakerWidgetPropsSchema.parse({ fname, fid });
        } catch (error) {
            return { fname: "dylsteck.eth", fid };
        }
    }, [fname, fid]);
    
    useEffect(() => {
        if (props.fname || props.fid) {
            setLoading(true);
            cortexAPI.getIcebreakerProfile(props.fname, props.fid)
                .then(setProfile)
                .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch profile'))
                .finally(() => setLoading(false));
        }
    }, [props.fname, props.fid]);

    const icebreakerApp = useMemo(() => APPS.find((app) => app.id === "icebreaker"), []);

    if (loading) {
        return (
            <Widget className="relative">
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full size-8 border-b-2 border-gray-400" />
                </div>
            </Widget>
        );
    }

    if (error) {
        return (
            <Widget className="relative">
                <div className="p-4 text-red-500">Error: {error}</div>
            </Widget>
        );
    }

    if (!profile) return null;

    const safeChannels = profile?.channels ?? [];
    const safeGuilds: IcebreakerGuildMembership[] = (profile?.guilds ?? []).map((guild: IcebreakerGuildMembership) => ({
        ...guild,
        joinedAt: guild.joinedAt
    }));

    return (
        <Widget className="relative">
            {icebreakerApp && (
                <Image
                    src={icebreakerApp.iconUrl}
                    alt={`${icebreakerApp.name} icon`}
                    className="absolute top-2 right-2 rounded-md"
                    width={25}
                    height={25}
                />
            )}
            <div className="absolute inset-0 flex flex-col gap-1 justify-start items-start p-3 text-black dark:text-white overflow-y-auto">
                {safeChannels.length > 0 ? (
                    safeChannels.filter((channel: IcebreakerChannel) => channel.url).map((channel: IcebreakerChannel, index: number) => (
                        <a key={`channel=${channel.type}`} className="cursor-pointer w-full" href={channel.url} target="_blank">
                            <p className="truncate">{channel.type}</p>
                            {index < safeChannels.length - 1 && <hr className="border-gray-600 w-full" />}
                        </a>
                    ))
                ) : (
                    <p className="text-gray-400">No channels available</p>
                )}
            </div>
        </Widget>
    );
}