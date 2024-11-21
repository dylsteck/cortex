'use client'

import {
  Sparkles,
  Square,
  SquareStack,
  Search,
  BarChart3,
  LineChart,
  ChevronLeft,
  Trash2,
} from 'lucide-react'
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [showWidgetSelection, setShowWidgetSelection] = React.useState(false)
  const [placedWidgets, setPlacedWidgets] = React.useState<PlacedWidget[]>([])
  const [selectedWidget, setSelectedWidget] = React.useState<PlacedWidget | null>(null)
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = React.useState(false)

  const addWidget = (widget: Widget) => {
    setShowWidgetSelection(true)
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

  const handleResize = (widgetId: string, newSize: "small" | "medium" | "large") => {
    setPlacedWidgets(widgets =>
      widgets.map(widget => {
        if (widget.id === widgetId) {
          const sizeMap: Record<string, GridPosition> = {
            small: { x: widget.position.x, y: widget.position.y, w: 2, h: 2 },
            medium: { x: widget.position.x, y: widget.position.y, w: 4, h: 3 },
            large: { x: widget.position.x, y: widget.position.y, w: 6, h: 4 }
          }
          return {
            ...widget,
            size: newSize,
            position: sizeMap[newSize]
          }
        }
        return widget
      })
    )
  }

  const updateWidgetProp = (widgetId: string, prop: string, value: any) => {
    setPlacedWidgets(widgets =>
      widgets.map(widget => {
        if (widget.id === widgetId) {
          return {
            ...widget,
            props: {
              ...widget.props,
              [prop]: value
            }
          }
        }
        return widget
      })
    )
  }

  const deleteWidget = (widgetId: string) => {
    setPlacedWidgets(widgets => widgets.filter(w => w.id !== widgetId))
    setSelectedWidget(null)
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ChevronLeft className="size-4 cursor-pointer" />
            <Input placeholder="Untitled Project" className="w-[200px] h-8" />
          </div>
          <div className="flex items-center gap-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "desktop" | "mobile")}>
              <TabsList>
                <TabsTrigger value="desktop">Desktop</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
            >
              {rightSidebarCollapsed ? <ChevronLeft className="size-4 rotate-180" /> : <ChevronLeft className="size-4" />}
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 bg-muted/30 overflow-hidden">
          {showWidgetSelection ? (
            <div className="grid grid-cols-2 gap-4">
              {WIDGETS.map((widget) => (
                <button
                  key={widget.id}
                  className="rounded-lg border p-4 hover:bg-muted text-left transition-colors"
                  onClick={() => {
                    addWidget(widget)
                    setShowWidgetSelection(false)
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      {widget.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{widget.name}</h3>
                      <p className="text-sm text-muted-foreground">{widget.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "mx-auto bg-background rounded-xl shadow-sm border transition-all duration-200 overflow-hidden",
                viewMode === "desktop" ? "w-full max-w-6xl h-[600px]" : "w-[390px] h-[844px]"
              )}
            >
              <div
                className="relative size-full"
                style={{
                  backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                  backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
                }}
              >
                {placedWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className={cn(
                      "absolute group cursor-move",
                      selectedWidget?.id === widget.id && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{
                      left: widget.position.x,
                      top: widget.position.y,
                      width: widget.position.w * GRID_SIZE,
                      height: widget.position.h * GRID_SIZE,
                      opacity: widget.visible ? 1 : 0.5,
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => setSelectedWidget(widget)}
                  >
                    <div className="h-full rounded-xl border bg-card shadow-sm overflow-hidden">
                      <div className="absolute inset-0 p-3">{widget.preview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      {!rightSidebarCollapsed && (
        <div className="border-l flex flex-col w-[320px]">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Widget Editor</h2>
          </div>
          <ScrollArea className="flex-1 p-4">
            {selectedWidget ? (
              <div className="space-y-6">
                <div>
                  <Label>Size</Label>
                  <Select
                    value={selectedWidget.size}
                    onValueChange={(value) => handleResize(selectedWidget.id, value as "small" | "medium" | "large")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedWidget.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedWidget.editableProps?.map((prop) => (
                  <div key={prop}>
                    <Label>{prop}</Label>
                    <Input
                      value={selectedWidget.props[prop] || ""}
                      onChange={(e) => updateWidgetProp(selectedWidget.id, prop, e.target.value)}
                    />
                  </div>
                ))}
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => deleteWidget(selectedWidget.id)}
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete Widget
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Select a widget to edit or add a new one.</p>
                {WIDGETS.map((widget) => (
                  <button
                    key={widget.id}
                    className="w-full rounded-lg border p-4 hover:bg-muted text-left transition-colors"
                    onClick={() => addWidget(widget)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-md bg-primary/10 text-primary">
                        {widget.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{widget.name}</h3>
                        <p className="text-sm text-muted-foreground">{widget.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}