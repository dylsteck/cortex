"use client"

import Image from "next/image"
import React from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function AppSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="hidden lg:block border-r">
          <SidebarHeader className="p-4">
            <SidebarMenu>
              <SidebarMenuItem className="flex flex-row gap-2 items-center">
                <span>Acme Inc</span>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="flex flex-col h-full justify-between">
            <div className="space-y-4">
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 text-sm font-medium text-muted-foreground">Favorites</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="flex items-center gap-2 px-4 py-2 hover:bg-muted/50">
                        <span>📁</span>
                        <span>Unnamed</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
            <div className="p-4">
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full overflow-hidden bg-background">
                    <Image src="/placeholder.svg?height=32&width=32" alt="Profile" width={32} height={32} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">shadcn</span>
                    <span className="text-xs text-muted-foreground">m@example.com</span>
                  </div>
                </div>
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        {children}
      </div>
    </SidebarProvider>
  )
}