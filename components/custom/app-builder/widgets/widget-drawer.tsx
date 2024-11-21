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
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

import { type ExtendedWidget } from '..'

import { APPS, Widget, WIDGETS } from './index'

interface GridPosition {
  x: number
  y: number
  w: number
  h: number
}

const GRID_SIZE = 10

export default function WidgetDrawer({ onAdd }: { onAdd: (widget: ExtendedWidget) => void }) {
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
              <div className="flex flex-col gap-0 items-center">
                <h2 className="text-xl font-medium">{currentWidget.name}</h2>
                <p className="text-sm text-light">{currentWidget.description}</p>
              </div>
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