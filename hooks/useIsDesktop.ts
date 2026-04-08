import { useState, useEffect } from 'react';

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    // Set initial value
    setIsDesktop(mediaQuery.matches);

    // Create listener
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDesktop;
}
