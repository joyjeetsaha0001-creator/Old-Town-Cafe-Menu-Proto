"use client";

import { useEffect, useRef } from "react";

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryClick,
}) {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  /*
   * ---------------------------------------------------------
   * AUTOMATICALLY SCROLL ACTIVE CATEGORY INTO VIEW
   * ---------------------------------------------------------
   *
   * When the vertically scrolling menu changes the active
   * category, move the horizontal category bar so that the
   * active category is visible.
   *
   * We calculate scrollLeft ourselves instead of using
   * scrollIntoView() because scrollIntoView() can sometimes
   * move the entire page on mobile browsers.
   */

  useEffect(() => {
    if (!activeCategory) {
      return;
    }

    const container = containerRef.current;
    const activeButton =
      buttonRefs.current[activeCategory];

    if (!container || !activeButton) {
      return;
    }

    /*
     * Wait until the browser has finished rendering the
     * newly active button state.
     */
    const frame = window.requestAnimationFrame(() => {
      const containerWidth =
        container.clientWidth;

      const buttonLeft =
        activeButton.offsetLeft;

      const buttonWidth =
        activeButton.offsetWidth;

      /*
       * Try to place the active category near the center
       * of the horizontal navigation bar.
       */
      const targetScrollLeft =
        buttonLeft -
        (containerWidth - buttonWidth) / 2;

      const maxScrollLeft =
        container.scrollWidth -
        container.clientWidth;

      const safeScrollLeft = Math.max(
        0,
        Math.min(
          targetScrollLeft,
          maxScrollLeft
        )
      );

      container.scrollTo({
        left: safeScrollLeft,
        behavior: "smooth",
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeCategory]);

  return (
    <nav
      aria-label="Food categories"
      className="w-full"
    >
      <div
        ref={containerRef}
        className="scrollbar-hide flex gap-2 overflow-x-auto overscroll-x-contain pb-1"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {categories.map((category) => {
          const active =
            category === activeCategory;

          return (
            <button
              key={category}
              ref={(element) => {
                buttonRefs.current[category] =
                  element;
              }}
              type="button"
              onClick={() =>
                onCategoryClick(category)
              }
              aria-current={
                active
                  ? "true"
                  : undefined
              }
              className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-200 ${
                active
                  ? "bg-[#4d3b2b] text-white shadow-md"
                  : "border border-[#dfd1bc] bg-[#fffaf1] text-[#6e5b48]"
              } active:scale-95`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </nav>
  );
}