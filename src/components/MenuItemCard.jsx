"use client";

import {
  Check,
  Plus,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  addToCart,
} from "@/lib/cart";


export default function MenuItemCard({
  item,
}) {

  /*
    If an item has variants,
    show those variants.

    Otherwise treat it as a
    normal single-price item.
  */

  const variants =
    Array.isArray(item.variants) &&
    item.variants.length > 0

      ? item.variants

      : [
          {
            name: "Regular",
            price:
              Number(
                item.price || 0
              ),
          },
        ];


  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);


  const [
    added,
    setAdded,
  ] = useState(false);


  const selectedVariant =
    variants[selectedIndex] ||
    variants[0];


  const selectedPrice =
    Number(
      selectedVariant?.price || 0
    );


  const hasMultipleVariants =
    variants.length > 1;


  /*
    Price display.

    Example:

    ₹229 – ₹309
  */

  const priceText =
    useMemo(() => {

      if (!hasMultipleVariants) {
        return `₹${selectedPrice}`;
      }


      const prices =
        variants.map(
          (variant) =>
            Number(
              variant.price || 0
            )
        );


      const minimum =
        Math.min(...prices);


      const maximum =
        Math.max(...prices);


      if (
        minimum === maximum
      ) {
        return `₹${minimum}`;
      }


      return `₹${minimum} – ₹${maximum}`;

    }, [
      hasMultipleVariants,
      selectedPrice,
      variants,
    ]);


  /*
    ADD ITEM
  */

  function handleAdd() {

    if (!selectedVariant) {
      return;
    }


    /*
      Send BOTH:

      base item name
      +
      selected variant

      to the cart.

      cart.js will create the
      final display name.
    */

    addToCart({

      ...item,

      variantName:
        selectedVariant.name,

      price:
        selectedPrice,

    });


    setAdded(true);


    window.setTimeout(() => {

      setAdded(false);

    }, 1000);

  }


  return (

    <article className="rounded-[22px] border border-[#e3d6c3] bg-[#fffaf1] p-4 shadow-[0_3px_14px_rgba(74,55,35,0.04)]">


      {/* =================================================
          ITEM DETAILS
      ================================================= */}

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0 flex-1">

          <h3 className="font-serif text-[18px] font-bold leading-snug text-[#3e3025]">

            {item.name}

          </h3>


          {item.description && (

            <p className="mt-1.5 text-[13px] leading-5 text-[#887563]">

              {item.description}

            </p>

          )}


          <p className="mt-2 font-bold text-[#4d3b2b]">

            {priceText}

          </p>

        </div>

      </div>


      {/* =================================================
          VARIANTS
      ================================================= */}

      {hasMultipleVariants && (

        <div className="mt-4">

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a856d]">

            Choose option

          </p>


          <div className="flex flex-wrap gap-2">

            {variants.map(
              (variant, index) => {

                const selected =
                  index ===
                  selectedIndex;


                return (

                  <button
                    key={`${item.id}-${variant.name}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        index
                      )
                    }
                    className={`rounded-full border px-3.5 py-2 text-[12px] font-bold transition active:scale-95 ${
                      selected

                        ? "border-[#4d3b2b] bg-[#4d3b2b] text-white"

                        : "border-[#dfd1bc] bg-[#f8f0e3] text-[#6e5b48]"
                    }`}
                  >

                    {variant.name}

                    {" · "}

                    ₹{variant.price}

                  </button>

                );

              }
            )}

          </div>

        </div>

      )}


      {/* =================================================
          ADD BUTTON
      ================================================= */}

      <div className="mt-4 flex justify-end">

        <button
          type="button"
          onClick={handleAdd}
          className={`flex min-h-11 min-w-[96px] items-center justify-center gap-1.5 rounded-full px-5 text-sm font-bold transition active:scale-95 ${
            added

              ? "bg-[#66745b] text-white"

              : "bg-[#4d3b2b] text-white"
          }`}
        >

          {added ? (

            <>

              <Check size={16} />

              Added

            </>

          ) : (

            <>

              <Plus size={16} />

              Add

            </>

          )}

        </button>

      </div>

    </article>

  );

}