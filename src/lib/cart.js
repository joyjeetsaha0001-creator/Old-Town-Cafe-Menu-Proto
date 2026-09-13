const CART_KEY = "old-town-cafe-cart";
const ORDER_KEY = "old-town-cafe-order";
const TABLE_KEY = "old-town-cafe-table";

/*
 * The customer's plate is temporary.
 *
 * It stays available for 10 minutes after the last plate
 * modification. If the customer leaves the app and comes
 * back later, the old plate will automatically disappear.
 */
const CART_EXPIRY_TIME = 10 * 60 * 1000;

let cartExpiryTimer = null;

function isBrowser() {
  return typeof window !== "undefined";
}

/* =========================================================
   ITEM DISPLAY NAME
========================================================= */

function normalizeVariantName(value) {
  const variant = String(value || "").trim();

  if (variant.toLowerCase() === "mix non-veg") {
    return "Mixed Non-Veg";
  }

  if (variant.toLowerCase() === "mix veg") {
    return "Mixed Veg";
  }

  return variant;
}

export function getItemDisplayName(name, variantName) {
  const baseName = String(name || "").trim();
  const variant = normalizeVariantName(variantName);

  if (!baseName) {
    return variant;
  }

  /*
   * Regular items don't need a variant prefix.
   */
  if (
    !variant ||
    variant.toLowerCase() === "regular"
  ) {
    return baseName;
  }

  /*
   * Don't duplicate the variant when the base item
   * already contains it.
   *
   * Example:
   * Butter Paneer/Chicken Penne
   */
  if (
    baseName
      .toLowerCase()
      .includes(variant.toLowerCase())
  ) {
    return baseName;
  }

  return `${variant} ${baseName}`;
}

/* =========================================================
   CART EXPIRY
========================================================= */

function scheduleCartExpiry(lastUpdated) {
  if (!isBrowser()) {
    return;
  }

  if (cartExpiryTimer) {
    window.clearTimeout(cartExpiryTimer);
    cartExpiryTimer = null;
  }

  const updatedAt = Number(lastUpdated);

  if (!Number.isFinite(updatedAt)) {
    return;
  }

  const remainingTime =
    CART_EXPIRY_TIME -
    (Date.now() - updatedAt);

  if (remainingTime <= 0) {
    expireCart();
    return;
  }

  cartExpiryTimer =
    window.setTimeout(() => {
      expireCart();
    }, remainingTime);
}

function expireCart() {
  if (!isBrowser()) {
    return;
  }

  if (cartExpiryTimer) {
    window.clearTimeout(cartExpiryTimer);
    cartExpiryTimer = null;
  }

  localStorage.removeItem(
    CART_KEY
  );

  window.dispatchEvent(
    new Event("cart-updated")
  );
}

/* =========================================================
   CART
========================================================= */

export function getCart() {
  if (!isBrowser()) {
    return [];
  }

  try {
    const stored =
      localStorage.getItem(
        CART_KEY
      );

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    /*
     * Current format:
     *
     * {
     *   items: [...],
     *   lastUpdated: 123456789
     * }
     */

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      Array.isArray(parsed.items)
    ) {
      const lastUpdated =
        Number(
          parsed.lastUpdated
        );

      if (
        !Number.isFinite(
          lastUpdated
        )
      ) {
        localStorage.removeItem(
          CART_KEY
        );

        return [];
      }

      /*
       * Check expiry every time the cart
       * is accessed.
       */
      if (
        Date.now() -
          lastUpdated >=
        CART_EXPIRY_TIME
      ) {
        localStorage.removeItem(
          CART_KEY
        );

        if (cartExpiryTimer) {
          window.clearTimeout(
            cartExpiryTimer
          );

          cartExpiryTimer = null;
        }

        return [];
      }

      /*
       * Keep the automatic timer running.
       */
      scheduleCartExpiry(
        lastUpdated
      );

      /*
       * Normalize older entries too.
       */
      return parsed.items.map(
        (item) => ({
          ...item,

          variantName:
            normalizeVariantName(
              item.variantName
            ),

          name:
            getItemDisplayName(
              item.name,
              item.variantName
            ),
        })
      );
    }

    /*
     * Old array-only format.
     *
     * Clear it rather than carrying
     * potentially stale data forward.
     */
    localStorage.removeItem(
      CART_KEY
    );

    return [];
  } catch {
    localStorage.removeItem(
      CART_KEY
    );

    return [];
  }
}

