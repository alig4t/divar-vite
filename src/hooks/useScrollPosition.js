import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollPosition = (key) => {
  const location = useLocation();
  const scrollPositions = useRef(new Map());
  const isRestoringRef = useRef(false);

  // Load saved positions from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('scrollPositions');
    if (saved) {
      try {
        const entries = JSON.parse(saved);
        scrollPositions.current = new Map(entries);
        console.log('Loaded scroll positions:', scrollPositions.current);
      } catch (error) {
        console.error('Error loading scroll positions:', error);
      }
    }
  }, []);

  // Save scroll position when component unmounts or location changes
  useEffect(() => {
    const saveScrollPosition = () => {
      if (isRestoringRef.current) return; // Don't save while restoring
      
      const scrollY = window.scrollY;
      scrollPositions.current.set(key, scrollY);
      sessionStorage.setItem('scrollPositions', JSON.stringify(Array.from(scrollPositions.current.entries())));
      console.log(`Saved scroll position for ${key}:`, scrollY);
    };

    // Save position on scroll
    const handleScroll = () => {
      if (isRestoringRef.current) return;
      saveScrollPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Save position when leaving the page
    return () => {
      window.removeEventListener('scroll', handleScroll);
      saveScrollPosition();
    };
  }, [key]);

  // Restore scroll position when component mounts
  useEffect(() => {
    const savedPosition = scrollPositions.current.get(key);
    console.log(`Attempting to restore scroll position for ${key}:`, savedPosition);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      isRestoringRef.current = true;
      
      // Try multiple times to ensure DOM is ready
      const restoreScroll = (attempts = 0) => {
        if (attempts > 10) {
          isRestoringRef.current = false;
          return;
        }

        setTimeout(() => {
          console.log(`Restore attempt ${attempts + 1} for ${key}, scrolling to:`, savedPosition);
          window.scrollTo(0, savedPosition);
          
          // Check if scroll was successful
          setTimeout(() => {
            const currentScroll = window.scrollY;
            console.log(`Current scroll after restore:`, currentScroll);
            
            if (Math.abs(currentScroll - savedPosition) > 50 && attempts < 10) {
              restoreScroll(attempts + 1);
            } else {
              isRestoringRef.current = false;
            }
          }, 100);
        }, attempts === 0 ? 100 : 200);
      };

      restoreScroll();
    }
  }, [key]);

  return null;
};

export default useScrollPosition;