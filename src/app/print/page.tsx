'use client';

import React, { useEffect, useState } from 'react';
import { CanvasCenter } from '@/components/editor/CanvasCenter/CanvasCenter';

export default function PrintPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Allow a brief moment for layout, fonts, and images to complete rendering
    const timer = setTimeout(() => {
      window.print();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center font-sans">
        <p className="text-zinc-400">Preparando impresión...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full">
      <CanvasCenter />
    </div>
  );
}
