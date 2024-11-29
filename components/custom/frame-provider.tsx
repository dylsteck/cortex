'use client'

import sdk from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";

export default function FrameProvider({ children }: { children: React.ReactNode }){
    const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);

    useEffect(() => {
        const load = async () => {
        sdk.actions.ready();
        };
        if (sdk && !isSDKLoaded) {
        setIsSDKLoaded(true);
        load();
        }
    }, [isSDKLoaded]);
    return(
        <>
            {isSDKLoaded ? children : <></>}
        </>
    )
}