import { Blocks, Command, Plus } from "lucide-react";
import Image from "next/image";

import AppSectionLayout from "@/components/custom/app-section-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHomepage(){

  const templates = [
    {
      title: "Create New",
      description: "Start a new project from scratch",
      icon: Plus,
      color: "bg-card hover:bg-card/80",
    },
    {
      title: "AI",
      description: "Build with the latest in AI",
      icon: "/placeholder.svg?height=40&width=40",
      color: "bg-blue-500",
      isImage: true
    },
    {
      title: "Websites",
      description: "Build and host websites and apps",
      icon: Blocks,
      color: "bg-amber-700"
    },
    {
      title: "Verified Partners",
      description: "SDKs and guides from top tech companies",
      icon: Command,
      color: "bg-green-900"
    },
  ]

  const topApps = [
    { name: "Farcaster Client", icon: "/placeholder.svg?height=40&width=40", description: "Official Farcaster desktop client" },
    { name: "Warpcast", icon: "/placeholder.svg?height=40&width=40", description: "Mobile-first Farcaster experience" },
    { name: "Farcaster Analytics", icon: "/placeholder.svg?height=40&width=40", description: "Insights for your Farcaster presence" },
    { name: "Cast Scheduler", icon: "/placeholder.svg?height=40&width=40", description: "Schedule and automate your casts" },
  ]

  return(
    <AppSectionLayout>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold">Home</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="w-full max-w-full space-y-8 p-6">
            <section>
              <h2 className="mb-4 text-lg font-semibold">Templates</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {templates.map((template, index) => (
                  <Card key={template.title} className={`group relative overflow-hidden ${template.color} ${index === 0 ? 'text-card-foreground' : 'text-white'} hover:opacity-90`}>
                    <CardHeader>
                      <CardTitle className="text-base">{template.title}</CardTitle>
                      <CardDescription className={index === 0 ? "text-muted-foreground" : "text-white/70"}>
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      {template.isImage ? (
                        <Image
                          src={template.icon}
                          alt=""
                          width={40}
                          height={40}
                          className="absolute bottom-2 right-2 size-10 opacity-50 transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <template.icon className="absolute bottom-2 right-2 size-10 opacity-50 transition-transform group-hover:scale-110" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">Top Apps</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {topApps.map((app) => (
                  <Card key={app.name} className="hover:bg-muted/50">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                      <Image
                        src={app.icon}
                        alt={`${app.name} logo`}
                        width={40}
                        height={40}
                        className="size-10 rounded-md"
                      />
                      <div className="grid gap-1">
                        <CardTitle className="text-sm">{app.name}</CardTitle>
                        <CardDescription className="text-xs">{app.description}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </AppSectionLayout>
  )
}