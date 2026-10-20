import { describe, it, expect } from "vitest";
import { estimateWeavingHours } from "./weaving-time";

describe("estimateWeavingHours", () => {
  it("computes (qty / repeat) * pick / (speed * 60), rounded to 2dp", () => {
    expect(
      estimateWeavingHours({ totalQty: 60000, repeat: 60, pick: 853, speed: 500 })
    ).toBe(28.43);
  });

  it("defaults speed to 600 RPM when speed is 0 or omitted", () => {
    expect(estimateWeavingHours({ totalQty: 60000, repeat: 60, pick: 853, speed: 0 })).toBe(
      estimateWeavingHours({ totalQty: 60000, repeat: 60, pick: 853, speed: 600 })
    );
    expect(estimateWeavingHours({ totalQty: 60000, repeat: 60, pick: 853 })).toBe(
      estimateWeavingHours({ totalQty: 60000, repeat: 60, pick: 853, speed: 600 })
    );
  });

  it("accepts string inputs (Drizzle numerics arrive as strings)", () => {
    expect(
      estimateWeavingHours({ totalQty: 60000, repeat: "60", pick: "853", speed: "500" })
    ).toBe(28.43);
  });

  it("returns 0 for incomplete input instead of dividing by zero", () => {
    expect(estimateWeavingHours({ totalQty: 60000, repeat: 0, pick: 853, speed: 500 })).toBe(0);
    expect(estimateWeavingHours({ totalQty: 60000, repeat: 60, pick: 0, speed: 500 })).toBe(0);
    expect(estimateWeavingHours({ totalQty: 0, repeat: 60, pick: 853, speed: 500 })).toBe(0);
  });
});

