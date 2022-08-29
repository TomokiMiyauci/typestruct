import { EmailFormatSchema, UuidFormatSchema } from "./strings.ts";
import { describe, expect, it } from "../dev_deps.ts";

describe("EmailFormatSchema", () => {
  it("should throw error when the value is not email format", () => {
    expect(() => new EmailFormatSchema().assert?.("")).toThrow();
  });

  it("should not throw error when the value is email format", () => {
    expect(() => new EmailFormatSchema().assert?.("test@test.test")).not
      .toThrow();
  });
});

describe("UuidFormatSchema", () => {
  it("should throw error when the value is invalid UUID format", () => {
    expect(() => new UuidFormatSchema().assert("")).toThrow();
  });

  it("should return undefined when the value is UUID format", () => {
    expect(
      new UuidFormatSchema().assert("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"),
    ).toBeUndefined();
  });
});
