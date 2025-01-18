/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import PreviewBadge from "./preview-badge";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Badge } from "../ui/badge";

export function ToolResponse({ badgeTitle, bodyTitle, images, items, renderItem, keyExtractor }: { badgeTitle: string, bodyTitle: string, images: string[], items: any, renderItem: (item: any) => React.ReactNode, keyExtractor: (item: any) => string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  return (
      <div className="relative">
        <PreviewBadge title={badgeTitle} images={images} onClick={() => setIsOpen(!isOpen)} />
        <ToolResponseBody
          isDesktop={isDesktop}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={bodyTitle}
          items={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </div>
  )
}

function ToolResponseBody({ isDesktop, isOpen, onClose, title, items, renderItem, keyExtractor }: { isDesktop: boolean, isOpen: boolean, onClose: () => void, title: string, items: any[], renderItem: (item: any) => React.ReactNode, keyExtractor: (item: any) => string }) {
  if (!isOpen) return null
  if (isDesktop) {
    return (
      <motion.div 
        initial={{ x: "100%" }} 
        animate={{ x: 0 }} 
        exit={{ x: "100%" }} 
        transition={{ type: "spring", stiffness: 300, damping: 30 }} 
        className="fixed right-0 top-0 h-full w-80 bg-zinc-900 text-white shadow-lg p-4 z-50 overflow-y-scroll"
      >
        <div className="flex flex-row gap-4 items-center">
          <XIcon className="size-6 cursor-pointer" onClick={onClose} />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="mt-4 space-y-2 max-w-full">
          {items.map((item) => (
            <div key={keyExtractor(item)} className="flex items-center space-x-2 w-full">
              <span className="text-sm w-full">{renderItem(item)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="pl-4 pb-2 flex flex-row gap-2 items-start overflow-y-auto max-w-full max-h-[30vh]">
          {items.map((item) => (
            <div key={keyExtractor(item)} className="w-full">
              <span className="text-sm w-full break-words">{renderItem(item)}</span>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}