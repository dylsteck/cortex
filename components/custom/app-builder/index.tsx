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
  Maximize2,
  Minimize2,
  Copy
} from 'lucide-react'
import Link from 'next/link'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
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
  position: GridPosition
  size: "full" | "half"
  visible: boolean
  preview: React.ReactNode
  props?: Record<string, any>
}

function WidgetDrawer({ onAdd }: { onAdd: (widget: ExtendedWidget) => void }) {
  const [currentWidget, setCurrentWidget] = React.useState<ExtendedWidget | null>(null)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [open, setOpen] = React.useState(false)

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? WIDGETS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === WIDGETS.length - 1 ? 0 : prev + 1))
  }

  const filteredWidgets = WIDGETS.filter(widget => widget.appId === currentWidget?.appId)

  const handleAddWidget = (widget: ExtendedWidget) => {
    onAdd(widget)
    setCurrentWidget(null)
    setOpen(false)
    setCurrentSlide(0)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setCurrentWidget(null)
      setCurrentSlide(0)
    }
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
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
                onClick={() => handleAddWidget(currentWidget)}
              />
            </div>
            <div className="relative mt-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <ChevronLeft className={`size-6 cursor-pointer ${currentSlide > 0 ? '' : 'hidden'}`} onClick={handlePrev} />
                <div className="grow flex justify-center">
                  {currentWidget.component}
                </div>
                <ChevronRight className={`size-6 cursor-pointer ${currentSlide < filteredWidgets.length - 1 ? '' : 'hidden'}`} onClick={handleNext} />
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {filteredWidgets.map((_, index) => (
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
                        const widget = WIDGETS.find(w => w.id === 'icebreaker-profile')
                        if (widget) {
                          setCurrentWidget({ 
                            ...widget, 
                            position: { x: 0, y: 0, w: 10, h: 3 }, 
                            size: "full", 
                            visible: true, 
                            preview: widget.component 
                          } as ExtendedWidget)
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
    const lastWidget = placedWidgets[placedWidgets.length - 1]
    const yPosition = lastWidget ? lastWidget.position.y + lastWidget.position.h : 0

    const newWidget: ExtendedWidget = {
      ...widget,
      size: "full",
      position: { x: 0, y: yPosition, w: 10, h: 3 },
      visible: true,
      props: {}
    }
    setPlacedWidgets(prev => [...prev, newWidget])
  }

  const removeWidget = (index: number) => {
    setPlacedWidgets(prev => {
      const newWidgets = [...prev]
      newWidgets.splice(index, 1)
      return newWidgets
    })
  }

  const duplicateWidget = (index: number) => {
    setPlacedWidgets(prev => {
      const widgetToDuplicate = prev[index]
      const newWidget = {
        ...widgetToDuplicate,
        position: { ...widgetToDuplicate.position, y: widgetToDuplicate.position.y + 1 }
      }
      return [...prev, newWidget]
    })
  }

  const toggleWidgetSize = (index: number) => {
    setPlacedWidgets(prev => {
      const newWidgets = [...prev]
      newWidgets[index] = {
        ...newWidgets[index],
        size: newWidgets[index].size === "full" ? "half" : "full"
      }
      return newWidgets
    })
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
            <div className="relative size-full border-2 border-gray-200 rounded-xl p-4 space-y-4">
              {placedWidgets.map((widget, index) => (
                <div
                  key={widget.id}
                  className={cn(
                    "relative bg-white rounded-xl shadow-sm overflow-hidden group",
                    widget.size === "half" ? "w-1/2" : "w-full"
                  )}
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => toggleWidgetSize(index)}
                    >
                      {widget.size === "full" ? (
                        <Minimize2 className="size-4" />
                      ) : (
                        <Maximize2 className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => duplicateWidget(index)}
                    >
                      <Copy className="size-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeWidget(index)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="p-3">{widget.preview}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative m-auto mt-4 flex flex-row gap-2 items-center">
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