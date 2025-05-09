import { QR_CODE_PREFIX } from "../constants";
import { MerchantQRDataType } from "../types";

export function generateCitizenQR(did: string): string {
  const qr_prefix = QR_CODE_PREFIX.CITIZEN;

  return `${qr_prefix}-${did}`;
}

export function generateMechantQR(
  walletAddress: string,
  amount: string,
  concept: string
): string {
  const qr_prefix = QR_CODE_PREFIX.MERCHANT;

  const data: MerchantQRDataType = {
    walletAddress,
    amount,
    concept,
  };

  const strData = JSON.stringify(data);

  return `${qr_prefix}-${strData}`;
}

export function parseMerchantQR(qr: string): MerchantQRDataType {
  const [prefix, json] = qr.split("-", 2);

  if (prefix !== QR_CODE_PREFIX.MERCHANT) {
    throw new Error("Lib error: Invalid QR prefix");
  }

  try {
    const data = JSON.parse(json);
    const { walletAddress, amount, concept } = data;

    if (!walletAddress || !amount || !concept) {
      throw new Error("Lib error: Missing fields in QR data");
    }

    return { walletAddress, amount, concept };
  } catch (err) {
    throw new Error("Lib error: Invalid QR data format");
  }
}
