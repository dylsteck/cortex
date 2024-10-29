import { XIcon } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'

interface IframeProps {
  url: string
  name: string
}

const Iframe = ({ url, name }: IframeProps) => {
  const [inputUrl, setInputUrl] = useState<string>(url)
  const [selected, setSelected] = useState<boolean>(false)

  const getDomainName = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '')
      return domain
    } catch {
      return ''
    }
  }

  return (
    <Card className="w-full max-w-3xl bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-lg border-0">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-mono text-orange-950">
          {name}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelected(false)}
          className="size-8 hover:bg-orange-300/20"
        >
          <XIcon className="size-4 text-orange-900" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="w-full">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter URL"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-white/80 border-orange-300 focus-visible:ring-orange-400"
            />
            <Button
              variant="secondary"
              className="bg-green-200 hover:bg-green-300 text-green-800 font-medium shadow-sm"
              onClick={() => setSelected(true)}
            >
              search
            </Button>
          </div>
        </div>

        {selected && inputUrl && (
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-white/80 shadow-inner">
            <iframe
              src={inputUrl}
              className="size-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-between items-center px-4 pb-4">
        <Button
          variant="secondary"
          className="bg-pink-200 hover:bg-pink-300 text-pink-800 font-medium px-8 shadow-sm"
          onClick={() => setSelected(true)}
        >
          select a URL
        </Button>
        {inputUrl && (
          <span className="text-sm font-mono text-orange-800/80">
            {getDomainName(inputUrl)}
          </span>
        )}
      </CardFooter>
    </Card>
  )
}

export default Iframe