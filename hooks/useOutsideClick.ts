import { useCallback, useEffect, useRef } from 'react';

const useOutsideClick = <T extends HTMLElement>(onClose: () => void) => {
  const ref = useRef<T>(null);

  const clickListener = useCallback(
    (e: PointerEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      onClose?.();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('pointerup', clickListener);

    return () => {
      document.removeEventListener('pointerup', clickListener);
    };
  }, [clickListener]);

  return ref;
};

export default useOutsideClick;
