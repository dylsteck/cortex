import Image from "next/image";

import { LargeWidget } from "../widget";
import sampleProfile from "./sample-profile.json";
import { type IcebreakerProfile } from "./types";

export default function IcebreakerProfile({ profile = sampleProfile as unknown as IcebreakerProfile }: { profile?: IcebreakerProfile }){
    return(
        <LargeWidget className="border border-gray-300 p-1">
          <div className="flex flex-row gap-1 items-center">
            {profile.avatarUrl ? <Image src={profile.avatarUrl} alt={`Profile image for ${profile.displayName}`} className="size-[40px] rounded-full" width={40} height={40} /> : null}
            <p className="font-medium text-md text-white/65 dark:text-black/65">{profile.displayName}</p>
          </div>
          <p className="text-sm text-white dark:text-black pl-2">{profile.bio}</p>
        </LargeWidget>
    )
}