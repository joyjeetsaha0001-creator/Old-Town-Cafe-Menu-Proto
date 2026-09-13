"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  decreaseQuantity,
  getCart,
  increaseQuantity,
  createOrder,
} from "@/lib/cart";


export default function PlatePage() {

  const router =
    useRouter();


  const [cart, setCart] =
    useState([]);


  const [
    isPlacingOrder,
    setIsPlacingOrder,
  ] = useState(false);


  /* =======================================================
     REFRESH CART
  ======================================================= */

  function refreshCart() {

    setCart(
      getCart()
    );

  }


  useEffect(() => {

    refreshCart();


    function handleCartUpdate() {

      refreshCart();

    }


    window.addEventListener(
      "cart-updated",
      handleCartUpdate
    );


    return () => {

      window.removeEventListener(
        "cart-updated",
        handleCartUpdate
      );

    };

  }, []);


  /* =======================================================
     TOTAL
  ======================================================= */

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(
          item.price || 0
        ) *
          Number(
            item.quantity || 0
          ),
      0
    );


  /* =======================================================
     PLACE ORDER
  ======================================================= */

  function handlePlaceOrder() {

    if (
      isPlacingOrder ||
      cart.length === 0
    ) {

      return;

    }


    setIsPlacingOrder(
      true
    );


    /*
      Create a NEW order from
      the CURRENT plate.
    */

    const newOrder =
      createOrder();


    /*
      Safety check.
    */

    if (!newOrder) {

      setIsPlacingOrder(
        false
      );

      refreshCart();

      return;

    }


    /*
      IMPORTANT:

      The cart is intentionally NOT
      cleared.

      Therefore:

      QR Page
          ↓
        Back
          ↓
       Menu
          ↓
      Same Plate

      remains available.

      We also pass the exact new
      order ID to /order.

      Therefore /order cannot
      accidentally display yesterday's
      order.
    */

    router.push(
      `/order?order=${encodeURIComponent(
        newOrder.orderId
      )}`
    );

  }


  return (

    <main className="min-h-screen bg-[#fbf4e8]">

      <div className="mx-auto min-h-screen w-full max-w-[560px] px-4 pb-8">


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="flex items-center gap-3 py-5">

          <Link
            href="/menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dfd1bc] bg-[#fffaf1] text-[#4d3b2b]"
          >

            <ArrowLeft
              size={19}
            />

          </Link>


          <div>

            <p className="font-serif text-2xl font-bold text-[#3e3025]">

              Your Plate

            </p>


            <p className="text-xs text-[#85735f]">

              Review everything before ordering.

            </p>

          </div>

        </header>


        {/* =================================================
            EMPTY PLATE
        ================================================= */}

        {cart.length === 0 ? (

          <div className="mt-16 rounded-[28px] border border-[#dfd1bc] bg-[#fffaf1] p-8 text-center">

            <ShoppingBag
              size={36}
              className="mx-auto text-[#5e4b39]"
            />


            <h1 className="mt-5 font-serif text-2xl font-bold text-[#3e3025]">

              Your plate is empty

            </h1>


            <p className="mt-2 text-sm text-[#806f5d]">

              Add something delicious from the menu.

            </p>


            <Link
              href="/menu"
              className="mt-6 inline-flex rounded-full bg-[#4d3b2b] px-6 py-3 text-sm font-semibold text-white"
            >

              Browse Menu

            </Link>

          </div>

        ) : (

          <>

            {/* =================================================
                CART ITEMS
            ================================================= */}

            <div className="space-y-3">

              {cart.map(
                (item) => (

                  <div
                    key={item.id}
                    className="rounded-[22px] border border-[#e0d2bd] bg-[#fffaf1] p-3"
                  >

                    <div className="flex gap-3">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 shrink-0 rounded-[17px] object-cover"
                        />

                      ) : null}


                      <div className="min-w-0 flex-1">

                        <h2 className="font-serif text-lg font-bold text-[#3e3025]">

                          {item.name}

                        </h2>


                        {item.variantName &&
                          item.variantName.toLowerCase() !==
                            "regular" && (

                          <p className="mt-1 text-[11px] text-[#917d68]">

                            Option:{" "}

                            {item.variantName}

                          </p>

                        )}


                        <p className="mt-1 text-sm text-[#806f5d]">

                          ₹{item.price}

                        </p>


                        <div className="mt-3 flex items-center justify-between gap-3">


                          {/* QUANTITY */}

                          <div className="flex items-center rounded-full border border-[#ded0bb] bg-[#f8f0e3]">

                            <button
                              type="button"
                              onClick={() => {

                                decreaseQuantity(
                                  item.id
                                );

                                refreshCart();

                              }}
                              className="flex h-9 w-9 items-center justify-center text-[#4d3b2b] active:scale-90"
                            >

                              <Minus
                                size={15}
                              />

                            </button>


                            <span className="w-7 text-center text-sm font-bold text-[#4d3b2b]">

                              {item.quantity}

                            </span>


                            <button
                              type="button"
                              onClick={() => {

                                increaseQuantity(
                                  item.id
                                );

                                refreshCart();

                              }}
                              className="flex h-9 w-9 items-center justify-center text-[#4d3b2b] active:scale-90"
                            >

                              <Plus
                                size={15}
                              />

                            </button>

                          </div>


                          {/* ITEM TOTAL */}

                          <p className="font-bold text-[#4d3b2b]">

                            ₹
                            {Number(
                              item.price || 0
                            ) *
                              Number(
                                item.quantity || 0
                              )}

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>


            {/* =================================================
                BILL SUMMARY
            ================================================= */}

            <div className="mt-6 rounded-[26px] border border-[#dfd1bc] bg-[#fffaf1] p-5">

              <div className="flex justify-between text-sm text-[#776653]">

                <span>
                  Subtotal
                </span>


                <span>
                  ₹{total}
                </span>

              </div>


              <div className="my-4 border-t border-dashed border-[#d8c9b3]" />


              <div className="flex justify-between">

                <span className="font-serif text-xl font-bold text-[#3e3025]">

                  Total

                </span>


                <span className="text-2xl font-bold text-[#4d3b2b]">

                  ₹{total}

                </span>

              </div>


              {/* =================================================
                  PLACE ORDER
              ================================================= */}

              <button
                type="button"
                onClick={
                  handlePlaceOrder
                }
                disabled={
                  isPlacingOrder
                }
                className="mt-5 flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#4d3b2b] py-4 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >

                {isPlacingOrder
                  ? "Preparing Your Order..."
                  : "Place Order"}

              </button>


              <p className="mt-3 text-center text-[11px] leading-5 text-[#917f6a]">

                A new QR code will be generated
                for this order.

              </p>

            </div>

          </>

        )}

      </div>

    </main>

  );

}