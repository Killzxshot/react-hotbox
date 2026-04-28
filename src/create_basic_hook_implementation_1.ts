import { useEffect, useCallback } from 'react';

type KeyboardEventCallback = (event: KeyboardEvent) => void;

export function createBasicHookImplementation() {
  const useHotkeys = (
    keyMap: Record<string, KeyboardEventCallback>,
    deps: unknown[] = []
  ) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
      const callback = keyMap[`${event.key.toLowerCase()}`];
      if (callback) {
        callback(event);
      }
    }, [keyMap]);

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleKeyDown, ...deps]);
  };

  return { useHotkeys };
}
