"use client";

import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, ArrowLeftCircleIcon, Copy } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Widget, WIDGETS } from "./widgets";
import WidgetDrawer from "./widgets/widget-drawer";

interface GridPosition {
  x: number;
  y: number;
}

export interface ExtendedWidget extends Widget {
  desktop: GridPosition;
  mobile: GridPosition;
  visible: boolean;
  preview: React.ReactNode;
  props?: Record<string, any>;
}

export default function AppBuilder() {
  const [viewMode, setViewMode] = React.useState<"desktop" | "mobile">(
    "mobile"
  );
  const [placedWidgets, setPlacedWidgets] = React.useState<ExtendedWidget[]>(
    []
  );
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  React.useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setViewMode("mobile");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addWidget = (widget: ExtendedWidget) => {
    const lastWidget = placedWidgets[placedWidgets.length - 1];
    const mobileYPosition = lastWidget ? lastWidget.mobile.y + 1 : 0;
    const desktopYPosition = lastWidget ? lastWidget.desktop.y : 0;
    const desktopXPosition = lastWidget ? lastWidget.desktop.x + 1 : 0;

    const newWidget: ExtendedWidget = {
      ...widget,
      id: `${widget.id}-${Date.now()}`,
      desktop: { x: desktopXPosition % 3, y: desktopYPosition + Math.floor(desktopXPosition / 3) },
      mobile: { x: 0, y: mobileYPosition },
      visible: true,
      props: {},
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
      const newWidget: ExtendedWidget = {
        ...widgetToDuplicate,
        id: `${widgetToDuplicate.id}-copy-${Date.now()}`,
        desktop: { ...widgetToDuplicate.desktop },
        mobile: { ...widgetToDuplicate.mobile },
      };
      return [...prev, newWidget];
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    setPlacedWidgets((prev) => {
      const oldIndex = prev.findIndex((widget) => widget.id === active.id);
      const newIndex = prev.findIndex((widget) => widget.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const newArray = arrayMove(prev, oldIndex, newIndex);

      return newArray.map((widget, index) => ({
        ...widget,
        desktop: {
          x: index % 3,
          y: Math.floor(index / 3),
        },
        mobile: {
          x: 0,
          y: index,
        },
      }));
    });
  };

  const DraggableWidget = React.memo(({ widget }: { widget: ExtendedWidget }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({
        id: widget.id,
      });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 1 : 0,
      position: "relative" as const,
      width: "100%",
    };

    return (
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "relative rounded-xl shadow-sm overflow-visible group",
          viewMode === "desktop" ? "w-[calc(33%-1rem)]" : "w-full",
          "opacity-100"
        )}
        layout
        initial={{ opacity: 1 }}
        animate={{ opacity: isDragging ? 0.7 : 1 }}
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
        <div className="p-3 hover:cursor-move w-full">{widget.preview}</div>
      </motion.div>
    );
  });

  DraggableWidget.displayName = "DraggableWidget";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mx-auto mt-4 border rounded-xl shadow-sm overflow-y-scroll min-h-[618px]">
            <motion.div
              layout
              className={cn(
                "transition-all duration-300 relative min-h-[618px]",
                viewMode === "desktop" ? "w-[1024px]" : "w-full min-w-[375px]"
              )}
              style={{
                borderRadius: "1rem",
              }}
            >
              <SortableContext
                items={placedWidgets.map((w) => w.id)}
                strategy={rectSortingStrategy}
              >
                <div
                  ref={containerRef}
                  className="relative rounded-xl p-4 min-h-[610px]"
                >
                  <div
                    className={cn(
                      "grid gap-4 w-full",
                      viewMode === "desktop"
                        ? "grid-cols-3 auto-rows-min"
                        : "grid-cols-1"
                    )}
                  >
                    <AnimatePresence>
                      {placedWidgets.map((widget) => (
                        <DraggableWidget key={widget.id} widget={widget} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </SortableContext>
            </motion.div>
          </div>
          <motion.div
            layout
            className="relative m-auto mt-4 flex flex-row gap-2 items-center"
          >
            <div className="flex justify-start">
              <div className="flex gap-3 items-center bg-muted/90 rounded-full p-2 shadow-lg backdrop-blur-md">
                <div className="pl-1 mr-2 flex flex-row gap-2 items-center">
                  <Link href="/app">
                    <ArrowLeftCircleIcon className="size-7" />
                  </Link>
                  <p className="text-lg">Untitled</p>
                </div>
                <WidgetDrawer onAdd={addWidget} />
                {!isMobile && (
                  <motion.div
                    onClick={() => setViewMode("desktop")}
                    className={cn(
                      "bg-transparent rounded-xl border border-white px-2 py-1.5 cursor-pointer",
                      viewMode === "desktop" ? "bg-white text-black" : ""
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Desktop
                  </motion.div>
                )}
                <motion.div
                  onClick={() => setViewMode("mobile")}
                  className={cn(
                    "bg-transparent rounded-xl border border-white px-2 py-1.5 cursor-pointer",
                    viewMode === "mobile" ? "bg-white text-black" : ""
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mobile
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div>
            {placedWidgets.find((w) => w.id === activeId)?.preview}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}