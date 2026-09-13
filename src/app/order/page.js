"use client";

import Link from "next/link";

import {
  CheckCircle2,
  Clock,
  Copy,
  Home,
} from "lucide-react";

import {
  QRCodeSVG,
} from "qrcode.react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  encodeOrderForUrl,
  getOrder,
} from "@/lib/cart";

export default function OrderPage() {
  const [
    order,
    setOrder,
  ] = useState(null);

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* =========================================================
     LOAD EXACT ORDER
  ========================================================= */

  useEffect(() => {
    try {
      const params =
        new URLSearchParams(
          window.location.search
        );

      const orderId =
        params.get(
          "order"
        );

      /*
       * The order ID from the URL must match
       * the latest order stored locally.
       *
       * This prevents yesterday's order from
       * appearing accidentally.
       */
      const savedOrder =
        getOrder(
          orderId
        );

      setOrder(
        savedOrder ||
          null
      );
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================================================
     GENERATE WAITER QR URL
  ========================================================= */

  const qrUrl =
    useMemo(() => {
      if (
        !order ||
        typeof window ===
          "undefined"
      ) {
        return "";
      }

      /*
       * Encode the COMPLETE order snapshot.
       */
      const encodedOrder =
        encodeOrderForUrl(
          order
        );

      /*
       * QR destination:
       *
       * /order/view?data=...
       *
       * The waiter will open this URL.
       */
      return (
        `${window.location.origin}` +
        `/order/view?data=` +
        encodeURIComponent(
          encodedOrder
        )
      );
    }, [order]);

  /* =========================================================
     COPY ORDER URL
  ========================================================= */

  async function handleCopy() {
    if (!qrUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        qrUrl
      );

      setCopied(
        true
      );

      window.setTimeout(
        () => {
          setCopied(
            false
          );
        },
        1500
      );
    } catch {
      setCopied(
        false
      );
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbf4e8] px-5">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dfd1bc] border-t-[#4d3b2b]" />

          <p className="mt-4 text-sm text-[#806f5d]">
            Preparing your order...
          </p>

        </div>
      </main>
    );
  }

  /* =========================================================
     NO ORDER
  ========================================================= */

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbf4e8] px-5">

        <div className="text-center">

          <h1 className="font-serif text-2xl font-bold text-[#3e3025]">
            Order not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#806f5d]">
            This order is no longer available.
            Please add items to your plate and
            place a new order.
          </p>

          <Link
            href="/menu"
            className="mt-5 inline-flex rounded-full bg-[#4d3b2b] px-6 py-3 text-sm font-semibold text-white"
          >
            Browse Menu
          </Link>

        </div>

      </main>
    );
  }

  const formattedDate =
    new Date(
      order.createdAt
    ).toLocaleString();

  /* =========================================================
     CUSTOMER QR PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#fbf4e8] px-4 py-6">

      <div className="mx-auto max-w-[560px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#66745b] text-white">

            <CheckCircle2
              size={34}
            />

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#897560]">
            Order ready
          </p>

          <h1 className="mt-1 font-serif text-3xl font-bold text-[#3e3025]">
            Show this QR to the waiter
          </h1>

          <p className="mx-auto mt-2 max-w-[420px] text-sm leading-6 text-[#806f5d]">
            The waiter scans this QR and is
            taken directly to a formatted
            order page containing every item,
            quantity, price and total.
          </p>

        </div>

        {/* =================================================
            ORDER CARD
        ================================================= */}

        <div className="mt-7 overflow-hidden rounded-[30px] border border-[#dfd1bc] bg-[#fffaf1]">

          {/* ORDER HEADER */}

          <div className="bg-[#4d3b2b] px-6 py-5 text-white">

            <div className="flex items-center justify-between gap-4">

              <div className="min-w-0">

                <p className="text-xs uppercase tracking-[0.15em] text-[#d8cbb9]">
                  Order
                </p>

                <p className="mt-1 break-all font-serif text-2xl font-bold">
                  {order.orderId}
                </p>

              </div>

              <div className="shrink-0 text-right">

                <p className="text-xs text-[#d8cbb9]">
                  Table
                </p>

                <p className="font-serif text-2xl font-bold">
                  {order.table}
                </p>

              </div>

            </div>

          </div>

          {/* QR */}

          <div className="px-6 pt-6">

            <div className="flex justify-center">

              <div className="rounded-[24px] bg-white p-4 shadow-sm">

                <QRCodeSVG
                  value={qrUrl}
                  size={250}
                  level="M"
                  includeMargin
                />

              </div>

            </div>

            <p className="mt-4 text-center text-xs leading-5 text-[#8a7865]">
              Scan to open the complete
              order on the waiter&apos;s phone.
            </p>

          </div>

          {/* DATE */}

          <div className="mx-6 mt-5 flex items-center gap-2 rounded-[16px] bg-[#f5ecdf] px-4 py-3 text-xs text-[#796956]">

            <Clock
              size={15}
            />

            {formattedDate}

          </div>

          {/* ORDER SUMMARY */}

          <div className="px-6 pb-6 pt-5">

            <h2 className="font-serif text-xl font-bold text-[#3e3025]">
              Order Summary
            </h2>

            <div className="mt-3 space-y-3">

              {order.items.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={`${item.id}-${item.variantName || "regular"}-${index}`}
                    className="flex items-start justify-between gap-4 text-sm"
                  >

                    <div className="min-w-0">

                      <p className="font-semibold leading-5 text-[#4d3b2b]">

                        {item.quantity}
                        {" × "}
                        {item.name}

                      </p>

                    </div>

                    <p className="shrink-0 font-semibold text-[#4d3b2b]">

                      ₹
                      {Number(
                        item.price ||
                          0
                      ) *
                        Number(
                          item.quantity ||
                            0
                        )}

                    </p>

                  </div>

                )
              )}

            </div>

            <div className="my-5 border-t border-dashed border-[#d6c6ae]" />

            <div className="flex items-center justify-between">

              <p className="font-serif text-xl font-bold text-[#3e3025]">
                Total
              </p>

              <p className="text-2xl font-bold text-[#4d3b2b]">
                ₹{order.total}
              </p>

            </div>

            {/* COPY */}

            <button
              type="button"
              onClick={
                handleCopy
              }
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#d8c9b4] py-3.5 text-sm font-semibold text-[#4d3b2b] transition active:scale-[0.98]"
            >

              <Copy
                size={17}
              />

              {copied
                ? "Order Link Copied!"
                : "Copy Order Link"}

            </button>

          </div>

        </div>

        {/* INFORMATION */}

        <div className="mt-5 rounded-[22px] border border-[#dfd1bc] bg-[#fffaf1] p-5">

          <p className="text-center text-sm leading-6 text-[#6f5d4b]">

            <strong className="text-[#4d3b2b]">
              Almost done!
            </strong>

            <br />

            Show this QR code to the waiter.
            Scanning it opens the complete
            order page with item names,
            quantities, prices and total.

          </p>

        </div>

        {/* BACK */}

        <Link
          href="/menu"
          className="mt-5 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#5e4d3b]"
        >

          <Home
            size={17}
          />

          Back to Menu

        </Link>

      </div>

    </main>
  );
}