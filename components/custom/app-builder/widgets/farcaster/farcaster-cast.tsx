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
        <Widget>
           <FarcasterEmbed url={castUrl} />
        </Widget>
    );
}