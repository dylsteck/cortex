'use client'

import { sdk } from "@farcaster/frame-sdk";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { connect } from "wagmi/actions"

import { login } from "@/app/(auth)/actions";
import { AuthData } from "@/lib/types";
import { wagmiConfig } from "@/lib/wagmi";

export default function FrameProvider({ children }: { children: React.ReactNode }){
    const router = useRouter();
    useEffect(() => {
        const init = async () => {
          const context = await sdk.context;
          if (context?.client.clientFid) {
            const resp = await connect(wagmiConfig, { connector: farcasterFrame(), chainId: 8453 });
            const { accounts, chainId } = resp;
            if (context?.user) {
                const loginData: AuthData = {
                    fid: context.user.fid.toString(),
                    username: context.user.username || "",
                    name: context.user.displayName || "",
                    bio: '',
                    verified_address: accounts[0],
                    signer_uuid: "",
                    pfp_url: context.user.pfpUrl || ""
                  };
                await login(loginData);
                router.refresh();
              }
          }
          setTimeout(() => {
            sdk.actions.ready()
          }, 500)
        }
        init()
      }, [router])

    return(
        <>
         {children}
        </>
    )
}