import { describe, it, expect } from "vitest";
import {
  formatNumber,
  formatDate,
  todayISO,
  calculateRequiredRolls,
  calculateTotalRolls,
} from "./format";

describe("formatNumber", () => {
  it("returns a dash for null / undefined / non-numeric", () => {
    expect(formatNumber(null)).toBe("-");
    expect(formatNumber(undefined)).toBe("-");
    expect(formatNumber("abc")).toBe("-");
  });
  it("formats a plain integer", () => {
    expect(formatNumber(5)).toBe("5");
  });
  it("accepts numeric strings (decimals arrive as strings over the wire)", () => {
    expect(formatNumber("42")).toBe("42");
  });
});

describe("formatDate", () => {
  it("renders a date-only string as its LOCAL day (no UTC off-by-one)", () => {
    expect(formatDate("2026-07-27")).toBe("27 Jul 2026");
  });
  it("returns a dash for empty input", () => {
    expect(formatDate(null)).toBe("-");
    expect(formatDate("")).toBe("-");
  });
  it("returns the raw input for an unparseable value", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});

describe("todayISO", () => {
  it("is a yyyy-MM-dd string", () => {
    expect(todayISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("roll-planning mirrors (match the server formulas)", () => {
  it("calculateRequiredRolls", () => {
    expect(calculateRequiredRolls(7800, 50)).toBe(2);
    expect(calculateRequiredRolls(0, 50)).toBe(0);
  });
  it("calculateTotalRolls rounds up and floors negative extra", () => {
    expect(calculateTotalRolls(2.1, 0)).toBe(3);
    expect(calculateTotalRolls(2, -1)).toBe(2);
  });
});
