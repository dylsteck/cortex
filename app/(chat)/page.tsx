"use client"
import { ChevronUp, ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

import { ChatHeader } from '@/components/custom/chat-header';

const CONTENT = [1, 2, 3];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < CONTENT.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: currentIndex * window.innerHeight,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <>
      <ChatHeader />
      <div
        ref={scrollContainerRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-transparent relative"
      >
        {CONTENT.map((_, index) => (
          <div
            key={index}
            className="h-screen w-screen snap-center flex items-center justify-center"
          >
            <div className="relative w-[360px] h-[640px] border-2 border-white rounded-lg flex items-center justify-center"></div>
          </div>
        ))}
        <div className="hidden lg:block">
          <div
            className="absolute top-1/3 right-4 cursor-pointer z-10"
            onClick={handlePrev}
          >
            <ChevronUp className="text-white/70 hover:text-white" size={48} />
          </div>
          <div
            className="absolute bottom-1/3 right-4 cursor-pointer z-10"
            onClick={handleNext}
          >
            <ChevronDown className="text-white/70 hover:text-white" size={48} />
          </div>
        </div>
      </div>
    </>
  );
}