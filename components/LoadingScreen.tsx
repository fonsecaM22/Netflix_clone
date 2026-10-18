
"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [testLoading, setTestLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTestLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!testLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#e50914]" />
        <p className="text-sm text-gray-300">
          Loading your Netflix experience...
        </p>
      </div>
    </div>
  );
}
