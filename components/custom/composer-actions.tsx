import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

type ComposerActionsResponse = {
    result: {
        actions: {
            name: string;
            icon: string;
            description: string;
            imageUrl: string;
            actionUrl: string;
            action: {
                actionType: string;
                postUrl: string;
            };
            octicon: string;
            addedCount: number;
            category: string;
            appName?: string;
            authorFid?: number;
            aboutUrl?: string;
        }[];
    };
    next?: {
        cursor: string;
    };
};

export default function ComposerActions({ results }: { results?: ComposerActionsResponse }){
    if (!results) {
        return (
            <div className="space-y-6 w-full">
            <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="shrink-0 h-[200px] w-[300px]">
                        <Skeleton className="size-full" />
                    </Card>
                ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            
            <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="shrink-0 h-[200px] w-[400px] p-4">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-[100px] w-full" />
                        <Skeleton className="h-4 w-[100px]" />
                    </div>
                    </Card>
                ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            </div>
        );
    }
    return (
        <div className="space-y-6 w-full">    
          <div>
            <h2 className="text-lg font-semibold mb-4">Mini Apps</h2>
            <ScrollArea className="w-full">
              <div className="flex flex-row gap-2 pb-4">
                {results.result.actions.map((action, index) => (
                  <Card key={index} className="shrink-0 h-[180px] w-[400px] p-4 flex flex-col">
                    <div className="grow space-y-2">
                      <h3 className="text-lg font-bold line-clamp-1">
                        {action.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-4">{action.description}</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <a 
                        href={action.aboutUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-gray-500 hover:underline truncate"
                      >
                        Learn More
                      </a>
                      <a 
                        href={action.action.postUrl} 
                        target="iframe"
                        className="text-xs text-gray-500 hover:underline truncate"
                      >
                        Open
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      );
}