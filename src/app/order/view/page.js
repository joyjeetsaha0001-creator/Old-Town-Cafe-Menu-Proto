"use client";

import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Home,
  RefreshCw,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  decodeOrderFromUrl,
} from "@/lib/cart";

/* =========================================================
   DATE
========================================================= */

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleString(
    undefined,
    {
      dateStyle:
        "medium",

      timeStyle:
        "short",
    }
  );
}

/* =========================================================
   WAITER ORDER PAGE
========================================================= */

export default function WaiterOrderPage() {

  const [
    order,
    setOrder,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* =======================================================
     READ ORDER FROM QR URL
  ======================================================= */

  useEffect(() => {

    try {

      const params =
        new URLSearchParams(
          window.location.search
        );

      /*
       * QR contains:
       *
       * /order/view?data=...
       */

      const encodedOrder =
        params.get(
          "data"
        );

      const decodedOrder =
        decodeOrderFromUrl(
          encodedOrder
        );

      setOrder(
        decodedOrder ||
          null
      );

    } catch {

      setOrder(null);

    } finally {

      setLoading(
        false
      );

    }

  }, []);

  /* =======================================================
     TOTAL
  ======================================================= */

  const calculatedTotal =
    useMemo(() => {

      if (
        !order ||
        !Array.isArray(
          order.items
        )
      ) {
        return 0;
      }

      return order.items.reduce(
        (
          sum,
          item
        ) =>
          sum +
          Number(
            item.price ||
              0
          ) *
            Number(
              item.quantity ||
                0
            ),
        0
      );

    }, [order]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-[#fbf4e8] px-5">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dfd1bc] border-t-[#4d3b2b]" />

          <p className="mt-4 text-sm text-[#806f5d]">
            Opening order...
          </p>

        </div>

      </main>

    );

  }

  /* =======================================================
     INVALID ORDER
  ======================================================= */

  if (!order) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-[#fbf4e8] px-5 py-8">

        <div className="w-full max-w-[520px] rounded-[28px] border border-[#dfd1bc] bg-[#fffaf1] p-7 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#efe4d4] text-[#4d3b2b]">

            <RefreshCw
              size={25}
            />

          </div>

          <h1 className="mt-5 font-serif text-2xl font-bold text-[#3e3025]">
            Order link is invalid
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#806f5d]">
            Please ask the customer to
            show the current QR code again.
          </p>

          <Link
            href="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4d3b2b] px-6 py-3 text-sm font-bold text-white"
          >

            <Home
              size={16}
            />

            Go to Menu

          </Link>

        </div>

      </main>

    );

  }

  const total =
    calculatedTotal;

  /* =======================================================
     WAITER VIEW
  ======================================================= */

  return (

    <main className="min-h-screen bg-[#fbf4e8] px-4 py-5">

      <div className="mx-auto w-full max-w-[560px] pb-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="flex items-center gap-3 py-2">

          <button
            type="button"
            onClick={() =>
              window.history.back()
            }
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dfd1bc] bg-[#fffaf1] text-[#4d3b2b] active:scale-95"
          >

            <ArrowLeft
              size={18}
            />

          </button>

          <div className="min-w-0">

            <p className="font-serif text-xl font-bold text-[#3e3025]">
              {order.cafe}
            </p>

            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8d7861]">
              Waiter Order View
            </p>

          </div>

        </header>

        {/* =================================================
            ORDER CARD
        ================================================= */}

        <section className="mt-4 overflow-hidden rounded-[28px] border border-[#dfd1bc] bg-[#fffaf1] shadow-[0_5px_22px_rgba(74,55,35,0.06)]">

          {/* =================================================
              ORDER HEADER
          ================================================= */}

          <div className="bg-[#4d3b2b] px-5 py-5 text-white">

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8cbb9]">
                  Order ID
                </p>

                <p className="mt-1 break-all font-serif text-xl font-bold">
                  {order.orderId}
                </p>

              </div>

              <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-2 text-center">

                <p className="text-[9px] uppercase tracking-wider text-[#d8cbb9]">
                  Table
                </p>

                <p className="font-serif text-2xl font-bold">
                  {order.table}
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              ORDER CONTENT
          ================================================= */}

          <div className="px-5 py-5">

            {/* ORDER TIME */}

            <div className="flex items-center gap-2 rounded-2xl bg-[#f5ecdf] px-4 py-3 text-xs text-[#796956]">

              <Clock
                size={15}
                className="shrink-0"
              />

              <span>

                {formatDate(
                  order.createdAt
                ) ||
                  "Order time unavailable"}

              </span>

            </div>

            {/* =================================================
                ITEMS HEADER
            ================================================= */}

            <div className="mt-6 flex items-center gap-2">

              <CheckCircle2
                size={20}
                className="text-[#66745b]"
              />

              <h1 className="font-serif text-2xl font-bold text-[#3e3025]">
                Items to Serve
              </h1>

            </div>

            {/* =================================================
                ITEMS
            ================================================= */}

            <div className="mt-4 space-y-3">

              {order.items.map(
                (
                  item,
                  index
                ) => {

                  const quantity =
                    Number(
                      item.quantity ||
                        0
                    );

                  const price =
                    Number(
                      item.price ||
                        0
                    );

                  const lineTotal =
                    price *
                    quantity;

                  return (

                    <div
                      key={`${item.id}-${item.variantName || "regular"}-${index}`}
                      className="rounded-[20px] border border-[#e4d7c4] bg-[#fcf6ed] p-4"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0 flex-1">

                          {/* FULL ITEM NAME */}

                          <p className="text-[17px] font-bold leading-6 text-[#3e3025]">

                            <span className="mr-1.5 inline-flex min-w-8 items-center justify-center rounded-full bg-[#66745b] px-2 py-1 text-xs font-bold text-white">

                              {quantity}×

                            </span>

                            {item.name}

                          </p>

                          {/* FALLBACK VARIANT */}

                          {item.variantName &&
                            item.variantName.toLowerCase() !==
                              "regular" &&
                            !String(
                              item.name ||
                                ""
                            )
                              .toLowerCase()
                              .includes(
                                item.variantName.toLowerCase()
                              ) && (

                              <p className="mt-2 text-xs font-medium text-[#88735d]">

                                Option:{" "}

                                {
                                  item.variantName
                                }

                              </p>

                            )}

                          {/* UNIT PRICE */}

                          <p className="mt-2 text-xs text-[#927e68]">

                            ₹
                            {price}
                            {" "}
                            each

                          </p>

                        </div>

                        {/* LINE TOTAL */}

                        <p className="shrink-0 text-base font-bold text-[#4d3b2b]">

                          ₹
                          {lineTotal}

                        </p>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

            {/* =================================================
                TOTAL
            ================================================= */}

            <div className="my-5 border-t border-dashed border-[#d6c6ae]" />

            <div className="flex items-center justify-between gap-4">

              <p className="font-serif text-xl font-bold text-[#3e3025]">
                Total
              </p>

              <p className="text-3xl font-bold text-[#4d3b2b]">
                ₹{total}
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-4 rounded-[22px] border border-[#dfd1bc] bg-[#fffaf1] p-5 text-center">

          <p className="text-sm font-semibold text-[#4d3b2b]">
            Order received successfully.
          </p>

          <p className="mt-1 text-xs leading-5 text-[#806f5d]">
            This page contains the
            complete order reference
            for the waiter.
          </p>

        </div>

      </div>

    </main>

  );
}