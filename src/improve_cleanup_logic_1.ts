import { useEffect, useRef } from 'react';

export function useCleanupLogic() {
  const cleanupRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => cleanup());
      cleanupRef.current = [];
    };
  }, []);

  const addCleanup = (cleanup: () => void) => {
    cleanupRef.current.push(cleanup);
  };

  return { addCleanup };
}
