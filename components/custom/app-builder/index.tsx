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
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = React.useState({ width: 0, height: 0 });
  const [placedWidgets, setPlacedWidgets] = React.useState<ExtendedWidget[]>([]);
  const widgetRefs = React.useRef<{[key: string]: HTMLDivElement}>({});

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const maxHeight = window.innerHeight * 0.8;
        const width = (maxHeight * 9) / 16;
        setContainerDimensions({ width, height: maxHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const addWidget = (widget: Widget) => {
    const id = `${widget.id}-${Date.now()}`;
    const newY = placedWidgets.length > 0 
      ? Math.max(...placedWidgets.map(w => w.layout.y + w.layout.h))
      : 0;

    const newWidget: ExtendedWidget = {
      ...widget,
      id,
      layout: {
        i: id,
        x: 0,
        y: newY,
        w: 2,
        h: 4,
        static: false,
        minW: 1,
        maxW: 12,
        minH: 1,
        maxH: 12
      },
      visible: true,
      preview: widget.preview,
    };

    setPlacedWidgets(prev => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setPlacedWidgets(prev => prev.filter(widget => widget.id !== id));
  };

  const duplicateWidget = (id: string) => {
    const widgetToDuplicate = placedWidgets.find(widget => widget.id === id);
    if (!widgetToDuplicate) return;
    
    const newId = `${widgetToDuplicate.id}-copy-${Date.now()}`;
    const newY = Math.max(...placedWidgets.map(w => w.layout.y + w.layout.h));
    
    const newWidget: ExtendedWidget = {
      ...widgetToDuplicate,
      id: newId,
      layout: {
        ...widgetToDuplicate.layout,
        i: newId,
        y: newY,
      },
    };
    
    setPlacedWidgets(prev => [...prev, newWidget]);
  };

  const handleLayoutChange = (currentLayout: LayoutItem[]) => {
    setPlacedWidgets(prev =>
      prev.map(widget => {
        const updatedLayout = currentLayout.find(l => l.i === widget.id);
        return updatedLayout
          ? { 
              ...widget, 
              layout: {
                ...updatedLayout,
                x: Math.round(updatedLayout.x),
                y: Math.round(updatedLayout.y),
                w: Math.max(1, Math.round(updatedLayout.w)),
                h: Math.max(1, Math.round(updatedLayout.h))
              }
            }
          : widget;
      })
    );
  };

  return (
    <div className="flex flex-col h-auto max-h-screen overflow-y-hidden bg-background">
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[1200px] mx-auto px-4">
        <div 
          ref={containerRef}
          className="relative mt-4 border rounded-xl shadow-sm overflow-hidden bg-background"
          style={{
            width: containerDimensions.width,
            height: containerDimensions.height,
            maxHeight: "80vh"
          }}
        >
          <motion.div
            layout
            className="absolute inset-0 overflow-y-auto"
            style={{ borderRadius: "0.75rem" }}
          >
            <GridLayout
              className="layout"
              layout={placedWidgets.map(w => w.layout)}
              cols={1}
              rowHeight={50}
              width={containerDimensions.width}
              isResizable={true}
              isDraggable={true}
              compactType="vertical"
              preventCollision={false}
              margin={[16, 16]}
              containerPadding={[16, 16]}
              onLayoutChange={handleLayoutChange}
              draggableHandle=".drag-handle"
              resizeHandles={['se']}
              resizeHandle={
                <div 
                  className="react-resizable-handle react-resizable-handle-se rounded-lg bg-gray-500/50 hover:bg-gray-500/70 transition-colors"
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    bottom: 0,
                    right: 0,
                    cursor: 'se-resize',
                    zIndex: 1
                  }}
                />
              }
              verticalCompact={true}
              useCSSTransforms={true}
            >
              {placedWidgets.map((widget) => (
                <div 
                  key={widget.id} 
                  ref={(el) => {
                    if (el) widgetRefs.current[widget.id] = el;
                  }}
                  className="relative size-full"
                >
                  <motion.div
                    className={cn(
                      "relative rounded-xl border-2 shadow-sm overflow-hidden group bg-background",
                      "size-full opacity-100 transition-all duration-200",
                      "hover:shadow-md active:shadow-lg"
                    )}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 drag-handle cursor-move" />
                    <div
                      className="absolute left-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        className="size-8 rounded-lg shadow-sm pointer-events-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeWidget(widget.id);
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div
                      className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="size-8 rounded-lg shadow-sm pointer-events-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          duplicateWidget(widget.id);
                        }}
                      >
                        <Copy className="size-4" />
                      </Button>
                    </div>
                    <div className="p-3 size-full overflow-hidden">{widget.preview}</div>
                  </motion.div>
                </div>
              ))}
            </GridLayout>
          </motion.div>
        </div>
        <div className="sticky bottom-0.5 mt-4 flex flex-row gap-2 items-center bg-muted/90 rounded-full p-2 shadow-lg backdrop-blur-md">
          <WidgetDrawer onAdd={addWidget} />
          <p className="text-xl pr-2">Unnamed</p>
        </div>
      </div>
    </div>
  );
}