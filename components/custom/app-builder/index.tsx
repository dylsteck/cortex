import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Copy } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { WIDGETS } from "./widgets";
import WidgetDrawer from "./widgets/widget-drawer";

interface LayoutItem {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  static?: boolean;
}

export interface Widget {
  id: string;
  preview: React.ReactNode;
}

export interface ExtendedWidget extends Widget {
  id: string;
  layout: LayoutItem;
  visible: boolean;
  preview: React.ReactNode;
  props?: Record<string, any>;
  appId?: string;
}

export default function AppBuilder() {
  const [placedWidgets, setPlacedWidgets] = React.useState<ExtendedWidget[]>([]);

  const addWidget = (widget: Widget) => {
    const id = `${widget.id}-${Date.now()}`;
    const newWidget: ExtendedWidget = {
      ...widget,
      id,
      layout: {
        i: id,
        x: 0,
        y: placedWidgets.length,
        w: 6,
        h: 1,
        static: false
      },
      visible: true,
      props: {},
      preview: widget.preview,
    };
    setPlacedWidgets(prev => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setPlacedWidgets(prev => {
      const filtered = prev.filter(widget => widget.id !== id);
      return filtered.map((widget, index) => ({
        ...widget,
        layout: {
          ...widget.layout,
          y: index
        }
      }));
    });
  };

  const duplicateWidget = (id: string) => {
    const widgetToDuplicate = placedWidgets.find(widget => widget.id === id);
    if (!widgetToDuplicate) return;
    
    const newId = `${widgetToDuplicate.id}-copy-${Date.now()}`;
    const existingLayout = widgetToDuplicate.layout;
    
    const newY = Math.max(...placedWidgets.map(w => w.layout.y)) + 1;
    
    const newWidget: ExtendedWidget = {
      ...widgetToDuplicate,
      id: newId,
      layout: {
        ...existingLayout,
        i: newId,
        y: newY,
        x: existingLayout.x
      },
    };
    
    setPlacedWidgets(prev => [...prev, newWidget]);
  };

  const handleLayoutChange = (currentLayout: LayoutItem[]) => {
    setPlacedWidgets(prev =>
      prev.map(widget => {
        const updatedLayout = currentLayout.find(l => l.i === widget.id);
        return updatedLayout
          ? { ...widget, layout: updatedLayout }
          : widget;
      })
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mx-auto mt-4 border rounded-xl shadow-sm h-[667px] w-[375px]">
          <motion.div
            layout
            className={cn(
              "transition-all duration-300 relative h-[667px] overflow-y-auto",
              "w-full p-2"
            )}
            style={{ borderRadius: "1rem" }}
          >
            <GridLayout
              className="layout"
              layout={placedWidgets.map(w => w.layout)}
              cols={6}
              rowHeight={355}
              width={355}
              isResizable={false}
              isDraggable={true}
              compactType={null}
              preventCollision={false}
              margin={[0, 16]}
              containerPadding={[2, 2]}
              onLayoutChange={handleLayoutChange}
              draggableHandle=".drag-handle"
              verticalCompact={false}
              useCSSTransforms={true}
            >
              {placedWidgets.map((widget) => (
                <div key={widget.id} className="relative">
                  <motion.div
                    className={cn(
                      "relative rounded-lg border shadow-sm overflow-visible group bg-background hover:shadow-md transition-all drag-handle cursor-pointer",
                      "w-full opacity-100"
                    )}
                    layout
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="absolute -left-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        className="size-5 rounded-md shadow-sm pointer-events-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeWidget(widget.id);
                        }}
                      >
                        <Trash2 className="size-2.5" />
                      </Button>
                    </div>
                    <div
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="size-5 rounded-md shadow-sm pointer-events-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          duplicateWidget(widget.id);
                        }}
                      >
                        <Copy className="size-2.5" />
                      </Button>
                    </div>
                    <div className="p-1.5 w-full">{widget.preview}</div>
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