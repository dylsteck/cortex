"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CortexIcon } from "@/components/custom/icons";
import SignInWithNeynar, { SIWNResponseData } from "@/components/custom/sign-in-with-neynar";

import { login } from "../actions";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (siwnData: SIWNResponseData) => {
    try {
      const result = await login(siwnData);
      if (result.status === "failed") {
        toast.error("Invalid credentials!");
      } else if (result.status === "invalid_data") {
        toast.error("Failed validating your submission!");
      } else if (result.status === "success") {
        router.refresh();
      }
      return result;
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { status: "failed" };
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <div className="flex flex-col items-center justify-center gap-0">
            <CortexIcon size={60} />
            <h3 className="text-xl font-semibold dark:text-zinc-50">Cortex</h3>
          </div>
          <p className="text-md text-gray-500 dark:text-zinc-400">
           An agent and actions built around your Farcaster profile
          </p>
          <div className="pt-3">
            <SignInWithNeynar handleSignInSuccess={(siwnData) => handleSubmit(siwnData)} />
          </div>
        </div>
      </div>
    </div>
  );
}