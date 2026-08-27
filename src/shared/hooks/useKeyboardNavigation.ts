import { useEffect } from "react";

export const useKeyboardNavigation = (containerRef: React.RefObject<HTMLDivElement | null>, isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const cityButtons = Array.from(container.querySelectorAll<HTMLButtonElement>("[data-city-item]"));
      if (cityButtons.length === 0) return;

      const activeElement = document.activeElement as HTMLElement;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();

        const currentIndex = cityButtons.findIndex((btn) => btn === activeElement);

        let nextIndex = 0;
        if (e.key === "ArrowDown") {
          nextIndex = currentIndex < cityButtons.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === "ArrowUp") {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : cityButtons.length - 1;
        }

        cityButtons[nextIndex]?.focus();
      }
    };

    const container = containerRef.current;
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, containerRef]);
};
