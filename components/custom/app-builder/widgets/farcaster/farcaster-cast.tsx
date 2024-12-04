"use client"

import Image from "next/image";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

import { APPS } from "..";
import { Widget } from "../widget";

import "react-farcaster-embed/dist/styles.css";

export default function FarcasterCast() {
    const farcasterApp = APPS.find((app) => app.id === "farcaster");
    return (
        <Widget>
           <FarcasterEmbed url="https://warpcast.com/dylsteck.eth/0x1f459eb2" />
        </Widget>
    );
}