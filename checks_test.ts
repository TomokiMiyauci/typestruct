import { assert, is, validate } from "./checks.ts";
import { StructError } from "./error.ts";
import { type } from "./types.ts";
import { assertEquals, assertThrows, describe, it } from "./dev_deps.ts";

describe("is", () => {
  it("should return false when the check yield issue", () => {
    assertEquals(
      is({
        check: function* () {
          yield { message: ``, paths: [] };
        },
        [type]: "",
      }, ""),
      false,
    );
  });

  it("should return true when the check not yield issue", () => {
    assertEquals(
      is({
        check: function* () {},
        [type]: "",
      }, ""),
      true,
    );
  });
});

describe("assert", () => {
  it("should throw error when the check yield issue", () => {
    assertThrows(
      () =>
        assert({
          check: function* () {
            yield { message: ``, paths: [] };
          },
          [type]: "",
        }, new StructError([])),
    );
  });

  it("should return undefined when the check not yield issue", () => {
    assertEquals(
      assert({
        check: function* () {},
        [type]: "",
      }, ""),
      undefined,
    );
  });
});

describe("validate", () => {
  it("should return valid of false when check yield issue", () => {
    assertEquals(
      validate({
        check: function* () {
          yield { message: `Invalid`, paths: [] };
        },
        [type]: "",
      }, ""),
      { valid: false, errors: [{ message: `Invalid`, paths: [] }] },
    );
  });

  it("should return valid of false when check yield multiple issue", () => {
    assertEquals(
      validate({
        check: function* () {
          yield { message: `1`, paths: [] };
          yield { message: `2`, paths: [] };
          yield { message: `3`, paths: [] };
        },
        [type]: "",
      }, ""),
      {
        valid: false,
        errors: [{ message: `1`, paths: [] }, { message: `2`, paths: [] }, {
          message: `3`,
          paths: [],
        }],
      },
    );
  });

  it("should return one issue when option of fail fast is true", () => {
    assertEquals(
      validate(
        {
          check: function* () {
            yield { message: `1`, paths: [] };
            yield { message: `2`, paths: [] };
            yield { message: `3`, paths: [] };
          },
          [type]: "",
        },
        "",
        { failFast: true },
      ),
      {
        valid: false,
        errors: [{ message: `1`, paths: [] }],
      },
    );
  });

  it("should return valid of true when not yield issue", () => {
    assertEquals(
      validate(
        {
          check: function* () {},
          [type]: "",
        },
        "",
      ),
      { valid: true, data: "" },
    );
  });
});