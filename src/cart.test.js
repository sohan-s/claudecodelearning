import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "./cart.js";

test("sums item prices times quantities", () => {
  const items = [{ price: 10, qty: 2 }, { price: 5, qty: 1 }];
  assert.equal(cartTotal(items), 25);
});

test("applies a discount rate", () => {
  const items = [{ price: 100, qty: 1 }];
  assert.equal(cartTotal(items, 0.1), 90);
});

test("returns 0 for an empty cart", () => {
  assert.equal(cartTotal([]), 0);
});

test("rounds to 2 decimals", () => {
  const items = [{ price: 0.1, qty: 3 }];
  assert.equal(cartTotal(items), 0.3);
});

test("rejects a non-array", () => {
  assert.throws(() => cartTotal("nope"), TypeError);
});

test("rejects an out-of-range discount", () => {
  assert.throws(() => cartTotal([], 1.5), RangeError);
});

test("rejects negative price or qty", () => {
  assert.throws(() => cartTotal([{ price: -1, qty: 1 }]), RangeError);
});
