import Image from "next/image";

import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

type WebResultsResponse = {
  query: string;
  follow_up_questions: null;
  answer: null;
  images: {
    url: string;
    description: string;
  }[];
  results: {
    title: string;
    url: string;
    content: string;
    score: number;
    raw_content: null;
  }[];
  response_time: number;
}

export function WebResults({ results }: { results?: WebResultsResponse }) {
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
        <h2 className="text-lg font-semibold mb-4">Images</h2>
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {results.images.map((image, index) => (
              <Card key={index} className="shrink-0 h-[200px] w-[300px] relative overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.description}
                  fill
                  sizes="300px"
                  priority={index < 2}
                  className="object-cover"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIeHx8hIyEpISYhJSMtLjIzLS0uMzYoOCg+QUJBKDhMUktTWFNYXVlZXVn/2wBDAR0XFx3Z2d3Z2dlZ2VnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Sources</h2>
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {results.results.map((result, index) => (
              <Card key={index} className="shrink-0 h-[180px] w-[400px] p-4 flex flex-col">
                <div className="grow space-y-2">
                  <h3 className="text-lg font-bold line-clamp-1">
                    {result.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-4">{result.content}</p>
                </div>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-gray-500 hover:underline truncate mt-2"
                >
                  {result.url}
                </a>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}