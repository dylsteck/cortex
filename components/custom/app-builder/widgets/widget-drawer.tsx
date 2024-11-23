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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

import { type ExtendedWidget } from '..';

import { APPS, WIDGETS } from './index';

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

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredWidgets.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === filteredWidgets.length - 1 ? 0 : prev + 1));
  };

  const filteredWidgets = currentWidget
    ? WIDGETS.filter((widget) => widget.appId === currentWidget.appId).map((widget) => ({
        ...widget,
        position: { x: 0, y: 0, w: 10, h: 3 },
        visible: true,
        preview: widget.component,
        desktop: { x: 0, y: 0 },
        mobile: { x: 0, y: 0 },
      }))
    : [];

  const handleAddWidget = (widget: ExtendedWidget) => {
    onAdd(widget);
    setCurrentWidget(null);
    setOpen(false);
    setCurrentSlide(0);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setCurrentWidget(null);
      setCurrentSlide(0);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <PlusCircleIcon className="size-7 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          'fixed bottom-0 left-0 right-0 w-full bg-black dark:bg-white text-white dark:text-black rounded-t-xl shadow-lg border border-gray-200 mx-auto max-w-auto md:max-w-[60%] xl:max-w-[40%] max-h-[55%]',
          'outline-none'
        )}
      >
        {currentWidget ? (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4 px-3 w-[98%]">
              <div className="flex flex-row gap-1 items-center cursor-pointer" onClick={() => setCurrentWidget(null)}>
                <ChevronLeft
                  className="size-6 opacity-80"
                  onClick={() => setCurrentWidget(null)}
                />
                <p>Back</p>
              </div>
              <div className="flex flex-col gap-0 items-center">
                <h2 className="text-xl font-medium">{filteredWidgets[currentSlide]?.name}</h2>
                <p className="text-sm text-light">{filteredWidgets[currentSlide]?.description}</p>
              </div>
              <Button className="bg-black text-white rounded-xl hover:bg-black" onClick={() => handleAddWidget(filteredWidgets[currentSlide])}>
                Submit
              </Button>
            </div>
            <div className="relative mt-4 overflow-hidden p-3">
              <div className="flex items-center justify-between w-full">
                <ChevronLeftCircle
                  className={`size-6 cursor-pointer ${
                    filteredWidgets.length > 1 ? '' : 'hidden'
                  }`}
                  onClick={handlePrev}
                />
                <div className="flex justify-center w-[85%]">
                  {filteredWidgets[currentSlide]?.component}
                </div>
                <ChevronRightCircle
                  className={`size-6 cursor-pointer ${
                    filteredWidgets.length > 1 ? '' : 'hidden'
                  }`}
                  onClick={handleNext}
                />
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {filteredWidgets.map((_, index) => (
                  <div
                    key={index}
                    className={`size-2 rounded-full ${
                      index === currentSlide ? 'bg-muted' : 'bg-muted/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-2xl font-medium">Apps</DrawerTitle>
            </DrawerHeader>
            <div className="mt-4 mx-1 overflow-y-scroll max-h-[50vh]">
              {APPS.map((app) => (
                <div key={app.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Image
                        src={app.iconUrl}
                        alt={`${app.name} icon`}
                        className="size-10 rounded-lg mr-3"
                        width={10}
                        height={10}
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
                          position: { x: 0, y: 0, w: 10, h: 3 },
                          visible: true,
                          preview: widget.component,
                          desktop: { x: 0, y: 0 },
                          mobile: { x: 0, y: 0 },
                        }));
                        if (widgets.length) {
                          setCurrentWidget(widgets[0]);
                          setCurrentSlide(0);
                        }
                      }}
                      className="max-w-[30%] w-auto"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}