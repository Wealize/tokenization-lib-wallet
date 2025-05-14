import { describe, it, expect, vi, beforeEach } from "vitest";
import * as contractUtils from "../utils/contract";
import * as ethersUtils from "ethers";

import {
  getTokenBalance,
  getCitizenBenefitsType,
  getPartyPermission,
  sendTokens,
  burnTokens,
} from "./tokens";

vi.mock("../utils/contract");

describe("tokens utils", () => {
  const mockContract = {
    balanceOf: vi.fn(),
    getAttachedData: vi.fn(),
    partyPermission: vi.fn(),
    transferFromWithData: vi.fn(),
    redeemFrom: vi.fn(),
  };

  const mockSigner = {
    getAddress: vi.fn().mockResolvedValue("0xFROMADDRESS"),
  };

  beforeEach(() => {
    vi.mocked(contractUtils.getContract).mockReturnValue(mockContract as any);
    vi.mocked(contractUtils.getSigner).mockReturnValue(mockSigner as any);
    vi.mocked(contractUtils.getLatestBlockTimestamp).mockResolvedValue(
      1234567890
    );

    vi.spyOn(ethersUtils.ethers.utils, "formatUnits").mockImplementation(
      () => "100.0"
    );
    vi.spyOn(ethersUtils.ethers.utils, "parseUnits").mockImplementation(
      () => "1000000000000000000" as any
    );
    vi.spyOn(ethersUtils.ethers.utils, "toUtf8Bytes").mockImplementation(
      (s: string) => s as any
    );
  });

  it("getTokenBalance returns formatted balance", async () => {
    mockContract.balanceOf.mockResolvedValue("1000000000000000000");
    const result = await getTokenBalance("0xABC123");
    expect(result).toBe("100.0");
    expect(mockContract.balanceOf).toHaveBeenCalledWith("0xABC123");
  });

  it("getCitizenBenefitsType returns correct label", async () => {
    mockContract.getAttachedData.mockResolvedValue("0x01");
    const result = await getCitizenBenefitsType("0xABC123");
    expect(result).toBe("0x01");
  });

  it("getPartyPermission returns correct role", async () => {
    mockContract.partyPermission.mockResolvedValue(2);
    const result = await getPartyPermission("0xABC123");
    expect(result).toBe(2);
  });

  it("sendTokens returns tx hash", async () => {
    mockContract.transferFromWithData.mockResolvedValue({ hash: "0xTXHASH" });
    const result = await sendTokens("privKey", "0xTO", 1, "event");
    expect(result).toBe("0xTXHASH");
    expect(mockContract.transferFromWithData).toHaveBeenCalled();
  });

  it("burnTokens returns tx hash", async () => {
    mockContract.redeemFrom.mockResolvedValue({ hash: "0xBURNHASH" });
    const result = await burnTokens("privKey", 1, "event");
    expect(result).toBe("0xBURNHASH");
    expect(mockContract.redeemFrom).toHaveBeenCalled();
  });

  it("sendTokens throws formatted error on fail", async () => {
    mockContract.transferFromWithData.mockRejectedValue({ message: "Boom" });
    await expect(sendTokens("privKey", "0xTO", 1)).rejects.toThrow(
      "Transaction Error: Boom"
    );
  });

  it("burnTokens throws formatted error on fail", async () => {
    mockContract.redeemFrom.mockRejectedValue({ message: "Boom" });
    await expect(burnTokens("privKey", 1)).rejects.toThrow(
      "Burn Tokens Error: Boom"
    );
  });
});
