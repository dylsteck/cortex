'use client';

import { Check, ChevronDown } from 'lucide-react';
import { startTransition, useEffect, useMemo, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

import { saveModel, saveOllamaConfig, getOllamaConfig } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Model, models } from '@/lib/model';
import { cn } from '@/lib/utils';

export function ModelSelector({
  selectedModelName,
  className,
  onModelChange,
}: {
  selectedModelName: Model['name'];
  onModelChange?: (model: Model['name']) => void;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelName, setOptimisticModelName] = useOptimistic(selectedModelName);
  const [ollamaApiUrl, setOllamaApiUrl] = useState('');
  const [ollamaModel, setOllamaModel] = useState('');

  useEffect(() => {
    if (optimisticModelName === 'ollama') {
      startTransition(async () => {
        const config = await getOllamaConfig();
        if (config) {
          setOllamaApiUrl(config.ollamaApiUrl || '');
          setOllamaModel(config.ollamaModel || '');
        }
      });
    }
  }, [optimisticModelName]);

  const selectModel = useMemo(
    () => models.find((model) => model.name === optimisticModelName),
    [optimisticModelName]
  );

  const isValidOllamaConfig = () => {
    try {
      new URL(ollamaApiUrl);
      return ollamaModel.trim().length > 0;
    } catch {
      return false;
    }
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          asChild
          className={cn(
            'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground md:h-8 [&>svg]:!size-5 md:[&>svg]:!size-4',
            className
          )}
        >
          <Button variant="ghost">
            {selectModel?.label}
            <ChevronDown className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[300px]">
          {models.map((model) => (
            <DropdownMenuItem
              key={model.name}
              onSelect={() => {
                startTransition(() => {
                  saveModel(model.name);
                  onModelChange?.(model.name);
                });
              }}
              className="gap-4 group/item cursor-pointer"
              data-active={model.name === optimisticModelName}
            >
              <div className="flex flex-col gap-1 items-start">
                <div className="font-medium">{model.label}</div>
                <div className="text-xs text-muted-foreground">{model.description}</div>
              </div>
              {model.name === optimisticModelName && <Check className="size-4 opacity-0 group-data-[active=true]/item:opacity-100" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {optimisticModelName === 'ollama' && (
        <div className="flex flex-col gap-2 mt-4 w-full">
          <input
            type="text"
            placeholder="http://localhost:11434/api"
            value={ollamaApiUrl}
            onChange={(e) => setOllamaApiUrl(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="llama3.2"
            value={ollamaModel}
            onChange={(e) => setOllamaModel(e.target.value)}
            className="border p-2 rounded"
          />
          <Button
            disabled={!isValidOllamaConfig()}
            onClick={() => {
              startTransition(() => {
                saveOllamaConfig(ollamaApiUrl, ollamaModel).then(() => {
                  toast.success('Ollama configuration saved successfully');
                  setOpen(false);
                }).catch((error) => {
                  toast.error('Failed to save Ollama configuration', {
                    description: error.message,
                  });
                });
              });
            }}
          >
            Save Ollama Config
          </Button>
        </div>
      )}
    </>
  );
}