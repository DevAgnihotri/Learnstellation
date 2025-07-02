'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Constellation from "./constellation";

interface ThemedConstellationProps {
  className?: string;
  velocity?: number;
  starWidth?: number;
  starCount?: number;
}

export default function ThemedConstellation({
  className,
  velocity = 0.03,
  starWidth = 1.5,
  starCount
}: ThemedConstellationProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';
  
  // Theme-aware colors that look good on both light and dark backgrounds
  const starColor = isDark 
    ? "rgba(147, 197, 253, 0.9)" // Light blue for dark mode
    : "rgba(59, 130, 246, 0.7)"; // Darker blue for light mode
    
  const lineColor = isDark 
    ? "rgba(147, 197, 253, 0.3)" // Light blue for dark mode
    : "rgba(59, 130, 246, 0.3)"; // Darker blue for light mode

  return (
    <Constellation
      className={className}
      starColor={starColor}
      lineColor={lineColor}
      velocity={velocity}
      starWidth={starWidth}
      starCount={starCount}
    />
  );
}
