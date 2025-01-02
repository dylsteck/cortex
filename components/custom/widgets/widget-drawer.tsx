'use client';

import {
  ChevronLeft,
  ChevronRight,
  PlusCircleIcon,
  Check,
  ChevronLeftCircle,
  ChevronRightCircle,
} from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { type ExtendedWidget } from '@/components/custom/app-builder/index';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { APPS, WIDGETS, type Widget } from './index';

interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ParamMetadata {
  label: string;
  description?: string;
  placeholder?: string;
}

type WidgetWithLayout = {
  id: string;
  appId: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  preview: React.ReactNode;
  layout: GridPosition & { i: string };
  visible: boolean;
  paramsMetadata?: Record<string, ParamMetadata>;
  defaultParams?: Record<string, any>;
  props?: Record<string, any>;
  paramsSchema?: Widget['paramsSchema'];
};

export default function WidgetDrawer({ onAdd }: { onAdd: (widget: ExtendedWidget) => void }) {
  const [currentWidget, setCurrentWidget] = React.useState<ExtendedWidget | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [params, setParams] = React.useState<Record<string, any>>({});
  const [showParamsEditor, setShowParamsEditor] = React.useState(false);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredWidgets.length - 1 : prev - 1));
    setShowParamsEditor(false);
    setParams({});
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === filteredWidgets.length - 1 ? 0 : prev + 1));
    setShowParamsEditor(false);
    setParams({});
  };

  const filteredWidgets = currentWidget
    ? WIDGETS.filter((widget) => widget.appId === currentWidget.appId).map((widget): WidgetWithLayout => ({
        id: widget.id,
        appId: widget.appId,
        name: widget.name,
        description: widget.description,
        component: widget.component,
        preview: widget.preview,
        paramsSchema: widget.paramsSchema,
        defaultParams: widget.defaultParams,
        paramsMetadata: widget.paramsMetadata ? Object.fromEntries(
          Object.entries(widget.paramsMetadata)
            .filter(([_, value]) => value !== undefined)
        ) as Record<string, ParamMetadata> : undefined,
        layout: { x: 0, y: 0, w: 10, h: 3, i: widget.id || String(Date.now()) },
        visible: true,
      }))
    : [];

  const currentWidgetDef = filteredWidgets[currentSlide];

  const handleSelectWidget = () => {
    if (!currentWidgetDef?.defaultParams) {
      handleAddWidget(currentWidgetDef);
      return;
    }
    setParams(currentWidgetDef.defaultParams);
    setShowParamsEditor(true);
  };

  const handleAddWidget = (widget: WidgetWithLayout) => {
    if (!widget) return;
    
    // Normalize paramsMetadata to ensure type compatibility
    const normalizedParamsMetadata: Record<string, ParamMetadata> = {};
    if (widget.paramsMetadata) {
      Object.entries(widget.paramsMetadata).forEach(([key, value]) => {
        if (value) {
          normalizedParamsMetadata[key] = {
            label: value.label || key,
            description: value.description || '',
            placeholder: value.placeholder || '',
          };
        }
      });
    }
    
    const extendedWidget: ExtendedWidget = {
      ...widget,
      layout: { x: 0, y: 0, w: 10, h: 3, i: widget.id || String(Date.now()) },
      visible: true,
      preview: params && Object.keys(params).length > 0 
        ? React.createElement(widget.component as React.ComponentType<any>, params)
        : widget.preview,
      props: params,
      paramsMetadata: normalizedParamsMetadata
    } as ExtendedWidget;

    onAdd(extendedWidget);
    setCurrentWidget(null);
    setParams({});
    setShowParamsEditor(false);
    setOpen(false);
    setCurrentSlide(0);
  };

  const handleBack = () => {
    setCurrentWidget(null);
    setShowParamsEditor(false);
    setParams({});
    setCurrentSlide(0);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setCurrentWidget(null);
      setParams({});
      setShowParamsEditor(false);
      setCurrentSlide(0);
    }
  };

  const validateParams = () => {
    if (!currentWidgetDef?.paramsSchema) return true;
    try {
      currentWidgetDef.paramsSchema.parse(params);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <PlusCircleIcon className="size-7 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          'fixed bottom-0 left-0 right-0 w-full bg-black dark:bg-white text-white dark:text-black rounded-t-[20px] shadow-lg border border-gray-200 mx-auto',
          'max-w-full sm:max-w-[90%] md:max-w-[60%] xl:max-w-[40%]',
          'outline-none'
        )}
      >
        {currentWidget ? (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2 px-3 w-full">
              <div className="flex flex-row gap-1 items-center cursor-pointer" onClick={handleBack}>
                <ChevronLeft className="size-5 sm:size-6 opacity-80" />
                <p className="hidden sm:block">Back</p>
              </div>
              <div className="flex flex-col gap-0 items-center max-w-[60%]">
                <h2 className="text-lg sm:text-xl font-medium truncate">{currentWidgetDef?.name}</h2>
                <p className="text-xs sm:text-sm text-light truncate">{currentWidgetDef?.description}</p>
              </div>
              <Button 
                className="bg-black text-white rounded-full px-4 py-1.5 text-sm hover:bg-black/90" 
                onClick={() => showParamsEditor ? handleAddWidget(currentWidgetDef) : handleSelectWidget()}
                disabled={showParamsEditor && !validateParams()}
              >
                {showParamsEditor ? 'Confirm' : 'Add'}
              </Button>
            </div>
            <div className="relative mt-2 overflow-hidden p-2 sm:p-3">
              {showParamsEditor && currentWidgetDef?.defaultParams ? (
                <div className="flex flex-col gap-3 px-3 py-2 max-w-[400px] mx-auto">
                  {Object.entries(currentWidgetDef.defaultParams).map(([key, value]) => {
                    const metadata = currentWidgetDef.paramsMetadata?.[key] || {
                      label: key.charAt(0).toUpperCase() + key.slice(1),
                      description: '',
                      placeholder: ''
                    };
                    
                    return (
                      <div key={key} className="flex flex-col gap-1">
                        <Label htmlFor={key} className="text-sm font-medium text-black capitalize">
                          {metadata.label}
                        </Label>
                        {metadata.description && (
                          <p className="text-xs text-gray-500 mb-1">{metadata.description}</p>
                        )}
                        <Input
                          id={key}
                          value={params[key] || ''}
                          onChange={(e) => setParams((prev) => ({
                            ...prev,
                            [key]: e.target.value
                          }))}
                          placeholder={metadata.placeholder || ''}
                          className="bg-white border-gray-300 text-black placeholder:text-gray-500 rounded-lg"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-between px-2">
                  <ChevronLeftCircle
                    className={cn(
                      'size-5 sm:size-6 cursor-pointer transition-opacity',
                      currentSlide === 0 ? 'opacity-50' : 'opacity-100 hover:opacity-80'
                    )}
                    onClick={handlePrev}
                  />
                  <div className="flex justify-center size-3/5 sm:size-[55%] md:size-2/5">
                    {currentWidgetDef?.preview}
                  </div>
                  <ChevronRightCircle
                    className={cn(
                      'size-5 sm:size-6 cursor-pointer transition-opacity',
                      currentSlide === filteredWidgets.length - 1 ? 'opacity-50' : 'opacity-100 hover:opacity-80'
                    )}
                    onClick={handleNext}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <DrawerHeader className="p-0 pl-3 gap-0">
              <DrawerTitle className="text-xl sm:text-2xl font-medium">Apps</DrawerTitle>
              <DrawerDescription className="p-0 m-0 text-sm sm:text-base">View widgets across crypto apps</DrawerDescription>
            </DrawerHeader>
            <div className="mt-2 mx-1 overflow-y-auto max-h-[60vh] px-2">
              {APPS.map((app) => (
                <div key={app.id} className="mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 mr-3">
                      <Image
                        src={app.iconUrl}
                        alt={`${app.name} icon`}
                        className="size-8 sm:size-10 rounded-lg mr-2 sm:mr-3"
                        width={40}
                        height={40}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{app.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{app.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const widgets = WIDGETS.filter((w) => w.appId === app.id).map((widget) => ({
                          ...widget,
                          layout: { x: 0, y: 0, w: 10, h: 3, i: widget.id || String(Date.now()) },
                          visible: true,
                        }));
                        if (widgets.length) {
                          setCurrentWidget(widgets[0] as ExtendedWidget);
                        }
                      }}
                      className="shrink-0 h-8 px-4 rounded-full text-sm"
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}