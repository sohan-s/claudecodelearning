// A tiny piece of "business logic" so the test hook has something real to check.

/**
 * Calculate the total price of cart items, applying an optional discount.
 * @param {Array<{price: number, qty: number}>} items
 * @param {number} discountRate - fraction between 0 and 1 (e.g. 0.1 for 10% off)
 * @returns {number} total, rounded to 2 decimals
 */
export function cartTotal(items, discountRate = 0) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  if (discountRate < 0 || discountRate > 1) {
    throw new RangeError("discountRate must be between 0 and 1");
  }
  const subtotal = items.reduce((sum, item) => {
    if (item.price < 0 || item.qty < 0) {
      throw new RangeError("price and qty must be non-negative");
    }
    return sum + item.price * item.qty;
  }, 0);
  const total = subtotal * (1 - discountRate);
  return Math.round(total * 100) / 100;
}
