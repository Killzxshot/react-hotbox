import { useEffect, useCallback } from 'react';

type HotkeyHandler = (event: KeyboardEvent) => void;
type HotkeyMap = Map<string, HotkeyHandler>;

export function createBasicHookImplementation() {
  const hotkeyMap: HotkeyMap = new Map();
  
  const useHotkeys = (key: string, handler: HotkeyHandler) => {
    useEffect(() => {
      hotkeyMap.set(key, handler);
      
      return () => {
        hotkeyMap.delete(key);
      };
    }, [key, handler]);
  };
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const handler = hotkeyMap.get(event.key);
    if (handler) {
      handler(event);
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return { useHotkeys };
}
