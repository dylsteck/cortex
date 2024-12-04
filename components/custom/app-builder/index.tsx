import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Copy } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import GridLayout from "react-grid-layout";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { WIDGETS } from "./widgets";
import WidgetDrawer from "./widgets/widget-drawer";

export interface ExtendedWidget extends Widget {
  id: string;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  visible: boolean;
  preview: React.ReactNode;
  props?: Record<string, any>;
}

export interface Widget {
  id: string;
  preview: React.ReactNode;
}

export default function AppBuilder() {
  const [placedWidgets, setPlacedWidgets] = React.useState<ExtendedWidget[]>([]);

  const addWidget = (widget: Widget) => {
    const lastY = placedWidgets.reduce((max, w) => Math.max(max, w.layout.y + w.layout.h), 0);
    const newWidget: ExtendedWidget = {
      ...widget,
      id: `${widget.id}-${Date.now()}`,
      layout: { x: 0, y: lastY, w: 1, h: 1 },
      visible: true,
      props: {},
      preview: widget.preview,
    };
    setPlacedWidgets((prev) => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setPlacedWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  const duplicateWidget = (id: string) => {
    setPlacedWidgets((prev) => {
      const widgetToDuplicate = prev.find((widget) => widget.id === id);
      if (!widgetToDuplicate) return prev;
      const lastY = prev.reduce((max, w) => Math.max(max, w.layout.y + w.layout.h), 0);
      const newWidget: ExtendedWidget = {
        ...widgetToDuplicate,
        id: `${widgetToDuplicate.id}-copy-${Date.now()}`,
        layout: { ...widgetToDuplicate.layout, y: lastY, x: placedWidgets.length % 3 * 1 },
      };
      return [...prev, newWidget];
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mx-auto mt-4 border rounded-xl shadow-sm overflow-y-scroll min-h-[618px]">
          <motion.div
            layout
            className={cn(
              "transition-all duration-300 relative min-h-[618px]",
              "w-full min-w-[375px]"
            )}
            style={{ borderRadius: "1rem" }}
          >
            <GridLayout
              className="layout"
              cols={1}
              rowHeight={200}
              width={375}
              isResizable={false}
              margin={[0, 24]}
              containerPadding={[0, 12]}
              verticalCompact={true}
              compactType="vertical"
              preventCollision={true}
              onLayoutChange={(layout: { x: number; y: number; w: number; h: number }[]) => {
                const sortedLayout = [...layout].sort((a, b) => a.y - b.y);
                setPlacedWidgets((prev) =>
                  sortedLayout.map((l: { x: number; y: number; w: number; h: number }, index: number) => ({
                    ...prev[index],
                    layout: l,
                  }))
                );
              }}
            >
              {placedWidgets.map((widget, index) => (
                <div
                  key={widget.id}
                  data-grid={widget.layout}
                  className="relative cursor-pointer"
                  style={{ zIndex: placedWidgets.length - index }}
                >
                  <motion.div
                    className={cn(
                      "relative rounded-xl shadow-sm overflow-visible group bg-background",
                      "w-full opacity-100"
                    )}
                    layout
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -bottom-8 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10 pt-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateWidget(widget.id);
                        }}
                      >
                        <Copy className="size-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeWidget(widget.id);
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div className="p-3 w-full">{widget.preview}</div>
                  </motion.div>
                </div>
              ))}
            </GridLayout>
          </motion.div>
        </div>
        <motion.div
          layout
          className="relative m-auto mt-4 flex flex-row gap-2 items-center"
        >
          <div className="flex justify-start">
            <div className="flex gap-3 items-center bg-muted/90 rounded-full p-2 shadow-lg backdrop-blur-md">
              <WidgetDrawer onAdd={addWidget} />
              <p className="text-xl pr-2">Unnamed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}