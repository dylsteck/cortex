import { LargeWidget } from "../widget";

export default function IcebreakerProfile({ fname = 'dylsteck.eth' }: { fname?: string }){
    return(
        <LargeWidget>
            <p>{fname}</p>
        </LargeWidget>
    )
}