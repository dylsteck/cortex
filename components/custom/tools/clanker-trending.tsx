import { Clanker } from "../farcasterkit/react/clanker";
import { ToolResponse } from "../tool-response";

export default function ClankerTrendingTool({ clankers }: { clankers: any }){
    const badgeTitle = `${Object.keys(clankers.tokens).length} tokens`;
    const images = [...new Set(Object.values(clankers.tokens).slice(0, 4).map((clanker: any) => clanker.img_url))] as string[];
    const renderItem = (item: any) => <Clanker clanker={item} />
    const keyExtractor = (item: any) => item.id;
    return <ToolResponse badgeTitle={badgeTitle} bodyTitle="Tokens" images={images} items={Object.values(clankers.tokens)} renderItem={renderItem} keyExtractor={keyExtractor} />
}