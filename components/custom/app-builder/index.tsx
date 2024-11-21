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
import WidgetDrawer from './widgets/widget-drawer'

interface GridPosition {
  x: number
  y: number
  w: number
  h: number
}

const GRID_SIZE = 10

export interface ExtendedWidget extends Widget {
  position: GridPosition
  size: "full" | "half"
  visible: boolean
  preview: React.ReactNode
  props?: Record<string, any>
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
              viewMode === "desktop" ? "w-[1728px] h-[1024px] max-w-full" : "w-[428px] h-[844px]"
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
                    {viewMode === 'desktop' ? 
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
                      : null
                    }
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