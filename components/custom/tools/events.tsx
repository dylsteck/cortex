import { Cast } from "../farcasterkit/react/cast";
import { Event } from '../farcasterkit/react/event';
import { ToolResponse } from "../tool-response";

export default function EventsTool({ events }: { events: any }){
    const badgeTitle = `${events.length} events`;
    const images = [...new Set(events.slice(0, 4).map((event: any) => event.hosts[0].pfp_url || ''))].filter(Boolean) as string[];
    const renderItem = (item: any) => <Event event={item} />
    const keyExtractor = (item: any) => item.hash;
    return <ToolResponse badgeTitle={badgeTitle} bodyTitle="Events" images={images} items={events} renderItem={renderItem} keyExtractor={keyExtractor} />
}   