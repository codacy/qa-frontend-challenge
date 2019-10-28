import { useRef, useEffect } from 'react';

export const useTriggerOnView = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      // The pageYOffset property returns the pixels the current document has been scrolled from the upper left corner of the window, vertically.
      if (window.pageYOffset + window.innerHeight > ref.current.offsetTop) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
  return ref;
};
