"use server";

import { z } from "zod";

import { SIWNResponseData } from "@/components/custom/sign-in-with-neynar";
import { createUser, getUserByFid } from "@/db/queries";

import { signIn } from "./auth";

export interface ActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}

export const login = async (siwnData: SIWNResponseData): Promise<ActionState> => {
  try {
    let [user] = await getUserByFid(parseInt(siwnData.fid));
    if (user) {
      await signIn("credentials", {
        fid: parseInt(siwnData.fid),
        username: siwnData.user.username,
        name: siwnData.user.display_name,
        bio: siwnData.user.profile.bio.text,
        verified_address: siwnData.user.verifications[0] ?? '',
        signer_uuid: siwnData.signer_uuid,
        pfp_url: siwnData.user.pfp_url,
        is_authenticated: siwnData.is_authenticated,
      });

      return { status: "success" };
    } else {
      await createUser(siwnData);
      await signIn("credentials", {
        fid: parseInt(siwnData.fid),
        username: siwnData.user.username,
        name: siwnData.user.display_name,
        bio: siwnData.user.profile.bio.text,
        verified_address: siwnData.user.verifications[0] ?? '',
        signer_uuid: siwnData.signer_uuid,
        pfp_url: siwnData.user.pfp_url,
        is_authenticated: siwnData.is_authenticated,
      });

      return { status: "success" };
    }
  } catch (error) {
    return { status: "failed" };
  }
};