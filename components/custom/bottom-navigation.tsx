import { Home, Users, MessageCircle } from 'lucide-react'
import Link from "next/link"

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-black/80 backdrop-blur-sm border-t border-gray-800">
      <nav className="flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto md:max-w-[calc(100%-240px)] w-full">
        <Link 
          href="/" 
          className="flex flex-col items-center gap-1 text-white hover:text-gray-300 transition-colors"
        >
          <Home className="size-6" />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link 
          href="/chat" 
          className="flex flex-col items-center justify-center bg-blue-500 rounded-full size-16 -mt-8 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <MessageCircle className="size-8 text-white" />
          <span className="text-xs text-white">Chat</span>
        </Link>
        
        <Link 
          href="/profile" 
          className="flex flex-col items-center gap-1 text-white hover:text-gray-300 transition-colors"
        >
          <Users className="size-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  )
}