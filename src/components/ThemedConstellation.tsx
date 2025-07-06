'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Constellation } from './ui/constellation';

interface ThemedConstellationProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  particleSpeed?: number;
}

export const ThemedConstellation: React.FC<ThemedConstellationProps> = (props) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Determine the actual theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const themeMode = currentTheme === 'dark' ? 'dark' : 'light';

  return (
    <Constellation
      {...props}
      theme={themeMode}
    />
  );
};

export default ThemedConstellation;
