import Image from "next/image";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { APPS } from "..";
import sampleProfile from "./sample-profile.json";
import { type IcebreakerProfile, type IcebreakerGuildMembership } from "./types";
import { Widget } from "../widget";

export default function IcebreakerSocials({
    profile = sampleProfile as unknown as IcebreakerProfile,
}: {
    profile?: IcebreakerProfile;
}) {
    const icebreakerApp = APPS.find((app) => app.id === "icebreaker");

    const safeChannels = profile?.channels ?? [];
    const safeGuilds: IcebreakerGuildMembership[] = (profile?.guilds ?? []).map((guild) => ({
        ...guild,
        joinedAt: new Date(guild.joinedAt),
    }));

    return (
        <Widget className="border border-gray-300 p-2 w-[70vw] h-[30vw] relative bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-lg overflow-hidden">
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
                    safeChannels.filter((channel) => channel.url).map((channel, index) => (
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