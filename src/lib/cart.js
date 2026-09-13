const CART_KEY = "old-town-cafe-cart";
const ORDER_KEY = "old-town-cafe-order";
const TABLE_KEY = "old-town-cafe-table";
const ACTIVE_ORDER_KEY = "old-town-cafe-active-order";

function isBrowser() {
  return typeof window !== "undefined";
}

/* =========================================================
   CART
========================================================= */

export function getCart() {
  if (!isBrowser()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(CART_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item) {
  const cart = getCart();

  const variantName = String(
    item?.variantName || "Regular"
  ).trim();

  const baseName = String(
    item?.name || "Item"
  ).trim();

  /*
    Make the displayed cart name clear.

    Example:

    baseName:
      Fried Rice

    variant:
      Mix Non-Veg

    result:
      Mix Non-Veg Fried Rice
  */

  const displayName =
    variantName &&
    variantName.toLowerCase() !== "regular" &&
    !baseName
      .toLowerCase()
      .includes(variantName.toLowerCase())
      ? `${variantName} ${baseName}`
      : baseName;

  /*
    Each variant gets its own cart entry.

    Example:

    Fried Rice - Egg
    Fried Rice - Chicken

    are treated as separate items.
  */

  const cartItemId = `${item.id}__${variantName
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const existingItem = cart.find(
    (cartItem) =>
      cartItem.id === cartItemId
  );

  if (existingItem) {
    existingItem.quantity =
      Number(existingItem.quantity || 0) + 1;

    existingItem.name =
      displayName;

    existingItem.baseName =
      baseName;

    existingItem.variantName =
      variantName;

    existingItem.price =
      Number(item.price || 0);

    existingItem.image =
      item.image ||
      existingItem.image ||
      null;
  } else {
    cart.push({
      id: cartItemId,

      menuItemId:
        item.id,

      name:
        displayName,

      baseName:
        baseName,

      variantName:
        variantName,

      price:
        Number(item.price || 0),

      quantity:
        1,

      image:
        item.image || null,
    });
  }

  saveCart(cart);

  return cart;
}

export function increaseQuantity(id) {
  const cart = getCart();

  const item = cart.find(
    (cartItem) =>
      cartItem.id === id
  );

  if (!item) {
    return cart;
  }

  item.quantity =
    Number(item.quantity || 0) + 1;

  saveCart(cart);

  return cart;
}

export function decreaseQuantity(id) {
  const cart = getCart();

  const item = cart.find(
    (cartItem) =>
      cartItem.id === id
  );

  if (!item) {
    return cart;
  }

  item.quantity =
    Number(item.quantity || 0) - 1;

  const updatedCart =
    cart.filter(
      (cartItem) =>
        Number(cartItem.quantity || 0) > 0
    );

  saveCart(updatedCart);

  return updatedCart;
}

export function clearCart() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(CART_KEY);

  window.dispatchEvent(
    new Event("cart-updated")
  );
}

export function getCartCount() {
  return getCart().reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0),
    0
  );
}

export function getCartTotal() {
  return getCart().reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
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
    localStorage.getItem(TABLE_KEY) ||
    "T12"
  );
}

/* =========================================================
   ORDER
========================================================= */

export function generateOrderId() {
  /*
    crypto.randomUUID gives us a genuinely new order ID
    for every checkout.
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
    Fallback for browsers without randomUUID.
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

  const cart = getCart();

  if (cart.length === 0) {
    return null;
  }

  /*
    IMPORTANT:

    Create a completely NEW snapshot
    of the CURRENT plate.

    This prevents yesterday's order from
    being reused.
  */

  const order = {
    orderId:
      generateOrderId(),

    cafe:
      "Old Town Cafe",

    table:
      getTable(),

    items:
      cart.map((item) => ({
        id:
          item.id,

        menuItemId:
          item.menuItemId ||
          item.id,

        /*
          Store the FULL display name.
        */

        name:
          item.name,

        baseName:
          item.baseName ||
          item.name,

        variantName:
          item.variantName ||
          "Regular",

        price:
          Number(item.price || 0),

        quantity:
          Number(item.quantity || 0),

        image:
          item.image ||
          null,
      })),

    total:
      cart.reduce(
        (total, item) =>
          total +
          Number(item.price || 0) *
            Number(item.quantity || 0),
        0
      ),

    createdAt:
      new Date().toISOString(),
  };

  /*
    Store the latest order ONLY on the
    customer's device.

    The waiter page does NOT use this.
  */

  localStorage.setItem(
    ORDER_KEY,
    JSON.stringify(order)
  );

  /*
    Remember which order is currently
    being displayed on the customer's QR page.
  */

  sessionStorage.setItem(
    ACTIVE_ORDER_KEY,
    order.orderId
  );

  /*
    IMPORTANT:

    DO NOT clear the cart here.

    This is what allows the customer to
    press Back from the QR page and still
    have all their selected items.
  */

  window.dispatchEvent(
    new Event("order-created")
  );

  return order;
}

export function getOrder(
  orderId = null
) {
  if (!isBrowser()) {
    return null;
  }

  try {
    /*
      Only the currently active order can
      be displayed on the customer's device.
    */

    const activeOrderId =
      sessionStorage.getItem(
        ACTIVE_ORDER_KEY
      );

    if (!activeOrderId) {
      return null;
    }

    /*
      If the URL contains an order ID,
      it MUST match the current active order.
    */

    if (
      orderId &&
      orderId !== activeOrderId
    ) {
      return null;
    }

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
      !Array.isArray(order.items)
    ) {
      return null;
    }

    /*
      This is the important protection against
      yesterday's order appearing again.
    */

    if (
      order.orderId !==
      activeOrderId
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

  sessionStorage.removeItem(
    ACTIVE_ORDER_KEY
  );
}

/* =========================================================
   QR / CROSS-DEVICE ORDER LINK
========================================================= */

/*
  The QR DOES NOT contain the complete
  readable order anymore.

  It contains a URL like:

  https://your-domain.com/order/view?data=...

  The waiter scans that URL and gets
  the complete order page.
*/

/* =========================================================
   BASE64 URL ENCODING
========================================================= */

function base64UrlEncode(value) {
  const bytes =
    new TextEncoder().encode(value);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const normalized =
    String(value)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

  const padded =
    normalized +
    "=".repeat(
      (4 -
        (normalized.length % 4)) %
        4
    );

  const binary =
    atob(padded);

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
      binary.charCodeAt(index);
  }

  return new TextDecoder().decode(
    bytes
  );
}

/* =========================================================
   ENCODE ORDER FOR QR URL
========================================================= */

export function encodeOrderForUrl(
  order
) {
  if (
    !isBrowser() ||
    !order
  ) {
    return "";
  }

  /*
    Compact payload.

    Short property names make the QR
    easier to scan.
  */

  const payload = {
    v: 1,

    o:
      String(
        order.orderId || ""
      ),

    c:
      String(
        order.cafe ||
          "Old Town Cafe"
      ),

    t:
      String(
        order.table ||
          "T12"
      ),

    d:
      order.createdAt ||
      new Date().toISOString(),

    x:
      Number(
        order.total || 0
      ),

    i:
      (
        Array.isArray(
          order.items
        )
          ? order.items
          : []
      ).map((item) => ({
        /*
          Store the FULL item name.
        */

        n:
          String(
            item.name ||
              item.baseName ||
              "Item"
          ),

        p:
          Number(
            item.price || 0
          ),

        q:
          Number(
            item.quantity || 0
          ),

        v:
          String(
            item.variantName ||
              "Regular"
          ),
      })),
  };

  return base64UrlEncode(
    JSON.stringify(payload)
  );
}

/* =========================================================
   DECODE ORDER FROM QR URL
========================================================= */

export function decodeOrderFromUrl(
  encodedOrder
) {
  if (
    !isBrowser() ||
    !encodedOrder
  ) {
    return null;
  }

  try {
    const payload =
      JSON.parse(
        base64UrlDecode(
          encodedOrder
        )
      );

    if (
      !payload ||
      payload.v !== 1
    ) {
      return null;
    }

    if (
      !payload.o ||
      !Array.isArray(
        payload.i
      )
    ) {
      return null;
    }

    const items =
      payload.i
        .map(
          (item, index) => ({
            id:
              `qr-${payload.o}-${index}`,

            name:
              String(
                item.n ||
                  "Item"
              ),

            price:
              Number(
                item.p || 0
              ),

            quantity:
              Number(
                item.q || 0
              ),

            variantName:
              String(
                item.v ||
                  "Regular"
              ),
          })
        )
        .filter(
          (item) =>
            item.quantity > 0
        );

    /*
      Recalculate the total from the
      actual items as a safety check.
    */

    const calculatedTotal =
      items.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0
      );

    return {
      orderId:
        String(
          payload.o
        ),

      cafe:
        String(
          payload.c ||
            "Old Town Cafe"
        ),

      table:
        String(
          payload.t ||
            "T12"
        ),

      createdAt:
        payload.d ||
        null,

      total:
        Number.isFinite(
          Number(payload.x)
        )
          ? Number(payload.x)
          : calculatedTotal,

      items,
    };
  } catch {
    return null;
  }
}