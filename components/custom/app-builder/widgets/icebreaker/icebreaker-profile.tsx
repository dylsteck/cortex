import Image from "next/image";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { APPS } from "..";
import sampleProfile from "./sample-profile.json";
import { type IcebreakerProfile } from "./types";
import { Widget } from "../widget";

export default function IcebreakerProfile({ profile = sampleProfile as unknown as IcebreakerProfile }: { profile?: IcebreakerProfile }) {
    const icebreakerApp = APPS.find((app) => app.id === 'icebreaker');

    return (
        <Widget className="border border-gray-300 p-1 size-[20vw] relative bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-lg">
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
                                ?.filter((channel) => channel.url)
                                .map((channel, index) => (
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
                                ?.filter((credential) => credential.name)
                                .map((credential, index) => (
                                    <DropdownMenuItem key={index} asChild>
                                        <a
                                            href={"#"}
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