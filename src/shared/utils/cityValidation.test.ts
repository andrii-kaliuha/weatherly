import { describe, it, expect } from "vitest";
import { cityValidation } from "./cityValidation";

describe("cityValidation - detailed error checking", () => {
  it("should return 'empty_city' for empty or whitespace input", () => {
    const result = cityValidation("   ");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("empty_city");
  });

  it("should return 'invalid_city_numbers' if numbers are present", () => {
    const result = cityValidation("Kyiv7");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_city_numbers");
  });

  it("should return 'invalid_city_symbols' for special characters", () => {
    const result = cityValidation("Kyiv?");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_city_symbols");
  });

  it("should pass when input is exactly 32 characters", () => {
    const edgeInput = "a".repeat(32);
    const result = cityValidation(edgeInput);

    expect(result.isValid).toBe(true);
    expect(result.error).toBe(null);
  });

  it("should return 'too_long_city' when input is 33 characters", () => {
    const longInput = "a".repeat(33);
    const result = cityValidation(longInput);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe("too_long_city");
  });

  it("should pass for valid city names with hyphens and apostrophes", () => {
    expect(cityValidation("New-York").isValid).toBe(true);
    expect(cityValidation("O'Connor").isValid).toBe(true);
  });
});
