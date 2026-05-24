import { useRef, useEffect, RefObject } from "react";

export function useHorizontalScroll<T extends HTMLElement>(): RefObject<T> {
  const scrollRef = useRef<T | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollRef.current) scrollRef.current.scrollLeft += event.deltaY;
    };

    const element = scrollRef.current;
    if (element) element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (element) element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return scrollRef;
}
