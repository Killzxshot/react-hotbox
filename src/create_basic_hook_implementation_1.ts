import { useEffect, useCallback } from 'react';

type HotkeyHandler = (event: KeyboardEvent) => void;
type HotkeyMap = Map<string, HotkeyHandler>;

export function createBasicHookImplementation() {
  const hotkeyMap: HotkeyMap = new Map();
  
  const useHotkeys = (key: string, handler: HotkeyHandler) => {
    const handlerCallback = useCallback(handler, []);
    
    useEffect(() => {
      hotkeyMap.set(key, handlerCallback);
      
      const handleKeyDown = (event: KeyboardEvent) => {
        const handler = hotkeyMap.get(key);
        if (handler) {
          handler(event);
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        hotkeyMap.delete(key);
      };
    }, [key, handlerCallback]);
  };
  
  return { useHotkeys };
}