/* =========================================================
   SAVE CART
========================================================= */

export function saveCart(cart) {
  if (!isBrowser()) {
    return;
  }

  const lastUpdated =
    Date.now();

  const safeCart =
    Array.isArray(cart)
      ? cart.map(
          (item) => ({
            ...item,

            variantName:
              normalizeVariantName(
                item.variantName
              ),

            name:
              getItemDisplayName(
                item.name,
                item.variantName
              ),
          })
        )
      : [];

  const cartData = {
    items: safeCart,
    lastUpdated,
  };

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(
      cartData
    )
  );

  scheduleCartExpiry(
    lastUpdated
  );

  window.dispatchEvent(
    new Event("cart-updated")
  );
}

/* =========================================================
   ADD TO CART
========================================================= */

export function addToCart(item) {
  const cart =
    getCart();

  const variantName =
    normalizeVariantName(
      item.variantName
    );

  const existingItem =
    cart.find(
      (cartItem) =>
        cartItem.id ===
          item.id &&
        normalizeVariantName(
          cartItem.variantName
        ) === variantName
    );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,

      /*
       * IMPORTANT:
       *
       * The selected variant becomes part of the
       * actual displayed item name.
       *
       * Example:
       * Mixed Non-Veg Fried Rice
       */
      name:
        getItemDisplayName(
          item.name,
          variantName
        ),

      variantName,

      price:
        Number(
          item.price || 0
        ),

      quantity: 1,
    });
  }

  saveCart(cart);

  return cart;
}

/* =========================================================
   QUANTITY
========================================================= */

export function increaseQuantity(
  id,
  variantName
) {
  const cart =
    getCart();

  const normalizedVariant =
    normalizeVariantName(
      variantName
    );

  const item =
    cart.find(
      (cartItem) =>
        cartItem.id === id &&
        (
          variantName === undefined ||
          normalizeVariantName(
            cartItem.variantName
          ) === normalizedVariant
        )
    );

  if (!item) {
    return cart;
  }

  item.quantity += 1;

  saveCart(cart);

  return cart;
}

export function decreaseQuantity(
  id,
  variantName
) {
  const cart =
    getCart();

  const normalizedVariant =
    normalizeVariantName(
      variantName
    );

  const item =
    cart.find(
      (cartItem) =>
        cartItem.id === id &&
        (
          variantName === undefined ||
          normalizeVariantName(
            cartItem.variantName
          ) === normalizedVariant
        )
    );

  if (!item) {
    return cart;
  }

  item.quantity -= 1;

  const updatedCart =
    cart.filter(
      (cartItem) =>
        cartItem.quantity > 0
    );

  saveCart(
    updatedCart
  );

  return updatedCart;
}

/* =========================================================
   CLEAR CART
========================================================= */

export function clearCart() {
  if (!isBrowser()) {
    return;
  }

  if (cartExpiryTimer) {
    window.clearTimeout(
      cartExpiryTimer
    );

    cartExpiryTimer = null;
  }

  localStorage.removeItem(
    CART_KEY
  );

  window.dispatchEvent(
    new Event("cart-updated")
  );
}

/* =========================================================
   CART TOTALS
========================================================= */

export function getCartCount() {
  return getCart().reduce(
    (total, item) =>
      total +
      Number(
        item.quantity || 0
      ),
    0
  );
}

export function getCartTotal() {
  return getCart().reduce(
    (total, item) =>
      total +
      Number(
        item.price || 0
      ) *
        Number(
          item.quantity || 0
        ),
    0
  );
}

/* =========================================================
   TABLE
========================================================= */

export function saveTable(table) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(
    TABLE_KEY,
    String(table)
  );
}

export function getTable() {
  if (!isBrowser()) {
    return "T12";
  }

  return (
    localStorage.getItem(
      TABLE_KEY
    ) || "T12"
  );
}

