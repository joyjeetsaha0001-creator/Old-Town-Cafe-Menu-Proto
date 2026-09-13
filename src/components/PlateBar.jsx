"use client";

import Link from "next/link";

import {
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import {
  getCartCount,
  getCartTotal,
} from "@/lib/cart";

import {
  useEffect,
  useState,
} from "react";

export default function PlateBar() {
  const [count, setCount] =
    useState(0);

  const [total, setTotal] =
    useState(0);

  function refreshCart() {
    setCount(
      getCartCount()
    );

    setTotal(
      getCartTotal()
    );
  }

  useEffect(() => {
    refreshCart();

    function handleCartUpdate() {
      refreshCart();
    }

    function handleStorage(event) {
      if (
        event.key ===
        "old-town-cafe-cart"
      ) {
        refreshCart();
      }
    }

    window.addEventListener(
      "cart-updated",
      handleCartUpdate
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  if (count === 0) {
    return null;
  }

  return (
    <div
      className="fixed left-0 right-0 z-[100] px-4"
      style={{
        bottom:
          "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >

      <div className="mx-auto w-full max-w-[560px]">

        <Link
          href="/plate"
          className="flex min-h-[66px] items-center justify-between gap-4 rounded-[22px] bg-[#4d3b2b] px-4 text-white shadow-[0_10px_35px_rgba(50,35,20,0.30)] transition active:scale-[0.99]"
        >

          <div className="flex min-w-0 items-center gap-3">

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#66745b]">

              <ShoppingBag
                size={19}
              />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f4e7d2] px-1 text-[10px] font-bold text-[#4d3b2b]">
                {count}
              </span>

            </div>

            <div className="min-w-0">

              <p className="text-[10px] uppercase tracking-wider text-[#d8cbb9]">
                Your Plate
              </p>

              <p className="font-bold">
                ₹{total}
              </p>

            </div>

          </div>

          <div className="flex shrink-0 items-center gap-1.5 text-sm font-bold">
            View Plate
            <ArrowRight
              size={17}
            />
          </div>

        </Link>

      </div>

    </div>
  );
}