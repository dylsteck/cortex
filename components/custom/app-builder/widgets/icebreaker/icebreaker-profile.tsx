import { LargeWidget } from "../widget";
import sampleProfile from "./sample-profile.json";
import { type IcebreakerProfile } from "./types";

export default function IcebreakerProfile({ profile = sampleProfile as unknown as IcebreakerProfile }: { profile?: IcebreakerProfile }){
    return(
        <LargeWidget>
          <p>{profile.displayName}</p>
        </LargeWidget>
    )
}