/* =========================================================
   ORDER ID
========================================================= */

export function generateOrderId() {
  if (
    isBrowser() &&
    window.crypto &&
    typeof window.crypto.randomUUID ===
      "function"
  ) {
    return (
      "OTC-" +
      window.crypto
        .randomUUID()
        .slice(0, 8)
        .toUpperCase()
    );
  }

  const timestamp =
    Date.now()
      .toString(36)
      .toUpperCase();

  const random =
    Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase();

  return `OTC-${timestamp}-${random}`;
}

/* =========================================================
   CREATE ORDER
========================================================= */

export function createOrder() {
  if (!isBrowser()) {
    return null;
  }

  const cart =
    getCart();

  if (
    cart.length === 0
  ) {
    return null;
  }

  /*
   * IMPORTANT:
   *
   * Every click on Place Order creates a NEW
   * order ID and a NEW order snapshot.
   *
   * We DO NOT clear the cart here.
   *
   * Why?
   *
   * Customer:
   *
   * Menu
   *   ↓
   * Plate
   *   ↓
   * Place Order
   *   ↓
   * QR
   *   ↓
   * accidentally Back
   *   ↓
   * Menu
   *   ↓
   * same plate still available
   *
   * The plate is automatically removed after
   * 10 minutes of inactivity.
   */

  const order = {
    orderId:
      generateOrderId(),

    cafe:
      "Old Town Cafe",

    table:
      getTable(),

    items:
      cart.map(
        (item) => ({
          id:
            item.id,

          name:
            getItemDisplayName(
              item.name,
              item.variantName
            ),

          variantName:
            normalizeVariantName(
              item.variantName
            ),

          price:
            Number(
              item.price || 0
            ),

          quantity:
            Number(
              item.quantity || 0
            ),
        })
      ),

    total:
      cart.reduce(
        (total, item) =>
          total +
          Number(
            item.price || 0
          ) *
            Number(
              item.quantity || 0
            ),
        0
      ),

    createdAt:
      new Date().toISOString(),
  };

  /*
   * Save ONLY the latest order.
   *
   * This replaces yesterday's order.
   */
  localStorage.setItem(
    ORDER_KEY,
    JSON.stringify(
      order
    )
  );

  window.dispatchEvent(
    new Event("order-created")
  );

  return order;
}

/* =========================================================
   GET ORDER
========================================================= */

export function getOrder(
  orderId
) {
  if (!isBrowser()) {
    return null;
  }

  try {
    const stored =
      localStorage.getItem(
        ORDER_KEY
      );

    if (!stored) {
      return null;
    }

    const order =
      JSON.parse(stored);

    if (
      !order ||
      typeof order !== "object" ||
      !order.orderId ||
      !Array.isArray(
        order.items
      )
    ) {
      return null;
    }

    /*
     * VERY IMPORTANT:
     *
     * If a URL contains an order ID,
     * return the order ONLY when the IDs match.
     *
     * This prevents an old localStorage order
     * from being displayed for a newer order.
     */
    if (
      orderId &&
      String(
        order.orderId
      ) !==
        String(orderId)
    ) {
      return null;
    }

    return {
      ...order,

      items:
        order.items.map(
          (item) => ({
            ...item,

            variantName:
              normalizeVariantName(
                item.variantName
              ),

            name:
              getItemDisplayName(
                item.name,
                item.variantName
              ),
          })
        ),
    };
  } catch {
    return null;
  }
}

/* =========================================================
   CLEAR SAVED ORDER
========================================================= */

export function clearOrder() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(
    ORDER_KEY
  );
}

/* =========================================================
   QR ORDER ENCODING
========================================================= */

/*
 * The QR contains a URL.
 *
 * Example:
 *
 * https://your-domain.com/order/view?data=eyJvcmRlcklkIjoi...
 *
 * The actual order is stored inside the URL as
 * URL-safe Base64 encoded JSON.
 *
 * This means Google Lens doesn't need to display
 * hundreds of characters of raw order text.
 *
 * Instead:
 *
 * QR
 * ↓
 * URL
 * ↓
 * /order/view
 * ↓
 * formatted waiter page
 */

