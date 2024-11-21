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
} from 'lucide-react'
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
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Widget {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  sizes: ("small" | "medium" | "large")[]
  preview: React.ReactNode
  editableProps?: string[]
}

interface GridPosition {
  x: number
  y: number
  w: number
  h: number
}

interface PlacedWidget extends Widget {
  position: GridPosition
  size: "small" | "medium" | "large"
  visible: boolean
  props: Record<string, any>
}

const GRID_SIZE = 10

const WIDGETS: Widget[] = [
  {
    id: "icebreaker",
    name: "Icebreaker",
    description: "Start a conversation or idea",
    icon: <Sparkles className="size-6" />,
    sizes: ["small", "medium", "large"],
    preview: (
      <div className="flex flex-col items-center justify-center h-full space-y-2">
        <Sparkles className="size-8 text-primary" />
        <div className="text-2xl font-semibold">Lets Begin</div>
      </div>
    ),
    editableProps: ["prompt", "topic"]
  },
  {
    id: "nounsBuilder",
    name: "Nouns Builder",
    description: "Create and explore noun ideas",
    icon: <Square className="size-6" />,
    sizes: ["medium", "large"],
    preview: (
      <div className="flex items-center justify-between h-full p-4">
        <div>
          <div className="text-3xl font-bold">Noun</div>
          <div className="text-sm text-muted-foreground">Build together</div>
        </div>
        <SquareStack className="size-12 text-blue-500" />
      </div>
    ),
    editableProps: ["input", "categories"]
  },
  {
    id: "farcaster",
    name: "Farcaster",
    description: "Discover and connect with others",
    icon: <Search className="size-6" />,
    sizes: ["medium", "large"],
    preview: (
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="size-4 rounded-sm border mr-2" />
          <div className="text-sm">Explore communities</div>
        </div>
        <div className="flex items-center">
          <div className="size-4 rounded-sm border mr-2" />
          <div className="text-sm">Join discussions</div>
        </div>
      </div>
    ),
    editableProps: ["filters", "network"]
  },
  {
    id: "zora",
    name: "Zora",
    description: "Explore art and culture",
    icon: <BarChart3 className="size-6" />,
    sizes: ["medium", "large"],
    preview: (
      <div className="flex items-center justify-between h-full p-4">
        <div>
          <div className="text-3xl font-bold">Art</div>
          <div className="text-sm text-muted-foreground">Discover trends</div>
        </div>
        <LineChart className="size-12 text-green-500" />
      </div>
    ),
    editableProps: ["collections", "viewMode"]
  },
]

export default function AppBuilder() {
  const [viewMode, setViewMode] = React.useState<"desktop" | "mobile">("desktop")
  const [placedWidgets, setPlacedWidgets] = React.useState<PlacedWidget[]>([])
  const [selectedWidget, setSelectedWidget] = React.useState<PlacedWidget | null>(null)
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

  const addWidget = (widget: Widget) => {
    const newWidget: PlacedWidget = {
      ...widget,
      size: "medium",
      position: { x: 0, y: 0, w: 4, h: 3 },
      visible: true,
      props: {}
    }
    setPlacedWidgets(prev => [...prev, newWidget])
    setSelectedWidget(newWidget)
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
                <ArrowLeftCircleIcon className="size-7 cursor-pointer" />
                <p className="text-lg">Unnamed</p>
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <PlusCircleIcon className="size-7 cursor-pointer" />
                </DrawerTrigger>
                <DrawerContent
                  className={cn(
                    "fixed bottom-0 left-0 right-0 w-full bg-white rounded-t-xl shadow-lg border border-gray-200 mx-auto max-w-auto md:max-w-[50%]",
                    "p-4 outline-none"
                  )}
                >
                  <DrawerHeader>
                    <DrawerTitle className="text-lg font-medium">Add Widget</DrawerTitle>
                  </DrawerHeader>
                  <div className="text-sm text-muted-foreground">
                    Use this drawer to add a new widget to your layout.
                  </div>
                  <div className="mt-4 overflow-y-auto max-h-[50vh]">
                    <h2 className="text-xl font-semibold mb-4">All</h2>
                    {WIDGETS.map((widget) => (
                      <div key={widget.id} className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg mr-3" />
                          <div>
                            <p className="font-medium">{widget.name}</p>
                            <p className="text-sm text-muted-foreground">{widget.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="secondary"
                          onClick={() => addWidget(widget)}
                          className="w-full"
                        >
                          Add {widget.name}
                        </Button>
                      </div>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>
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
