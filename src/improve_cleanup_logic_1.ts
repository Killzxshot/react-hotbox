import { useEffect, useRef } from 'react';

export function useCleanupLogic() {
  const eventListeners = useRef<Array<{ element: EventTarget; type: string; handler: EventListener }>>([]);

  const addEventListener = <T extends Event>(
    element: EventTarget,
    type: string,
    handler: (event: T) => void
  ) => {
    element.addEventListener(type, handler);
    eventListeners.current.push({ element, type, handler });
  };

  useEffect(() => {
    return () => {
      eventListeners.current.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
      eventListeners.current = [];
    };
  }, []);

  return { addEventListener };
}