/* =========================================================
   BYTES → BASE64
========================================================= */

function bytesToBase64(
  bytes
) {
  let binary = "";

  const chunkSize =
    0x8000;

  for (
    let index = 0;
    index < bytes.length;
    index += chunkSize
  ) {
    const chunk =
      bytes.subarray(
        index,
        index + chunkSize
      );

    binary +=
      String.fromCharCode(
        ...chunk
      );
  }

  return btoa(
    binary
  );
}

/* =========================================================
   BASE64 → BYTES
========================================================= */

function base64ToBytes(
  base64
) {
  const binary =
    atob(base64);

  const bytes =
    new Uint8Array(
      binary.length
    );

  for (
    let index = 0;
    index < binary.length;
    index += 1
  ) {
    bytes[index] =
      binary.charCodeAt(
        index
      );
  }

  return bytes;
}

/* =========================================================
   ENCODE ORDER
========================================================= */

export function encodeOrderForUrl(
  order
) {
  if (!order) {
    return "";
  }

  if (
    typeof TextEncoder ===
      "undefined" ||
    typeof btoa ===
      "undefined"
  ) {
    throw new Error(
      "Browser encoding APIs are unavailable."
    );
  }

  const normalizedOrder =
    {
      ...order,

      items:
        Array.isArray(
          order.items
        )
          ? order.items.map(
              (item) => ({
                id:
                  item.id,

                name:
                  getItemDisplayName(
                    item.name,
                    item.variantName
                  ),

                variantName:
                  normalizeVariantName(
                    item.variantName
                  ),

                price:
                  Number(
                    item.price || 0
                  ),

                quantity:
                  Number(
                    item.quantity || 0
                  ),
              })
            )
          : [],
    };

  const json =
    JSON.stringify(
      normalizedOrder
    );

  const bytes =
    new TextEncoder().encode(
      json
    );

  return bytesToBase64(
    bytes
  )
    .replace(
      /\+/g,
      "-"
    )
    .replace(
      /\//g,
      "_"
    )
    .replace(
      /=+$/g,
      ""
    );
}

/* =========================================================
   DECODE ORDER
========================================================= */

export function decodeOrderFromUrl(
  encoded
) {
  if (!encoded) {
    return null;
  }

  if (
    typeof TextDecoder ===
      "undefined" ||
    typeof atob ===
      "undefined"
  ) {
    throw new Error(
      "Browser decoding APIs are unavailable."
    );
  }

  try {
    /*
     * Convert URL-safe Base64 back
     * to normal Base64.
     */
    const normalized =
      String(encoded)
        .replace(
          /-/g,
          "+"
        )
        .replace(
          /_/g,
          "/"
        );

    /*
     * Restore Base64 padding.
     */
    const padded =
      normalized +
      "=".repeat(
        (
          4 -
          (normalized.length %
            4)
        ) % 4
      );

    const bytes =
      base64ToBytes(
        padded
      );

    const json =
      new TextDecoder().decode(
        bytes
      );

    const order =
      JSON.parse(
        json
      );

    if (
      !order ||
      typeof order !== "object" ||
      !order.orderId ||
      !Array.isArray(
        order.items
      )
    ) {
      return null;
    }

    const items =
      order.items.map(
        (item) => ({
          id:
            item.id,

          name:
            getItemDisplayName(
              item.name,
              item.variantName
            ),

          variantName:
            normalizeVariantName(
              item.variantName
            ),

          price:
            Number(
              item.price || 0
            ),

          quantity:
            Number(
              item.quantity || 0
            ),
        })
      );

    /*
     * Recalculate the total from the
     * actual item data.
     */
    const calculatedTotal =
      items.reduce(
        (total, item) =>
          total +
          Number(
            item.price || 0
          ) *
            Number(
              item.quantity || 0
            ),
        0
      );

    return {
      ...order,

      cafe:
        order.cafe ||
        "Old Town Cafe",

      table:
        order.table ||
        "T12",

      items,

      total:
        calculatedTotal,
    };
  } catch {
    return null;
  }
}