import { useEffect, useCallback } from 'react';

type KeyCombination = {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
};

type HotkeyHandler = (event: KeyboardEvent) => void;

export function createBasicHookImplementation() {
  const useHotkeys = (
    keyCombination: KeyCombination,
    handler: HotkeyHandler
  ) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
      const { key, ctrl, alt, shift } = keyCombination;
      
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      if (ctrl !== undefined && event.ctrlKey !== ctrl) return;
      if (alt !== undefined && event.altKey !== alt) return;
      if (shift !== undefined && event.shiftKey !== shift) return;
      
      handler(event);
    }, [key, ctrl, alt, shift, handler]);

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleKeyDown]);
  };

  return { useHotkeys };
}
