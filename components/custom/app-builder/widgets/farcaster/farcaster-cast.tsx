"use client"

import Image from "next/image";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

import { APPS } from "..";
import { Widget } from "../widget";

import "react-farcaster-embed/dist/styles.css";

interface FarcasterCastProps {
    castUrl: string;
}

export default function FarcasterCast({ castUrl }: FarcasterCastProps) {
    const farcasterApp = APPS.find((app) => app.id === "farcaster");
    return (
        <Widget className="flex items-center justify-center">
            <div className="w-full max-w-[500px] mx-auto p-2 sm:p-4">
                <FarcasterEmbed url={castUrl} />
            </div>
        </Widget>
    );
}