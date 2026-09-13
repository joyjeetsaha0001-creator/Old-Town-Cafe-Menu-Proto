"use client";

import { Search, Utensils, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import menuData from "@/data/menu";
import { saveTable } from "@/lib/cart";

import MenuItemCard from "./MenuItemCard";
import CategoryTabs from "./CategoryTabs";
import PlateBar from "./PlateBar";

const categories = Array.from(
  new Set(menuData.map((item) => item.category))
);

function getSectionId(category) {
  return `category-${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export default function MenuClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    categories[0] || ""
  );
  const [table, setTable] = useState("T12");

  const controlsRef = useRef(null);
  const sectionRefs = useRef({});

  /*
   * ---------------------------------------------------------
   * TABLE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tableFromUrl =
      params.get("table") || "T12";

    setTable(tableFromUrl);
    saveTable(tableFromUrl);
  }, []);

  /*
   * ---------------------------------------------------------
   * FILTERED MENU
   * ---------------------------------------------------------
   */

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return menuData;
    }

    return menuData.filter((item) => {
      const name =
        item.name?.toLowerCase() || "";

      const description =
        item.description?.toLowerCase() || "";

      const category =
        item.category?.toLowerCase() || "";

      const code =
        item.code?.toLowerCase() || "";

      const variants =
        item.variants
          ?.map((variant) =>
            variant.name?.toLowerCase()
          )
          .join(" ") || "";

      return (
        name.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        code.includes(query) ||
        variants.includes(query)
      );
    });
  }, [search]);

  /*
   * ---------------------------------------------------------
   * ACTIVE CATEGORY WHILE SCROLLING
   * ---------------------------------------------------------
   *
   * Instead of IntersectionObserver, we use the actual
   * window scroll position. This is more predictable on
   * mobile browsers.
   */

  useEffect(() => {
    if (search) {
      return undefined;
    }

    let ticking = false;

    function updateActiveCategory() {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(() => {
        const controls =
          controlsRef.current;

        const controlsHeight =
          controls?.getBoundingClientRect()
            .height || 150;

        const marker =
          window.scrollY +
          controlsHeight +
          30;

        let currentCategory =
          categories[0];

        for (const category of categories) {
          const section =
            sectionRefs.current[category];

          if (!section) {
            continue;
          }

          const sectionTop =
            section.getBoundingClientRect()
              .top +
            window.scrollY;

          if (sectionTop <= marker) {
            currentCategory = category;
          }
        }

        setActiveCategory(
          currentCategory
        );

        ticking = false;
      });
    }

    window.addEventListener(
      "scroll",
      updateActiveCategory,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveCategory
    );

    updateActiveCategory();

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveCategory
      );

      window.removeEventListener(
        "resize",
        updateActiveCategory
      );
    };
  }, [search]);

  /*
   * ---------------------------------------------------------
   * CATEGORY CLICK
   * ---------------------------------------------------------
   */

  function scrollToCategory(category) {
    setActiveCategory(category);

    const section =
      sectionRefs.current[category];

    if (!section) {
      return;
    }

    const controls =
      controlsRef.current;

    const controlsHeight =
      controls?.getBoundingClientRect()
        .height || 150;

    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY;

    const targetPosition =
      Math.max(
        0,
        sectionTop -
          controlsHeight -
          12
      );

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  /*
   * ---------------------------------------------------------
   * SEARCH CLEAR
   * ---------------------------------------------------------
   */

  function clearSearch() {
    setSearch("");
    setActiveCategory(
      categories[0] || ""
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf4e8] pb-32">

      <div className="mx-auto w-full max-w-[560px]">

        {/* =================================================
            BRAND HEADER
        ================================================= */}

        <header className="px-4 pb-4 pt-5">

          <div className="flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4d3b2b] text-white shadow-sm">
                <Utensils size={19} />
              </div>

              <div className="min-w-0">

                <p className="font-serif text-[21px] font-bold leading-none text-[#3e3025]">
                  Old Town Café
                </p>

                <p className="mt-1 text-[10px] font-medium tracking-wide text-[#887562]">
                  GOOD FOOD · SLOW MOMENTS
                </p>

              </div>

            </div>

            <div className="shrink-0 rounded-full border border-[#dfd1bc] bg-[#fffaf1] px-3.5 py-2">

              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#9a8770]">
                Table
              </p>

              <p className="text-center text-sm font-bold text-[#4d3b2b]">
                {table}
              </p>

            </div>

          </div>

          {/* =================================================
              HERO
          ================================================= */}

          <div className="relative mt-5 overflow-hidden rounded-[28px] bg-[#66745b] p-6 text-white">

            <div className="relative z-10">

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#dfe6da]">
                Welcome to
              </p>

              <h1 className="mt-2 max-w-[280px] font-serif text-[30px] font-bold leading-[1.05]">
                Your table,
                your plate.
              </h1>

              <p className="mt-3 max-w-[300px] text-[13px] leading-5 text-[#e3e8df]">
                Explore our kitchen favourites
                and build your perfect meal.
              </p>

            </div>

            <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full border-[18px] border-white/10" />

            <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-white/5" />

          </div>

        </header>

        {/* =================================================
            STICKY SEARCH + CATEGORY CONTROLS
        ================================================= */}

        <div
          ref={controlsRef}
          className="sticky top-0 z-40 border-b border-[#e4d8c6] bg-[#fbf4e8]/95 px-4 pb-3 pt-2 backdrop-blur-md"
          style={{
            paddingTop:
              "max(0.5rem, env(safe-area-inset-top))",
          }}
        >

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7965]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search dishes, drinks..."
              autoComplete="off"
              className="h-14 w-full rounded-[20px] border border-[#dfd1bc] bg-[#fffaf1] pl-12 pr-12 text-sm font-medium text-[#3e3025] shadow-[0_4px_18px_rgba(74,55,35,0.04)] outline-none placeholder:text-[#a09180] focus:border-[#a79378]"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#eee3d2] text-[#665545] active:scale-90"
              >
                <X size={17} />
              </button>
            )}

          </div>

          {/* CATEGORY BAR */}

          {!search && (
            <div className="mt-3">
              <CategoryTabs
                categories={categories}
                activeCategory={
                  activeCategory
                }
                onCategoryClick={
                  scrollToCategory
                }
              />
            </div>
          )}

        </div>

        {/* =================================================
            MENU
        ================================================= */}

        <div className="space-y-10 px-4 pt-5">

          {categories.map((category) => {

            const items =
              filteredItems.filter(
                (item) =>
                  item.category ===
                  category
              );

            if (items.length === 0) {
              return null;
            }

            return (
              <section
                key={category}
                id={getSectionId(category)}
                ref={(element) => {
                  sectionRefs.current[
                    category
                  ] = element;
                }}
                className="scroll-mt-[170px]"
              >

                <div className="mb-4 flex items-end justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a856d]">
                      Explore
                    </p>

                    <h2 className="mt-0.5 font-serif text-[25px] font-bold leading-tight text-[#3e3025]">
                      {category}
                    </h2>

                  </div>

                  <span className="shrink-0 rounded-full bg-[#eee4d4] px-3 py-1 text-[10px] font-bold text-[#88735d]">
                    {items.length} items
                  </span>

                </div>

                <div className="space-y-4">

                  {items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                    />
                  ))}

                </div>

              </section>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="rounded-[24px] border border-[#dfd1bc] bg-[#fffaf1] px-6 py-10 text-center">

              <p className="font-serif text-xl font-bold text-[#3e3025]">
                Nothing found
              </p>

              <p className="mt-2 text-sm text-[#806f5d]">
                Try searching for another
                dish or drink.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-5 rounded-full bg-[#4d3b2b] px-6 py-3 text-sm font-bold text-white"
              >
                Clear Search
              </button>

            </div>
          )}

          <div className="h-28" />

        </div>

      </div>

      <PlateBar />

    </main>
  );
}