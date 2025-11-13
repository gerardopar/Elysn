import React from "react";

/**
 * A custom React hook that provides functionality to scroll a container to its bottom.
 *
 * @param containerRef - A React ref object pointing to the scrollable container element.
 * @returns A function that, when called, will smoothly scroll the container to its bottom.
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const scrollToBottom = useScrollToBottom(containerRef);
 *
 * // Later in your component:
 * <div ref={containerRef} style={{ overflowY: 'auto', height: '400px' }}>
 *   {/* Content that can overflow *\/}
 * </div>
 * <button onClick={scrollToBottom}>Scroll to Bottom</button>
 * ```
 */
export const useScrollToBottom = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  /**
   * Scrolls the container to its bottom using smooth scrolling.
   * Does nothing if the container reference is not available.
   */
  const scrollToBottom = () => {
    if (!containerRef?.current) return;
    containerRef?.current?.scrollTo({
      top: containerRef?.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  return scrollToBottom;
};
