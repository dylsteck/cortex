import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type IcebreakerProfile, type IcebreakerChannel, type IcebreakerCredential, IcebreakerWidgetPropsSchema } from "@/lib/types";
import { cortexAPI } from "@/lib/utils";

import { APPS } from "..";
import { Widget } from "../widget";

export default function IcebreakerProfile({ fname, fid }: { fname?: string; fid?: string }) {
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

    const icebreakerApp = useMemo(() => APPS.find((app) => app.id === 'icebreaker'), []);

    useEffect(() => {
        if (props.fname || props.fid) {
            setLoading(true);
            cortexAPI.getIcebreakerProfile(props.fname, props.fid)
                .then(setProfile)
                .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch profile'))
                .finally(() => setLoading(false));
        }
    }, [props.fname, props.fid]);

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

    return (
        <Widget className="relative">
            {icebreakerApp ? (
                <Image
                    src={icebreakerApp.iconUrl}
                    alt={`${icebreakerApp.name} icon`}
                    className="size-[25px] rounded-md absolute top-2 right-2"
                    width={25}
                    height={25}
                />
            ) : null}
            <div className="absolute bottom-3 left-2 flex flex-col gap-2 items-start text-black dark:text-white">
                {profile.avatarUrl ? (
                    <Image
                        src={profile.avatarUrl}
                        alt={`Profile image for ${profile.displayName}`}
                        className="size-[35px] rounded-full border border-gray-500/40"
                        width={35}
                        height={35}
                    />
                ) : null}
                <div className="pl-1 flex flex-col gap-1">
                    <p className="font-medium text-md">
                        {profile.displayName}
                    </p>
                    <p className="text-sm">
                        {profile.bio}
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
                            {profile.channels
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
                            {profile.credentials
                                ?.filter((credential: IcebreakerCredential) => credential.name)
                                .map((credential: IcebreakerCredential, index: number) => (
                                    <DropdownMenuItem key={index} asChild>
                                        <a
                                            href={credential.reference || "#"}
                                            target={credential.reference ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                            className="capitalize"
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
    );
}