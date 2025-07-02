'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Constellation from './ui/constellation';

export default function ThemedConstellation() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [starCount, setStarCount] = useState(80);

  // Avoid hydration mismatch and calculate star count
  useEffect(() => {
    setMounted(true);
    const updateStarCount = () => {
      if (typeof window !== 'undefined') {
        setStarCount(window.innerWidth > 768 ? 100 : 60);
      }
    };
    
    updateStarCount();
    window.addEventListener('resize', updateStarCount);
    
    return () => {
      window.removeEventListener('resize', updateStarCount);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <Constellation
      className="opacity-50"
      starColor={isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(99, 102, 241, 0.5)"}
      lineColor={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(99, 102, 241, 0.2)"}
      starWidth={isDark ? 1.8 : 1.2}
      velocity={0.02}
      starCount={starCount}
    />
  );
}
