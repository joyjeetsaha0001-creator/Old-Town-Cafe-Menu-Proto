const CART_KEY = "old-town-cafe-cart";
const ORDER_KEY = "old-town-cafe-order";
const TABLE_KEY = "old-town-cafe-table";

const CART_EXPIRY_TIME = 10 * 60 * 1000;

let cartExpiryTimer = null;

function isBrowser() {
  return typeof window !== "undefined";
}


/* =========================================================
   CART EXPIRY
========================================================= */

/*
  The plate is temporary.

  Every time the user adds/removes/increases/decreases
  an item, the 10-minute timer is refreshed.

  After 10 minutes without any plate activity,
  ONLY the cart is cleared.

  The saved order and QR-related order data are untouched.
*/

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

  /*
    If the cart is already expired,
    clear it immediately.
  */

  if (remainingTime <= 0) {
    expireCart();
    return;
  }

  cartExpiryTimer = window.setTimeout(() => {
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

  localStorage.removeItem(CART_KEY);

  /*
    Tell PlateBar, PlatePage and any other
    cart listeners that the plate changed.
  */

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
      localStorage.getItem(CART_KEY);

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    /*
      NEW FORMAT

      {
        items: [...],
        lastUpdated: 123456789
      }
    */

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      Array.isArray(parsed.items)
    ) {
      const lastUpdated =
        Number(parsed.lastUpdated);

      /*
        Invalid timestamp = remove
        potentially corrupted/stale cart.
      */

      if (!Number.isFinite(lastUpdated)) {
        localStorage.removeItem(CART_KEY);
        return [];
      }

      /*
        Check expiry whenever the cart
        is accessed.

        This also handles the situation
        where the user closes the browser,
        returns tomorrow, and opens the menu.
      */

      if (
        Date.now() - lastUpdated >=
        CART_EXPIRY_TIME
      ) {
        localStorage.removeItem(CART_KEY);

        if (cartExpiryTimer) {
          window.clearTimeout(cartExpiryTimer);
          cartExpiryTimer = null;
        }

        return [];
      }

      /*
        Keep the automatic expiry timer alive
        while the application is open.
      */

      scheduleCartExpiry(lastUpdated);

      return parsed.items;
    }

    /*
      OLD CART FORMAT

      Older versions of the application stored
      the cart directly as an array.

      We intentionally clear that old format
      instead of carrying potentially stale
      items into the new expiry system.
    */

    if (Array.isArray(parsed)) {
      localStorage.removeItem(CART_KEY);
      return [];
    }

    localStorage.removeItem(CART_KEY);
    return [];

  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}


export function saveCart(cart) {
  if (!isBrowser()) {
    return;
  }

  /*
    Every cart modification refreshes
    the 10-minute inactivity period.
  */

  const lastUpdated =
    Date.now();

  const cartData = {
    items: Array.isArray(cart)
      ? cart
      : [],
    lastUpdated,
  };

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cartData)
  );

  /*
    Start/reset automatic expiry.
  */

  scheduleCartExpiry(
    lastUpdated
  );

  /*
    Notify components such as PlateBar
    and PlatePage.
  */

  window.dispatchEvent(
    new Event("cart-updated")
  );
}


export function addToCart(item) {
  const cart =
    getCart();

  const existingItem =
    cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.variantName ===
          item.variantName
    );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,

      name: item.name,

      /*
        Keep the selected variant name.
        This also prevents two variants of the
        same item from getting mixed together.
      */

      variantName:
        item.variantName || "",

      price: Number(
        item.price || 0
      ),

      quantity: 1,
    });
  }

  saveCart(cart);

  return cart;
}


export function increaseQuantity(id) {
  const cart =
    getCart();

  const item =
    cart.find(
      (cartItem) =>
        cartItem.id === id
    );

  if (!item) {
    return cart;
  }

  item.quantity += 1;

  saveCart(cart);

  return cart;
}


export function decreaseQuantity(id) {
  const cart =
    getCart();

  const item =
    cart.find(
      (cartItem) =>
        cartItem.id === id
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

  saveCart(updatedCart);

  return updatedCart;
}


export function clearCart() {
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
   ORDER
========================================================= */

export function generateOrderId() {
  /*
    Generate a genuinely new ID
    for every checkout.

    Example:

    OTC-8F31A7C2
  */

  if (
    isBrowser() &&
    window.crypto &&
    window.crypto.randomUUID
  ) {
    return (
      "OTC-" +
      window.crypto
        .randomUUID()
        .slice(0, 8)
        .toUpperCase()
    );
  }

  /*
    Fallback.
  */

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


export function createOrder() {
  if (!isBrowser()) {
    return null;
  }

  /*
    ALWAYS take the current plate.

    getCart() also checks whether the plate
    has expired before creating an order.
  */

  const cart =
    getCart();

  if (cart.length === 0) {
    return null;
  }

  /*
    Create a completely NEW order.
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
            item.name,

          variantName:
            item.variantName || "",

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
    Save this NEW order.

    This replaces the previous order stored
    on this device.
  */

  localStorage.setItem(
    ORDER_KEY,
    JSON.stringify(order)
  );

  /*
    The order has successfully been created.

    Empty the customer's temporary plate.

    IMPORTANT:
    This only removes CART_KEY.
    It does NOT remove ORDER_KEY.
  */

  clearCart();

  /*
    Tell any component listening
    that a new order was created.
  */

  window.dispatchEvent(
    new Event("order-created")
  );

  return order;
}


export function getOrder() {
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
      typeof order !== "object"
    ) {
      return null;
    }

    if (
      !order.orderId ||
      !Array.isArray(
        order.items
      )
    ) {
      return null;
    }

    return order;

  } catch {
    return null;
  }
}


export function clearOrder() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(
    ORDER_KEY
  );
}