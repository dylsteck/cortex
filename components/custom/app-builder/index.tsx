'use client'

import {
  Sparkles,
  Square,
  SquareStack,
  Search,
  BarChart3,
  LineChart,
  Trash2,
  ArrowLeftCircleIcon,
  PlusCircleIcon,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

import { APPS, Widget, WIDGETS } from './widgets'

interface GridPosition {
  x: number
  y: number
  w: number
  h: number
}

const GRID_SIZE = 10

interface ExtendedWidget extends Widget {
  position: GridPosition;
  size: string;
  visible: boolean;
  preview: React.ReactNode;
  props?: Record<string, any>; // Added props as an optional property
}

function WidgetDrawer({ onAdd }: { onAdd: (widget: ExtendedWidget) => void }) {
  const [currentWidget, setCurrentWidget] = React.useState<ExtendedWidget | null>(null)
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? WIDGETS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === WIDGETS.length - 1 ? 0 : prev + 1))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <PlusCircleIcon className="size-7 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          "fixed bottom-0 left-0 right-0 w-full bg-black dark:bg-white text-white dark:text-black rounded-t-xl shadow-lg border border-gray-200 mx-auto max-w-auto md:max-w-[30%]",
          "p-4 outline-none"
        )}
      >
        {currentWidget ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <ChevronLeft 
                className="size-6 cursor-pointer"
                onClick={() => setCurrentWidget(null)}
              />
              <h2 className="text-xl font-medium">{currentWidget.name}</h2>
              <Check 
                className="size-6 cursor-pointer"
                onClick={() => {
                  onAdd(currentWidget)
                  setCurrentWidget(null)
                }}
              />
            </div>
            <div className="relative mt-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <ChevronLeft className="size-6 cursor-pointer" onClick={handlePrev} />
                <div className="grow text-center">
                  {(currentWidget as any).component}
                </div>
                <ChevronRight className="size-6 cursor-pointer" onClick={handleNext} />
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {WIDGETS.map((_, index) => (
                  <div
                    key={index}
                    className={`size-2 rounded-full ${
                      index === currentSlide ? 'bg-primary' : 'bg-muted'
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
            <div className="mt-4 overflow-y-scroll max-h-[50vh]">
              {APPS.map((app) => (
                <div key={app.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="size-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg mr-3" />
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const widget = WIDGETS.find(w => w.id === 'icebreaker-profile');
                        if (widget) {
                          setCurrentWidget({ ...widget, position: { x: 0, y: 0, w: 4, h: 3 }, size: "medium", visible: true, preview: widget.component } as ExtendedWidget);
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
  )
}

export default function AppBuilder() {
  const [viewMode, setViewMode] = React.useState<"desktop" | "mobile">("desktop")
  const [placedWidgets, setPlacedWidgets] = React.useState<ExtendedWidget[]>([])
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth <= 768) {
        setViewMode("mobile")
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const addWidget = (widget: ExtendedWidget) => {
    const newWidget: ExtendedWidget = {
      ...widget,
      size: "medium",
      position: { x: 0, y: 0, w: 4, h: 3 },
      visible: true,
      props: {}
    }
    setPlacedWidgets(prev => [...prev, newWidget])
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl px-4 mt-4 text-left">
        </div>
        <div className="relative mx-auto mt-4 border rounded-xl shadow-sm overflow-hidden">
          <div
            className={cn(
              "transition-all duration-200 overflow-hidden",
              viewMode === "desktop" ? "w-[1200px] h-[800px] max-w-full" : "w-[390px] h-[844px]"
            )}
          >
            <div
              className="relative size-full border-2 border-gray-200 rounded-xl"
              style={{
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
              }}
            >
              {placedWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className={cn("absolute group cursor-move")}
                  style={{
                    left: widget.position.x,
                    top: widget.position.y,
                    width: widget.position.w * GRID_SIZE,
                    height: widget.position.h * GRID_SIZE,
                    opacity: widget.visible ? 1 : 0.5,
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <div className="h-full rounded-xl border bg-white shadow-sm overflow-hidden">
                    <div className="absolute inset-0 p-3">{widget.preview}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative m-auto mt-4 flex flex-row gap-2 items-center">
          <div className="flex justify-center">
            <div className="flex gap-3 items-center bg-muted/90 rounded-full p-2 shadow-lg backdrop-blur-md">
              <div className="pl-1 mr-2 flex flex-row gap-2 items-center">
                <Link href="/app">
                  <ArrowLeftCircleIcon className="size-7" />
                </Link>
                <p className="text-lg">Unnamed</p>
              </div>
              <WidgetDrawer onAdd={addWidget} />
              {!isMobile && (
                <div 
                  onClick={() => setViewMode("desktop")} 
                  className={cn(`bg-transparent rounded-xl border border-white px-2 py-1.5 cursor-pointer ${viewMode === 'desktop' ? 'bg-white text-black' : ''}`)}
                >
                  Desktop
                </div>
              )}
              <div 
                onClick={() => setViewMode("mobile")} 
                className={cn(`bg-transparent rounded-xl border border-white px-2 py-1.5 cursor-pointer ${viewMode === 'mobile' ? 'bg-white text-black' : ''}`)}
              >
                Mobile
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}