"use client"

import Image from "next/image";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

import { APPS } from "..";
import { Widget } from "../widget";

import "react-farcaster-embed/dist/styles.css";

export default function FarcasterCast() {
    const farcasterApp = APPS.find((app) => app.id === "farcaster");
    return (
        <Widget className="border border-gray-300 p-2 w-[60vw] h-[40vw] md:w-[45vw] md:h-[30vw] lg:w-[30vw] lg:h-[20vw] xl:w-[22.5vw] xl:h-[15vw] relative bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-lg overflow-y-scroll text-black dark:text-white">
           <FarcasterEmbed url="https://warpcast.com/dylsteck.eth/0x1f459eb2" />
        </Widget>
    );
}