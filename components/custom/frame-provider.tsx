'use client'

import { FrameContext, sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";

import { login } from "@/app/(auth)/actions";
import { AuthData } from "@/lib/types";

export default function FrameProvider({ children }: { children: React.ReactNode }){
    const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);
    const [context, setContext] = useState<FrameContext>();

    useEffect(() => {
        const load = async () => {
          const sdkContext = await sdk.context;
          setContext(sdkContext);
          
          if (sdkContext?.user) {
            const loginData: AuthData = {
              fid: sdkContext.user.fid.toString(),
              username: sdkContext.user.username || "",
              name: sdkContext.user.displayName || "",
              bio: "",
              verified_address: "",
              signer_uuid: "",
              pfp_url: sdkContext.user.pfpUrl || ""
            };
            await login(loginData);
          }
          
          sdk.actions.ready({ disableNativeGestures: true });
        };
        if (sdk && !isSDKLoaded) {
          setIsSDKLoaded(true);
          load();
        }
    }, [isSDKLoaded]);
    
    if (!isSDKLoaded) {
        return <div>Loading...</div>
    }

    return(
        <>
          {children}
        </>
    )
}