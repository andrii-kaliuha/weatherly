import { useRef, useEffect, RefObject } from "react";

export function useHorizontalScroll(): RefObject<HTMLUListElement> {
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollRef.current) scrollRef.current.scrollLeft += event.deltaY;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, []);

  return scrollRef;
}
