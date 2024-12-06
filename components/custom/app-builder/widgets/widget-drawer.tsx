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

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { type ExtendedWidget } from '..';

import { APPS, WIDGETS, type Widget } from './index';

interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

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
    ? WIDGETS.filter((widget) => widget.appId === currentWidget.appId).map((widget) => ({
        ...widget,
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

  const handleAddWidget = (widget: Widget) => {
    if (!widget) return;
    
    const extendedWidget: ExtendedWidget = {
      ...widget,
      layout: { x: 0, y: 0, w: 10, h: 3, i: widget.id || String(Date.now()) },
      visible: true,
      preview: params && Object.keys(params).length > 0 
        ? React.createElement(widget.component as React.ComponentType<any>, params)
        : widget.preview,
      props: params
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
          'fixed bottom-0 left-0 right-0 w-full bg-black dark:bg-white text-white dark:text-black rounded-t-xl shadow-lg border border-gray-200 mx-auto max-w-auto md:max-w-[60%] xl:max-w-[40%]',
          'outline-none'
        )}
      >
        {currentWidget ? (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4 px-3 w-[98%]">
              <div className="flex flex-row gap-1 items-center cursor-pointer" onClick={handleBack}>
                <ChevronLeft className="size-6 opacity-80" />
                <p>Back</p>
              </div>
              <div className="flex flex-col gap-0 items-center">
                <h2 className="text-xl font-medium">{currentWidgetDef?.name}</h2>
                <p className="text-sm text-light">{currentWidgetDef?.description}</p>
              </div>
              <Button 
                className="bg-black text-white rounded-xl hover:bg-black" 
                onClick={() => showParamsEditor ? handleAddWidget(currentWidgetDef) : handleSelectWidget()}
                disabled={showParamsEditor && !validateParams()}
              >
                {showParamsEditor ? 'Confirm' : 'Add'}
              </Button>
            </div>
            <div className="relative mt-4 overflow-hidden p-3">
              {showParamsEditor && currentWidgetDef?.defaultParams ? (
                <div className="flex flex-col gap-4 px-4 py-2 max-w-[400px] mx-auto">
                  {Object.entries(currentWidgetDef.defaultParams).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-1">
                      <Label htmlFor={key} className="text-sm font-medium text-black capitalize">{key}</Label>
                      <Input
                        id={key}
                        value={params[key] || ''}
                        onChange={(e) => setParams((prev) => ({
                          ...prev,
                          [key]: e.target.value
                        }))}
                        placeholder={String(value)}
                        className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <ChevronLeftCircle
                    className={`size-6 cursor-pointer ${currentSlide === 0 ? 'opacity-50' : 'opacity-100'}`}
                    onClick={handlePrev}
                  />
                  <div className="flex justify-center size-[55%] md:size-2/5">
                    {currentWidgetDef?.preview}
                  </div>
                  <ChevronRightCircle
                    className={`size-6 cursor-pointer ${
                      currentSlide === filteredWidgets.length - 1 ? 'opacity-50' : 'opacity-100'
                    }`}
                    onClick={handleNext}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <DrawerHeader className="p-0 pl-3 gap-0">
              <DrawerTitle className="text-2xl font-medium">Apps</DrawerTitle>
              <DrawerDescription className="p-0 m-0">View widgets across crypto apps</DrawerDescription>
            </DrawerHeader>
            <div className="mt-2.5 mx-1 overflow-y-scroll max-h-[50vh] px-2">
              {APPS.map((app) => (
                <div key={app.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Image
                        src={app.iconUrl}
                        alt={`${app.name} icon`}
                        className="size-10 rounded-lg mr-3"
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.description}</p>
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
                      className="max-w-[30%] w-auto rounded-xl"
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