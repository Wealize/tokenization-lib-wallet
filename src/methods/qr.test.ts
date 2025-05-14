import { describe, it, expect } from "vitest";
import { QR_CODE_PREFIX } from "../constants";
import {
  generateCitizenQR,
  generateMechantQR,
  parseMerchOrCitizenQR,
} from "./qr";

const validData = {
  merchantAddress: "0xAB000",
  citizenAddress: "0xABC123",
  amount: 100.5,
  concept: "Coffee Payment",
};

const validQR = `${QR_CODE_PREFIX.MERCHANT}-${JSON.stringify(validData)}`;

describe("parseMerchOrCitizenQR", () => {
  it("parses valid QR string correctly", () => {
    const result = parseMerchOrCitizenQR(validQR);
    expect(result).toEqual(validData);
  });

  it("throws error for invalid prefix", () => {
    const qr = `INVALID-${JSON.stringify(validData)}`;
    expect(() => parseMerchOrCitizenQR(qr)).toThrowError(
      "Lib error: Invalid QR prefix"
    );
  });

  it("throws error for malformed JSON", () => {
    const qr = `${QR_CODE_PREFIX.MERCHANT}-not-a-json`;
    expect(() => parseMerchOrCitizenQR(qr)).toThrowError(
      "Lib error: Invalid QR data format"
    );
  });
});

describe("generateCitizenQR", () => {
  it("should generate a valid citizen QR string", () => {
    const did = "did:example:123456";
    const result = generateCitizenQR(did);

    expect(result).toBe(`${QR_CODE_PREFIX.CITIZEN}-${did}`);
  });
});

describe("generateMechantQR", () => {
  it("should generate a valid merchant QR string", () => {
    const citizenAddress = "0xABC123";
    const merchantAddress = "0xAB000";
    const amount = "100.5";
    const concept = "Coffee Payment";

    const expectedData = JSON.stringify({
      merchantAddress,
      citizenAddress,
      amount,
      concept,
    });
    const result = generateMechantQR(
      merchantAddress,
      citizenAddress,
      amount,
      concept
    );

    expect(result).toBe(`${QR_CODE_PREFIX.MERCHANT}-${expectedData}`);
  });

  it("should handle empty strings correctly", () => {
    const merchantAddress = "";
    const citizenAddress = "";
    const amount = "";
    const concept = "";

    const expectedData = JSON.stringify({
      merchantAddress,
      citizenAddress,
      amount,
      concept,
    });
    const result = generateMechantQR(
      citizenAddress,
      merchantAddress,
      amount,
      concept
    );

    expect(result).toBe(`${QR_CODE_PREFIX.MERCHANT}-${expectedData}`);
  });
});
