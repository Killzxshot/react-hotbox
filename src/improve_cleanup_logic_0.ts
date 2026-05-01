import { useEffect, useRef } from 'react';

export function useCleanupLogic() {
  const cleanupRefs = useRef<(() => void)[]>([]);

  useEffect(() => {
    return () => {
      cleanupRefs.current.forEach(cleanup => cleanup());
      cleanupRefs.current = [];
    };
  }, []);

  const addCleanup = (cleanup: () => void) => {
    cleanupRefs.current.push(cleanup);
  };

  return { addCleanup };
}
