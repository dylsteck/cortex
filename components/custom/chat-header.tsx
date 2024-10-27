import { Plus } from 'lucide-react';
import Link from 'next/link';

import { ModelSelector } from '@/components/custom/model-selector';
import { SidebarToggle } from '@/components/custom/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';
import { Model } from '@/lib/model';

export function ChatHeader({
  selectedModelName,
}: {
  selectedModelName: Model['name'];
}) {
  return (
    <header className="flex h-16 sticky top-0 bg-background md:h-12 items-center px-2 md:px-2 z-10">
      <SidebarToggle />
      <BetterTooltip content="New Chat">
        <Button
          variant="ghost"
          className="w-auto md:size-8 [&>svg]:!size-5 md:[&>svg]:!size-4 pl-2 md:p-0 order-2 md:order-1 ml-auto md:ml-0 md:hidden group-data-[state=collapsed]/sidebar-wrapper:flex"
          asChild
        >
          <Link href="/">
            <Plus />
            <span className="md:sr-only">New Chat</span>
          </Link>
        </Button>
      </BetterTooltip>
      <ModelSelector
        selectedModelName={selectedModelName}
        className="order-1 md:order-2"
      />
    </header>
  );
}
