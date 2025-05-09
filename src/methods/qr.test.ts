import { describe, it, expect } from "vitest";
import { QR_CODE_PREFIX } from "../constants";
import { generateCitizenQR, generateMechantQR, parseMerchantQR } from "./qr";

const validData = {
  walletAddress: "0xABC123",
  amount: 100.5,
  concept: "Coffee Payment",
};

const validQR = `${QR_CODE_PREFIX.MERCHANT}-${JSON.stringify(validData)}`;

describe("parseMerchantQR", () => {
  it("parses valid QR string correctly", () => {
    const result = parseMerchantQR(validQR);
    expect(result).toEqual(validData);
  });

  it("throws error for invalid prefix", () => {
    const qr = `INVALID-${JSON.stringify(validData)}`;
    expect(() => parseMerchantQR(qr)).toThrowError(
      "Lib error: Invalid QR prefix"
    );
  });

  it("throws error for malformed JSON", () => {
    const qr = `${QR_CODE_PREFIX.MERCHANT}-not-a-json`;
    expect(() => parseMerchantQR(qr)).toThrowError(
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
    const walletAddress = "0xABC123";
    const amount = "100.5";
    const concept = "Coffee Payment";

    const expectedData = JSON.stringify({ walletAddress, amount, concept });
    const result = generateMechantQR(walletAddress, amount, concept);

    expect(result).toBe(`${QR_CODE_PREFIX.MERCHANT}-${expectedData}`);
  });

  it("should handle empty strings correctly", () => {
    const walletAddress = "";
    const amount = "";
    const concept = "";

    const expectedData = JSON.stringify({ walletAddress, amount, concept });
    const result = generateMechantQR(walletAddress, amount, concept);

    expect(result).toBe(`${QR_CODE_PREFIX.MERCHANT}-${expectedData}`);
  });
});
